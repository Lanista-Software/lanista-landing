# Ödeme altyapısı: devir dokümanı

_Son güncelleme: 18 Kasım 2026. Ödeme işine başlayan her oturum önce bu dosyayı, sonra `docs/CHECKLIST.md` dosyasını okur. Bu dosyayı güncel tutun._

## 0. Önce okunacaklar
| Dosya | Neden |
|---|---|
| `CLAUDE.md` | Mimari (Astro, Contentrain, sabit metin yasağı, erişilebilirlik kuralları) |
| `docs/CHECKLIST.md` | Açık işler; her adımda işaretlenir |
| `docs/iyzico-gereksinimleri.md` | iyzico başvuru şartları ve mevzuat (MSY, ETHS, Abonelik Yön., KVKK) |
| `docs/urunler-ve-iyzico-brief.md` §2–4 | İş modeli, fiyatlandırma, Aşama A/B |
| `docs/kararlar-arama-verisi.md` §B | Fiyat kararı ve rakip fiyatları |
| `docs/illustration-style.md` | Yeni sayfa ya da görsel eklenecekse stil |

**Kurallar**
- Kullanıcıya görünen hiçbir metin kodda yazılmaz. Metinler Contentrain'de durur: `ui` sözlüğü (TR + EN) ya da ilgili model.
- `.contentrain/` dosyaları yalnız Contentrain MCP araçlarıyla değiştirilir. Kurallar `.claude/rules/contentrain-essentials.md` dosyasında.
- Kart bilgisi sitede alınmaz ve saklanmaz. Ödeme her zaman iyzico tarafında alınır.

## 1. Bugünkü durum
- **Satıcı:** LANİSTA YAZILIM SAN. VE TİC. LTD. ŞTİ. (VKN 6081185221, MERSİS 0608118522100001). Bilgiler Contentrain `company` singleton'ında.
- **iyzico hesabı:** Onaylı bir üye işyeri hesabı var; contentrain.io için açılmış.
  - Yapılacak: panelden hesabın **Lanista Ltd. Şti.** unvanına kayıtlı olduğu teyit edilecek.
  - Lanista'ya kayıtlıysa: lanista.com.tr **ek site** olarak bildirilecek.
  - Contentrain A.Ş.'ye kayıtlıysa: Lanista adına yeni üye işyeri başvurusu yapılacak.
- **Sitede hazır olanlar (iyzico kontrol listesi)**

| Şart | Nerede |
|---|---|
| Ürünler ve TL fiyatları | `/urunler/hesap-takip/#paketler` |
| İletişim başlığı (unvan, MERSİS, adres, telefon, e-posta, meslek odası) | `/iletisim/`, footer |
| Gizlilik politikası | `/yasal/gizlilik/` |
| Mesafeli satış sözleşmesi | `/yasal/mesafeli-satis/` |
| Ön bilgilendirme formu | `/yasal/on-bilgilendirme/` |
| Teslimat, iade ve iptal | `/yasal/teslimat-ve-iade/` |
| KVKK aydınlatma metni | `/yasal/kvkk/` |
| Çerez politikası + onay bandı | `/yasal/cerez-politikasi/`; GA yalnız onayla yüklenir |
| İşlem rehberi | `/yasal/islem-rehberi/` |
| Hakkımızda | `/hakkimizda/` |
| iyzico ile Öde + kart logoları | Footer (resmi paket, `company.payment_logo_band`) |
| Ödeme öncesi onay adımı | `/odeme/{plan-id}/` |
| SSL | Netlify, HTTPS |

- **Eksikler (başvurudan önce):**
  - **KEP adresi** (`company.kep`): yok. Girildiği anda iletişim sayfasında, footer'da ve yasal metinlerde kendiliğinden görünür.
  - **Kurulum süresi** (`company.setup_days`): yok. Yasal metinlerde `{{kurulum_suresi}}` olarak geçiyor; değer girilmeden metinler taslak uyarısıyla görünür.
  - **Hukuki kontrol:** yasal metinler taslak. Kontrolden sonra her dokümanda `reviewed: true` yapılır.
  - **ETBİS kaydı:** e-Devlet üzerinden, satışa başlamadan önce (kullanıcı yapacak).
  - **iyzico ödeme linkleri:** henüz yok (bkz. §3).
  - **SMS paketi fiyatı:** yok; şimdilik "fiyat için yazın".

## 2. Veri modelleri (Contentrain)
**`plans`** (koleksiyon, yalnız TR)

| Alan | Tip | Not |
|---|---|---|
| `name` | string | Paket adı |
| `product` | relation → products | |
| `billing` | one_time / yearly / monthly | |
| `price_try` | decimal | **KDV hariç** |
| `vat_rate` | percent | Varsayılan 20 |
| `includes` | string[] | |
| `note` | text | "Kendiliğinden yenilenmez…" notu |
| `iyzico_link` | url | **Aşama A ödeme linki** |
| `iyzico_plan_code` | string | Aşama B (abonelik API) |
| `featured` | boolean | |
| `order` | integer | |

Mevcut kayıtlar:

| id | Paket | Fiyat (KDV hariç) |
|---|---|---|
| `06f604c81143` | Yıllık Paket (öne çıkan) | 15.000 TL / yıl |
| `52f4e338a982` | Kurulum + 1 yıl kullanım | 25.000 TL, tek seferlik |
| `a26de14ac86e` | Yıllık yenileme | 7.500 TL / yıl |
| `be65fb7e0825` | SMS paketi | Fiyat yok |

**`leads`** (koleksiyon, Studio public forms ile dolar)
- `type` seçenekleri: contact, demo, quote, waitlist, **order**.
- Order kaydında: name, email, phone, business, `product` (slug), `plan` (ad), `amount_try` (KDV dahil), `consents` (`obf:<tarih>;mss:<tarih>;ifa_onayi:evet;zaman:<ISO>`), `kvkk_consent`, `page`.
- Studio formu "Form Enabled + Public" olmalı ve tüm alanlar "Exposed" işaretlenmeli. Değilse uç nokta 404 döner.

**`company`** (singleton): kimlik bilgileri, `kep`, `setup_days`, `payment_logo_band`, `chamber_*`.

**`legal-pages`** (doküman, markdown): Gövdede `{{kep}}`, `{{kurulum_suresi}}`, `{{urun}}`, `{{paket}}`, `{{tutar}}` token'ları var.
- `src/lib/legal.ts` bunları build sırasında doldurur.
- Ödeme sayfasında ürün, paket ve **KDV dahil tutar** siparişe göre girer.

## 3. Aşama A: iyzico ödeme linki (şu anki kapsam)
**Akış**
1. Ziyaretçi ürün sayfasındaki paket kartında **"Satın al"** butonuna basar. Buton yalnız `iyzico_link` doluysa görünür; boşsa "Satın almak için yazın" ile forma gider.
2. `/odeme/{plan-id}/` açılır. Sayfada sipariş özeti (KDV hariç ve dahil) ve alıcı bilgileri (ad, e-posta, telefon, işletme) bulunur.
3. ÖBF ve MSS sipariş bilgileriyle doldurulmuş olarak gösterilir. Üç **işaretsiz** onay kutusu vardır: ÖBF, MSS ve "hizmetin hemen başlatılması" (MSY md.15/1-h).
4. Ziyaretçi **"Onayla ve ödemeye geç"** butonuna basar (buton metni MSY md.8 gereği). Onaylar `leads` modeline `type=order` olarak Studio'ya yazılır, ardından iyzico linkine yönlendirilir.
5. Ödeme iyzico sayfasında yapılır; taksit seçenekleri iyzico panelinden gelir.

**Yeni paket ya da link eklemek için**
1. iyzico panelinden pakete ödeme linki oluşturun: tutar **KDV dahil**, açıklamada ürün ve paket adı yazsın.
2. Linki Studio'da (ya da MCP `contentrain_content_save` ile) ilgili `plans.iyzico_link` alanına girin.
3. Netlify build'i tetiklenir; `/odeme/{plan-id}/` sayfası kendiliğinden oluşur.

**Ödeme sonrası (şimdilik elle)**
1. iyzico panelinde ödemeyi doğrulayın ve Studio'daki `type=order` kaydıyla eşleştirin (e-posta + tutar + zaman).
2. **e-Arşiv fatura** kesin. iyzico fatura kesmez.
3. **Sipariş teyidi** e-postası gönderin (ETHS Yön. md.9). Ekinde ÖBF ve MSS PDF'i olsun; kalıcı veri saklayıcı şartı bununla karşılanır.
4. `company.setup_days` iş günü içinde kurulumu yapın.
5. Süre bitmeden yenileme hatırlatması yapın. **Otomatik çekim yok**; yenileme yeni ödemeyle alınır (Abonelik Yön. md.13).

**Test**
- `CHECKOUT_PREVIEW=1 yarn build`: linki olmayan paketler için de `/odeme/{plan}/` üretilir ve yönlendirme yapılmaz.
- Statik çıktıyı servis edip formu doldurun. Order kaydı Studio'ya düşer; test kayıtlarını Studio'dan silin.

## 4. Aşama B: site içi ödeme ve abonelik (sonraki kapsam)
Tasarım önerisi; uygulamadan önce kullanıcıyla netleştirin.
- **Sunucu:** Site Netlify'da olduğu için Netlify Functions. Astro çıktısı statik kalır; fonksiyonlar `netlify/functions/` altına yazılır.
- **iyzico Checkout Form:**
  - `init` fonksiyonu sepeti **sunucuda** `plans` verisinden kurar; fiyat istemciden alınmaz.
  - `conversationId` olarak order kaydının kimliği kullanılır.
  - Callback fonksiyonu sonucu iyzico'dan **sorgulayarak** doğrular; istemciden gelen sonuca güvenilmez.
- **Webhook:** iyzico imza başlığı doğrulanır (docs.iyzico.com'daki güncel imza şemasına bakın). Tekrar eden bildirimlere karşı işlem kimliğiyle idempotent çalışılır.
- **Abonelik API:** Ürün ve fiyat planı iyzico'da tanımlanır; plan kodu `plans.iyzico_plan_code` alanına yazılır.
  - **Hukuki kısıt:** Belirli süreli tüketici sözleşmesi kendiliğinden uzatılamaz. Otomatik çekim ancak belirsiz süreli, her an iptal edilebilir bir abonelik olarak kurulabilir; metinler hukukçuya onaylatılmalı.
  - iyzico aboneliği non-3DS çalışır ve kart saklama ile birlikte kullanılamaz (araştırma notu: docs.iyzico.com/urunler/abonelik).
- **Ortam değişkenleri** (Netlify, gizli): `IYZICO_API_KEY`, `IYZICO_SECRET_KEY`, `IYZICO_BASE_URL` (sandbox: `https://sandbox-api.iyzipay.com`). **Hiçbiri `PUBLIC_` önekiyle tanımlanmaz.**
- **Sipariş kaydı:** Studio `leads` (type=order) ilk sürüm için yeterli. Ödeme durumu, fatura no ve kurulum durumu gerekirse ayrı bir `orders` modeli kurun; bu modelin yazma işlemi sunucu tarafından yapılır.
- **Sonrası:** Ödeme bildirimiyle kurulum talebi, otomatik e-posta (ÖBF + MSS PDF) ve ödenmeyen abonelikte askıya alma.

## 5. Dosya haritası
| Dosya | Görev |
|---|---|
| `src/components/PlanCard.astro` | Paket kartı. `iyzico_link` varsa "Satın al" → `/odeme/{id}/` |
| `src/pages/odeme/[plan].astro` | Hangi paketlere ödeme sayfası üretileceğini seçer (link + yayında ürün) |
| `src/views/CheckoutPage.astro` | Sipariş özeti, ÖBF/MSS, onay kutuları |
| `src/scripts/checkout.ts` | Doğrulama, Studio'ya order kaydı, iyzico yönlendirmesi |
| `src/scripts/studio-forms.ts` | Studio public forms istemcisi (`leads`) |
| `src/lib/legal.ts` | Yasal markdown render ve token doldurma |
| `src/lib/money.ts` | TL biçimi ve KDV hesabı |
| `src/lib/company.ts` | `company` singleton'ı |
| `ui` sözlüğü (`checkout.*`, `plan.*`) | Bu ekranların tüm metinleri |

**Ortam değişkenleri**

| Değişken | Kapsam |
|---|---|
| `PUBLIC_CONTENTRAIN_PROJECT_ID` | Formlar (herkese açık) |
| `PUBLIC_CONTENTRAIN_STUDIO_URL` | Formlar (herkese açık) |
| `STUDIO_CDN_KEY` | Yalnız build; medya bilgisi |
| `CHECKOUT_PREVIEW` | Yalnız yerel test |

## 6. Kaynaklar
- iyzico başvuru koşulları: https://www.iyzico.com/destek/yardim-merkezi/basvuru/basvuru-olusturma
- iyzico geliştirici dokümanları: https://docs.iyzico.com (Checkout Form, Abonelik, Webhook, Sandbox)
- iyzico logo paketi: https://docs.iyzico.com/ek-bilgiler/iyzico-logo-paketi
- Contentrain Studio formları: https://docs.contentrain.io/guide/forms
