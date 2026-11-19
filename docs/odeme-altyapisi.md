# Ödeme altyapısı: devir dokümanı

_Son güncelleme: 19 Kasım 2026. Ödeme işine başlayan her oturum önce bu dosyayı, sonra `docs/CHECKLIST.md` dosyasını okur. Bu dosyayı güncel tutun._

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
- **Landing'de ödeme kodu yoktur (karar, 2026-11-19).** Sözleşme onayları, ödeme, abonelik, fatura ve kurulum talebi her ürünün kendi backend'inde kurgulanır. Landing yalnız ürünü tanıtır ve "Satın al" ile ürünün satın alma sayfasına yönlendirir.

## 1. Mimari
| Katman | Görev |
|---|---|
| **Landing (bu repo)** | Ürün ve fiyat vitrini, yasal metinler, iyzico logo bandı, iletişim ve demo formları. Paket kartındaki "Satın al" → `plans.checkout_url` |
| **Ürün backend'i** (ör. Hesap Takip) | ÖBF + MSS gösterimi ve işaretsiz onay kutuları, iyzico ödeme / abonelik, ödeme doğrulama ve webhook, e-Arşiv fatura, sipariş teyit e-postası, kurulum ve yenileme |

`plans.checkout_url` boşsa kartta "Satın almak için yazın" görünür ve ürün sayfasındaki forma gider.

## 2. Landing'de durum
- **Satıcı:** LANİSTA YAZILIM SAN. VE TİC. LTD. ŞTİ. (VKN 6081185221, MERSİS 0608118522100001). Bilgiler Contentrain `company` singleton'ında.
- **iyzico hesabı:** contentrain.io için açılmış bir üye işyeri hesabı var. Hesabın **Lanista Ltd. Şti.** unvanına kayıtlı olduğu panelden teyit edilmeli; değilse Lanista adına başvuru gerekir. Başvuruda bildirilecek site ve ürünlerin satın alma sayfalarının alan adları birlikte değerlendirilmeli.
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
| SSL | Netlify, HTTPS |

- **Açık işler**
  - **Yasal metinler eski akışı anlatıyor:** "sitedeki onay sayfası", "iyzico ödeme linki" ve "kendiliğinden yenilenmez, otomatik çekim yok" ifadeleri. Ürün backend'indeki akış ve abonelik koşulları netleşince güncellenip hukukçuya onaylatılacak (MSS 4.x, 6.4, 7.2, son bölüm; ÖBF; teslimat-iade; işlem rehberi; çerez; KVKK; hakkımızda; `plans.note`).
  - **KEP adresi** (`company.kep`): yok.
  - **ETBİS kaydı:** satışa başlamadan önce.
  - **`plans.checkout_url`:** ürün backend'indeki satın alma sayfası hazır olunca girilecek.
  - **SMS paketi fiyatı:** yok.

## 3. Veri modelleri (Contentrain)
**`plans`** (koleksiyon, TR + EN)

| Alan | Tip | Not |
|---|---|---|
| `name` | string | Paket adı |
| `product` | relation → products | |
| `billing` | one_time / yearly / monthly | |
| `price_try` | decimal | **KDV hariç** |
| `vat_rate` | percent | Varsayılan 20 |
| `includes` | string[] | |
| `note` | text | Yenileme / güncelleme notu |
| `checkout_url` | url | Ürünün kendi satın alma sayfası; boşsa forma gider |
| `featured` | boolean | |
| `order` | integer | |

Mevcut kayıtlar:

| id | Paket | Fiyat (KDV hariç) |
|---|---|---|
| `06f604c81143` | Yıllık Paket (öne çıkan) | 15.000 TL / yıl |
| `52f4e338a982` | Kurulum + 1 yıl kullanım | 25.000 TL, tek seferlik |
| `a26de14ac86e` | Yıllık yenileme | 7.500 TL / yıl |
| `be65fb7e0825` | SMS paketi | Fiyat yok |

**`legal-pages`** (doküman, markdown): `{{kep}}`, `{{kurulum_suresi}}` build sırasında doldurulur. `{{urun}}`, `{{paket}}`, `{{tutar}}` landing'de genel ifadeyle gösterilir; siparişe özel değerleri ürün backend'i kendi ÖBF/MSS ekranında doldurur.

## 4. Ürün backend'i için notlar (landing dışı)
Bu maddeler ürün backend'ini kuracak oturumlar içindir.
- **Sipariş öncesi (MSY md.5–8):** ÖBF ve MSS siparişe özel (ürün, paket, KDV dahil tutar) gösterilir; işaretsiz ayrı onay kutuları; buton metni "Onayla ve ödemeye geç" ya da eşdeğeri; hizmetin hemen başlatılması için ayrı onay (md.15/1-h).
- **Ödeme:** iyzico Checkout Form ya da Abonelik API. Sepet sunucuda kurulur, fiyat istemciden alınmaz; sonuç iyzico'dan sorgulanarak doğrulanır; webhook imzası doğrulanır ve işlem kimliğiyle idempotent çalışılır.
- **Abonelik (hukuki kısıt):** Belirli süreli tüketici sözleşmesi kendiliğinden uzatılamaz (Abonelik Yön. md.13). Otomatik çekim, belirsiz süreli ve her an iptal edilebilir abonelik olarak kurulmalı; iptal eden ödediği dönemin sonuna kadar kullanır. Metinler hukukçuya onaylatılmalı.
- **Sonrası:** e-Arşiv fatura, sipariş teyit e-postası (ÖBF + MSS ekli; ETHS Yön. md.9), `company.setup_days` iş günü içinde kurulum, ödenmeyen abonelikte askıya alma.
- **Gizli anahtarlar** yalnız ürün backend'inde durur; landing'e iyzico anahtarı konmaz.

## 5. Dosya haritası (landing)
| Dosya | Görev |
|---|---|
| `src/components/PlanCard.astro` | Paket kartı; `checkout_url` varsa "Satın al" oraya gider |
| `src/scripts/studio-forms.ts` | Studio public forms istemcisi (`leads`: contact, demo, quote, waitlist) |
| `src/lib/legal.ts` | Yasal markdown render ve token doldurma |
| `src/lib/money.ts` | TL biçimi ve KDV hesabı |
| `src/lib/company.ts` | `company` singleton'ı |

**Ortam değişkenleri:** `PUBLIC_CONTENTRAIN_PROJECT_ID`, `PUBLIC_CONTENTRAIN_STUDIO_URL` (formlar), `STUDIO_CDN_KEY` (yalnız build).

_Not: Landing'deki `/odeme/` ön onay sayfası 2026-11-19'da kaldırıldı (git geçmişinde `src/views/CheckoutPage.astro`, `src/scripts/checkout.ts`); ürün backend'i kendi onay ekranını kurarken referans alınabilir. `leads.type` içindeki `order` seçeneği eski kayıtlar için duruyor._

## 6. Kaynaklar
- iyzico başvuru koşulları: https://www.iyzico.com/destek/yardim-merkezi/basvuru/basvuru-olusturma
- iyzico geliştirici dokümanları: https://docs.iyzico.com (Checkout Form, Abonelik, Webhook, Sandbox)
- iyzico logo paketi: https://docs.iyzico.com/ek-bilgiler/iyzico-logo-paketi
- Contentrain Studio formları: https://docs.contentrain.io/guide/forms
