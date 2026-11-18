# Lanista — Ürün Satışı ve iyzico Brief'i

_Tarih: 2026-11-18 · Amaç: lanista.com.tr'yi "yazılım ajansı" sitesinden "ajans + hazır ürünler" sitesine dönüştürmek ve ürünleri iyzico ile satışa açmak. Bu belge, landing güncellemesini yapacak oturumun tek kaynağıdır._

---

## 1. Özet

Lanista Yazılım bugüne kadar saatlik / aylık / proje bazlı yazılım hizmeti ve uçtan uca ürün geliştirme satıyordu. Bundan sonra buna ek olarak **küçük ve yerel işletmelere yönelik, hızlı üretilen hazır ürünler** satacak. İlk ürün **Hesap Takip** sahada çalışıyor (3 işletme). Aynı çekirdekten sektöre uyarlanmış yeni ürünler (Nalbur Takip, Kasa Takip, …) çıkacak.

Site güncellemesinin hedefleri:

1. Ürünleri tek bir katalog altında, her biri kendi satış sayfasıyla sunmak.
2. Her ürünün paketlerini (tek seferlik ve/veya abonelik) **iyzico ile ödenebilir** hale getirmek.
3. iyzico'nun başvuru/onay için baktığı yasal sayfaları ve şirket bilgilerini sitede eksiksiz yayımlamak.
4. Sektör aramalarında (SEO) ve yapay zekâ aramalarında (GEO) bulunur olmak.
5. Ajans hizmetlerini bozmadan korumak.

---

## 2. İş modeli

### 2.1 İki gelir ayağı
| Ayak | Ne satılıyor | Kime |
|---|---|---|
| **Hizmet (mevcut)** | Saatlik / aylık / proje bazlı yazılım geliştirme, uçtan uca ürün | Şirketler, girişimler |
| **Ürünler (yeni)** | Sektöre özel, hazır, telefondan çalışan iş uygulamaları | Defter/Excel kullanan küçük ve yerel işletmeler |

### 2.2 Ürün stratejisi
- **Tek çekirdek, sektör paketleri:** cari, satış, tahsilat, vade, hatırlatma, ekstre ortak; alan adları ve birkaç özellik sektöre göre değişir.
- **Hedef müşteri:** finansal olarak güçlü ama yazılıma alışkın olmayan, işini defter ya da Excel'le yürüten yerel işletme. Tek seferde 20–30 bin TL ödeyebilecek ciroda.
- **Hızlı üret, sahada doğrula:** yeni ürün önce "Yakında" sayfası + bekleme listesiyle talep ölçer; yeterli talep gelince geliştirilir ve satışa açılır.

### 2.3 Fiyatlandırma modeli (Hesap Takip için kesinleşmiş)
- **İlk satış:** 25.000 TL + KDV → kurulum + ilk 1 yıl kullanım.
- **Yıllık yenileme:** 7.500 TL + KDV / yıl (2. yıldan itibaren bakım, güncelleme ve kullanım). Her yıl TÜFE/ÜFE'ye göre güncellenir.
- **Ödeme:** kredi kartı, taksitli (taksit sayısı ve vade farkı henüz kesin değil).
- **SMS paketi:** fiyata dahil değil, Lanista'dan ayrıca satılır (bkz. 2.4).
- Diğer ürünlerin fiyatları henüz belirlenmedi; aynı yapı (tek seferlik kurulum + yıllık yenileme) ya da aylık/yıllık abonelik olabilir. **Site, ürün başına farklı modelleri desteklemeli.**

### 2.4 SMS modeli
- Lanista, İleti Merkezi'ne kendi adıyla kaydolup SMS'i toptan alır, müşteriye paket olarak satar.
- Mesajlar ürünün **tek ortak gönderici adıyla** gider (kalıcı ürün adı seçilince); mesaj metninde dükkânın adı yazar. Dükkân başvuru/belge ile uğraşmaz.
- Hatırlatma SMS'leri **bilgilendirme iletisidir** (borç hatırlatması), İYS kaydı gerektirmez; mesaja reklam eklenmez.
- **Sitede kâr marjı veya maliyet yazılmaz.**

### 2.5 Ürün adı
"Hesap Takip" çalışma adıdır. Satış potansiyeli netleşince kalıcı ad seçilecek (adaylar: **Kalfa**, **Tezgâh**; marka ve alan adı kontrolü yapılmadı). Ad değişirse eski URL'ler 301 ile yeni adrese yönlendirilir — URL yapısı buna hazır olmalı.

---

## 3. Ürünler

### 3.1 Hesap Takip — YAYINDA
Oto yedek parça dükkânlarının veresiye defterini telefona taşır; vadesi geçen alacağı her sabah önüne koyar.

**Kimler kullanıyor:** Van'da bir oto yedek parça işletmesi (2 şube) ve ikinci bir işletme — toplam 3 kurulum. _İşletme adları referans olarak ancak yazılı izinle kullanılabilir; izin henüz yok, sitede ad verilmez._

**Özellikler (hepsi çalışıyor):**
- Hızlı satış girişi (20–30 sn): parça adı, adet, fiyat, plaka; daha önce satılan parça öneri olarak gelir
- Tahsilat, iade (satışın içinden, kalem kalem), alış ve tedarikçi carisi
- Vade gün sayısı ayarı; vadesi geçen kırmızı, yaklaşan sarı; "Vadesi geçenler" listesi
- Her sabah 10:30'da vadesi geçenler bildirimi (push)
- Vadesi geçenlere SMS hatırlatma: onaylı ya da otomatik; aynı müşteriye varsayılan olarak en sık 7 günde bir (1–60 gün arası ayarlanabilir), dükkân başına günde en çok 20 mesaj, pazar ve 10:00–18:00 dışında gönderim yok
- Ekstre PDF, WhatsApp'tan gönderim; logolu fiş/ekstre
- Plakaya göre geçmiş ("bu arabaya ne takmıştık?")
- Çevrimdışı satış ve tahsilat; bağlantı gelince kendiliğinden gönderilir
- Bulut (Google Firebase, Avrupa sunucuları); telefon kaybolsa da veri kaybolmaz; dükkândaki her cihazdan açılır
- Telefona uygulama gibi eklenir (PWA), program kurulumu gerekmez
- Ortak parça kataloğu: parça adları ve kodları öneri olarak gelir; **fiyat, müşteri ve satış adedi paylaşılmaz**
- Uygulama içi kullanım kılavuzu

**Yol haritasında (sitede "eksik" diye anlatılmaz, "ekleniyor" denir):** e-Fatura / e-Arşiv entegrasyonu, SMS bakiye/kota takibi, OEM numaralı parça sözlüğü ve distribütör fiyat listesi içe aktarma.

**Demo:** https://hesap-takip-demo.web.app/panel (örnek verili). **Giriş bilgileri sitede yayımlanmaz** — "Demo iste" formu ile satış ekibi gösterir.

**Konumlandırma cümleleri (satış rehberinden):**
- "Sabah dükkânı açınca bugün kimi aramanız gerektiği telefonunuzda hazır olur."
- "Tartışma yerine ekstreyi gönderiyorsunuz; usta kendi gözüyle görüyor."
- "Hatırlatmayı siz değil sistem yapar; tatsız telefonu açmak zorunda kalmazsınız."
- "Sanayide internet gider gelir; kayıt durmaz."

### 3.2 Nalbur Takip — YAKINDA (ödeme alınmaz, bekleme listesi)
Hırdavat, nalbur ve inşaat malzemecileri için Hesap Takip çekirdeği + sektör paketi.

**Neden bu sektör:** usta ve müteahhitlere veresiye satış, kalem kalem ürün, ay sonu tahsilat derdi — oto sanayinin ikizi. Pazarda ya 15 yıllık masaüstü "nalbur programları" (MFD, Tempo vb.) ya da ağır ERP'ler (Bilsoft, Logo, Odoo) var; telefondan çalışan, sade, vade odaklı bir ürün yok. Aynı alana yeni giren tek oyuncu: Muhasorex (incelenmedi).

**Planlanan farklar:**
- "Plaka" yerine **İş / Şantiye** alanı; ekstre şantiye bazında
- Birimler ve ondalıklı miktar (torba, kg, ton, m, m², m³)
- **Teslim alanın adı ve telefonda imza** ("biz almadık" tartışmasını bitirir)
- **Çek / senet takibi** (müteahhit vadeli çekle öder; vadesi yaklaşan çek hatırlatması)
- Müşteri **kredi limiti** uyarısı
- **Online mutabakat linki** (müşteri ekstreyi bir tıkla onaylar ya da itiraz eder)
- Teklif → satış, toplu fiyat güncelleme, teslimat durumu
- Excel'den toplu müşteri aktarımı

**Tek cümle:** "Ustanızın ve müteahhidinizin hesabını şantiye şantiye tutar; kim neyi teslim aldı imzasıyla kayıtlı; vadesi gelen alacağı ve çeki size, müşteriye de SMS'le hatırlatır."

### 3.3 Kasa Takip — PİLOTTA (Tosthane uygulamasından)
_Varsayım: "Kasa Takip", Tosthane için yapılan kasa defteri uygulamasının ürünleşmiş halidir. Kullanıcı teyit etmeli._

Yiyecek-içecek işletmelerinin (büfe, tostçu, kafe, küçük restoran) **Excel'de tuttuğu günlük kasa defterinin yerine geçer**: gün sonunda kasa, kanal kanal gelir, giderler, kâr ve tedarikçi borcu tek ekranda.

**Pilot:** Tosthane (bir tost/büfe işletmesi). Yıllardır günlük kasayı Excel'de tutuyordu; panel o Excel'in birebir yerine geçti. Kod: `~/Desktop/Projects/tosthane` (Nuxt + Firebase, PWA), canlı: https://tosthane-4c88b.web.app. _İşletme adı referans olarak ancak izinle kullanılır._

**Özellikler (çalışıyor):**
- **Gün ekranı:** gece kasa, devir, kanal kanal brüt gelir (nakit, kart, yemek platformları vb.) ve giderler; kaydet düğmesi yok, her değişiklik kendiliğinden kaydedilir
- **Otomatik hesap (Excel formülleriyle aynı):** nakit satış, ciro, platform komisyonları düşülmüş net, kâr; aile çekişi kasadan çıkar ama kârdan düşülmez
- **Platform oranları tarihli:** oran değişse de eski günlerin raporu değişmez
- **Günler:** ay ay liste, girilmemiş günler işaretli
- **Raporlar:** dönem seçimi; kanal, gider türü, kişi bazında döküm, "para en çok nereye gitti"; Excel olarak indirme
- **Kişiler:** çalışan ve tedarikçiler; kişi başına aylık ödeme
- **Tedarikçi carisi:** veresiye alım, ödeme, anlık bakiye ve ekstre
- **Akıllı gider girişi:** "ekmek" yazınca gider türü kendiliğinden gelir; düzeltilirse bir dahakine doğrusu gelir
- İnternet yokken de çalışır, telefona uygulama gibi eklenir, bulutta yedekli
- **Ek:** işletmenin tanıtım sayfası (menü, fotoğraflar, sipariş kanalları, adres) aynı paketle yapılabiliyor — "tanıtım sayfası + kasa paneli" paketi olarak sunulabilir

**Tek cümle:** "Akşam kasayı sayın, rakamları girin; ciro, platform kesintisi, gider ve gerçek kârınız telefonunuzda hazır. Excel'e gerek kalmaz."

**Hedef müşteri:** yemek platformlarıyla (Yemeksepeti, Getir, Trendyol Yemek vb.) çalışan, kasayı defter ya da Excel'de tutan büfe, tostçu, kafe, pideci, küçük restoran.

**Fiyat:** belirlenmedi (kullanıcıdan alınacak). Satışa açılana kadar sayfa "Pilotta / Yakında" + bekleme listesi ile yayımlanabilir; kullanıcı satışa açık derse paketler eklenir.

### 3.4 Gelecek aday sektörler (sitede ürün olarak gösterilmez; bilgi için)
Pazar araştırması (2026-11-18; Google Trends, YouTube Excel video yorumları, Play Store) sonuçları:
- **Güçlü uyum:** elektrik/tesisat/boya bayileri, lastikçi-akü-oto servis, toptan gıda dağıtıcıları, kereste/demir.
- **Uyarlamayla güçlü:** zirai ilaç-gübre-yem bayileri (hasat vadesi), senetli satış yapan mobilya/beyaz eşya (taksit planı), akaryakıt (filo carisi), kuyumcu (gram altın cari).
- **Talep yüksek ama kalabalık ve ucuz:** aidat/site yönetimi ve kira takibi (çok sayıda iOS uygulaması var) — öncelik değil.
- "veresiye programı" en çok Yozgat, Aksaray, Amasya, Karaman, Kastamonu, Konya'da aranıyor → küçük il esnafı defterden çıkmak istiyor.
- Excel videolarında sık istek: hazır dosya, gecikme/vade takibi, ekstre; 236 yorumdan 13'ü "satın almak istiyorum", 5'i "bana özel program yazar mısınız".
- Play Store şikâyetleri: telefon değişince veri kaybı, sürpriz ücret, rehberden toplu aktarım yok → bizim bulut, açık fiyat ve toplu aktarım vaadimiz.

---

## 4. iyzico hedefi

### 4.1 Mevcut durum
- **Onaylı bir iyzico üye işyeri hesabı var** (Contentrain ürünü için açıldı; kayıtlı site **contentrain.io**). Satışlar **Lanista Yazılım Ltd. Şti.** üzerinden yapılacak (karar). Contentrain A.Ş. ayrı bir şirket olduğu için hesabın Lanista unvanına kayıtlı olduğu panelden teyit edilmeli (bkz. Bölüm 6).
- Yeni ürünler aynı şirket (Lanista) üzerinden satılacak → büyük olasılıkla yeni hesap gerekmez, **yeni site/ürün bildirimi** gerekir.

### 4.2 iyzico'ya gidecek talep (site hazır olduktan sonra)
- contentrain.io'yu **değiştirmek yerine lanista.com.tr'yi ek site olarak** eklemek (Contentrain ödemeleri sürüyorsa bozulmasın).
- Sorular: aynı hesaba yeni site eklenebilir mi; yazılım lisansı + yıllık yenileme için kartla taksit; yıllık/aylık **otomatik çekim (abonelik)**; yan ürün olarak SMS paketi satışı uygun mu.
- iyzico başvuru/kontrolünde siteye bakar → **Bölüm 6'daki yasal sayfalar ve şirket bilgileri yayında olmalı.**

### 4.3 Ödeme altyapısı — iki aşama
**Aşama A (bu güncellemenin kapsamı):**
- Her ürün paketi için iyzico panelinde **ödeme linki** oluşturulur; "Satın al" düğmesi o linke gider.
- Taksit seçenekleri iyzico panelinden.
- Site statik yayımlandığı için sunucu kodu gerekmez. Yeni paket = iyzico'da link + Contentrain'de kayıt.
- iyzico linkleri henüz yok → modelde alan boşsa düğme "Teklif iste / Bizi arayın" olarak görünür.

**Aşama B (sonra, kapsam dışı ama tasarım buna izin vermeli):**
- Site içi ödeme (iyzico Checkout Form) + iyzico **abonelik API'si** (ürün + fiyat planı iyzico'da tanımlı, dönemsel otomatik çekim).
- Ödeme bildirimi (webhook) → kurulum talebi / otomatik hesap açma; ödenmeyen abonelikte askıya alma.
- Küçük bir sunucu tarafı gerekir (Firebase Functions ya da Cloudflare).
- _Not: iyzico abonelik ve link özelliklerinin hesapta açık olduğu doğrulanmadı._

### 4.4 Kurallar
- **Henüz olmayan ürün için ödeme alınmaz.** "Yakında" ürünlerde yalnız bekleme listesi (mesafeli satışta teslim yükümlülüğü, iade/chargeback ve iyzico hesap riski).
- **Fatura:** iyzico fatura kesmez; her satış için Lanista e-Arşiv fatura keser (başta elle).
- **Teslim:** kurulum bugün elle yapılıyor; sözleşmede "ödemeden sonra en geç X iş günü içinde kurulum" yazar (X kullanıcıdan alınacak).
- Fiyatlar sitede **KDV hariç** ve "+ KDV" ibaresiyle; KDV dahil tutar da gösterilebilir.

---

## 5. Site yapısı (lanista.com.tr)

### 5.1 URL'ler
| Adres | İçerik |
|---|---|
| `/` (EN) ve `/tr/` | Ana sayfa: hizmetler + ürünler için iki blok |
| `/urunler/` | Ürün kataloğu: kart başına sektör, kısa vaat, "₺… + KDV'den başlayan", Yayında/Yakında etiketi |
| `/urunler/hesap-takip/` | Ürün satış sayfası |
| `/urunler/nalbur-takip/`, `/urunler/kasa-takip/` | Yakında sayfaları + bekleme listesi |
| `/yasal/mesafeli-satis/`, `/yasal/on-bilgilendirme/`, `/yasal/iade-iptal/`, `/yasal/kvkk/`, `/yasal/gizlilik/` | Tüm ürünler için ortak yasal metinler |
| `/services/…` | Mevcut ajans sayfaları, korunur |

- Ürün ve yasal sayfalar **yalnız Türkçe** (ürünler Türkiye pazarına). Mevcut i18n yapısı: `/` EN varsayılan, `/tr/` TR. Ürün sayfaları için iki seçenek var — landing oturumu karar verir:
  - (a) i18n öneki dışında Türkçe sayfalar (`/urunler/...`) — kısa, paylaşılabilir adres (**önerilen**)
  - (b) `/tr/urunler/...` — mevcut yapıya birebir uyum
- `site.trailingSlash: true` korunur; canonical/sitemap/hreflang buna göre (bkz. `docs/seo-audit.md`).
- Uygulamanın kendisi (müşteri paneli) bu sitede değildir; ileride `panel.lanista.com.tr` gibi bir alt alan adında olacak.

### 5.2 Ürün sayfası şablonu (tüm ürünler tek şablon)
1. **Hero:** derdi + vaadi söyleyen başlık, kısa alt cümle, "Demo iste" + "Satın al / Fiyatları gör"
2. **Bugünkü dert → ne yapıyor** tablosu (3–6 satır)
3. **Ekran görüntüleri** (telefon çerçevesinde) veya kısa video
4. **Özellikler** (gruplu, sade dil)
5. **Paketler ve fiyat** (plans modelinden; tek seferlik / abonelik etiketi, "+ KDV", taksit notu)
6. **Güven:** veriniz nerede, kimse fiyatınızı görmez, telefon kaybolsa da veri kaybolmaz, destek
7. **SSS**
8. **Son çağrı:** demo / satın al / bekleme listesi
- "Yakında" durumundaki ürün: 1, 2, 4 (planlanan), bekleme listesi formu; fiyat ve satın al yok.

### 5.3 Formlar
- **Demo iste / Teklif iste / Bekleme listesi:** mevcut iletişim formu altyapısı (Firestore, `plugins/firebase.client.ts`) yeniden kullanılır; kayıtta `product` ve `type` (demo / teklif / waitlist) alanı.
- KVKK aydınlatma onay kutusu zorunlu.

### 5.4 SEO / GEO
- Her ürün sayfası kendi sektör aramasını hedefler: "veresiye programı", "cari takip programı", "nalbur programı", "hırdavat programı", "kasa takip programı" vb.
- Yapılandırılmış veri: `SoftwareApplication` + `Offer` (fiyat, TRY), `FAQPage`, `Organization` (Lanista) — ürünün Lanista'ya ait olduğu açık olsun.
- Başlık/açıklama uzunlukları SERP'te kırpılmayacak boyda (bkz. `docs/seo-audit.md`).
- OG görselleri ürün başına (`nuxt-og-image` zaten kurulu).
- Sitemap'e ürün ve yasal sayfalar.

---

## 6. Yasal sayfalar ve şirket bilgileri (iyzico için zorunlu)
- Mesafeli satış sözleşmesi, ön bilgilendirme formu, iptal-iade ve cayma koşulları (dijital hizmet/yazılım lisansında cayma istisnaları), KVKK aydınlatma metni, gizlilik politikası.
- Ürün ve paket adı metne değişken olarak girer; tek metin tüm ürünlere hizmet eder.
- Footer'da ve yasal sayfalarda Lanista'nın şirket bilgileri yer alır:

| Bilgi | Değer | Kaynak |
|---|---|---|
| Ticari unvan | **LANİSTA YAZILIM SANAYİ VE TİCARET LİMİTED ŞİRKETİ** | Vergi levhası, Ticaret Sicil Gazetesi |
| Kısa ad | Lanista Yazılım San. ve Tic. Ltd. Şti. | |
| Adres | **Bardakçı Mah. Teknokent Sk. No: 1 İç Kapı No: 9 Tuşba / Van** (Van Teknokent) | Vergi levhası (2024) |
| Vergi dairesi | **Van** | Vergi levhası |
| Vergi kimlik no | **6081185221** | e-Arşiv fatura, KOSGEB yazısı, makbuz |
| MERSİS no | **0608118522100001** | Ticaret Sicil Gazetesi (19.08.2019, sayı 9890) |
| Ticaret sicil no | **442 / Tuşba** (Van Ticaret Sicili Müdürlüğü) | Ticaret Sicil Gazetesi |
| Kuruluş / işe başlama | 09.08.2019 | Vergi levhası |
| Faaliyet (NACE) | 62.01.01 — Bilgisayar programlama faaliyetleri | Vergi levhası |
| Telefon, e-posta, KEP | **Eksik** — belgelerde ve mevcut sitede yok; kullanıcıdan alınacak | |

- _Adres 2024 vergi levhasından; o tarihten sonra değişiklik varsa kullanıcı teyit etmeli. Güncel levha: dijital.gib.gov.tr._
- **Karıştırılmamalı:** `CONTENTRAIN YAZILIM TEKNOLOJİLERİ ANONİM ŞİRKETİ` (Zincirlikuyu V.D., MERSİS 0211141869900001, Şişli/İstanbul; Van şubesi Teknokent İç Kapı 13) **ayrı bir tüzel kişidir.** Bu sitedeki ürünlerin satıcısı Lanista Ltd. Şti.'dir.
- **Karar (2026-11-18): tüm ürün satışları Lanista Yazılım San. ve Tic. Ltd. Şti. üzerinden yapılır.** Satıcı, fatura kesen ve iyzico üye işyeri aynı şirkettir. Yasal metinlerde satıcı olarak yalnız Lanista Ltd. Şti. yazar.
- **iyzico kontrolü:** mevcut hesap contentrain.io için açıldı. Panelde hesabın Lanista Ltd. Şti. unvanına kayıtlı olduğu teyit edilmeli. Lanista'ya kayıtlıysa yalnız yeni site bildirilir; Contentrain A.Ş.'ye kayıtlıysa Lanista adına yeni üye işyeri başvurusu yapılır.
- Mevcut Lanista / Contentrain yasal metinleri varsa onlardan uyarlanır.
- Taslaklar hazırlanır; **son hali hukukçu/mali müşavir kontrol eder** (sayfada taslak olduğu yayımlanmadan önce netleşmeli).

---

## 7. İçerik modeli (Contentrain)
Proje kuralları geçerli: `.contentrain/` dosyaları **yalnız Contentrain MCP araçlarıyla** okunur/yazılır; `meta/`, `client/`, `context.json` elle düzenlenmez; `#contentrain` yalnız `server/api/*` içinde; değişiklik sonrası `contentrain generate`.

Önerilen yeni modeller (kesin şema landing oturumunda `contentrain_describe_format` sonrası):

**`products` (collection, i18n: yalnız tr ya da tr içerikli)**
- `name` (title_field), `slug`, `status` (select: live / soon), `sector`, `tagline`, `heroTitle`, `heroText`
- `pains` (dert → çözüm listesi), `features`, `roadmap` (planlanan özellikler)
- `screenshots` (media), `faq` (relation → faq ya da gömülü), `seoTitle`, `seoDescription`
- `demoUrl` (opsiyonel; demo giriş bilgisi **asla** içerikte tutulmaz)

**`plans` (collection)**
- `product` (relation → products), `name` (title_field), `billing` (select: one_time / yearly / monthly)
- `priceTry` (sayı, KDV hariç), `vatRate`, `includes` (liste), `note` (ör. "TÜFE/ÜFE ile güncellenir")
- `iyzicoLink` (url, opsiyonel), `iyzicoPlanCode` (string, Aşama B için), `order`

Örnek Hesap Takip planları:
| Paket | Model | Tutar |
|---|---|---|
| Kurulum + 1 yıl | one_time | 25.000 TL + KDV |
| Yıllık yenileme | yearly | 7.500 TL + KDV |
| SMS paketi | one_time | belirlenecek |

**`legal-pages` (document)** — yasal metinler markdown.

---

## 8. Ses ve dil kuralları
- Sanayi esnafının dili: sade, kısa cümle; "dijital dönüşüm", "platform", "çözüm", "entegrasyon" gibi kelimelerden kaçın.
- Planlanan özellikler **"yok/eksik" diye anlatılmaz**; "ekleniyor" denir (e-Fatura örneği).
- **Kullanıcı yönetimi hiç anılmaz.**
- Kâr marjı, maliyet, SMS alış fiyatı yazılmaz.
- Müşteri adları ve gerçek veriler (ör. "136 cariden 31'i") izin olmadan kullanılmaz; anonim ifade: "Van'da iki şubeli bir yedek parçacı".
- Rakip kötülenmez; karşılaştırma özellik üzerinden.

---

## 9. Kapsam ve sıra (landing oturumu)
1. Yeni dal; Contentrain modelleri (`products`, `plans`, `legal-pages`) ve içerik.
2. `/urunler/` katalog + ürün şablonu + Hesap Takip sayfası + Nalbur/Kasa "Yakında" sayfaları.
3. Ana sayfaya ürünler bloğu, header/footer'a "Ürünler" ve yasal bağlantılar.
4. Demo / teklif / bekleme listesi formları.
5. Yasal sayfa taslakları + şirket bilgileri (kullanıcıdan).
6. SEO: meta, yapılandırılmış veri, sitemap, OG.
7. `yarn lint`, `yarn generate`, önizleme; PR.

**Kapsam dışı:** iyzico Aşama B (site içi ödeme, abonelik API, webhook), müşteri paneli, otomatik kurulum.

---

## 10. Açık sorular (oturum başında kullanıcıya)
1. Lanista'nın telefon, e-posta ve (varsa) KEP adresi; adresin hâlâ Teknokent İç Kapı 9 olduğu; iyzico hesabının Lanista Ltd. adına olduğu (bkz. Bölüm 6). Unvan, vergi no, MERSİS ve sicil no Bölüm 6'da.
2. Kasa Takip = Tosthane kasa uygulaması mı (Bölüm 3.3)? Fiyatı ne, satışa açık mı yoksa "Pilotta / Yakında" mı? Tanıtım sayfası + menü ayrı paket olarak satılacak mı?
3. Ürün sayfaları `/urunler/...` mi `/tr/urunler/...` mi?
4. Hesap Takip taksit sayısı ve vade farkı; SMS paket fiyatları.
5. Kurulum teslim süresi (X iş günü).
6. Ekran görüntüleri: demo ortamından alınabilir mi (örnek veri, gerçek müşteri yok)?
7. Mevcut Lanista/Contentrain yasal metinleri nerede?
8. iyzico ödeme linkleri ne zaman hazır olacak (o zamana kadar "Teklif iste")?

---

## 11. Kaynaklar ve ilgili materyal
- Satış rehberi (ajans için, Claude Docs): https://claude.ai/artifact/6d69krqokAH27Fh5kUqGCy — ürün anlatımı, itirazlar, SSS, doğru söylemler. Demo giriş bilgisi içerir; **siteye taşınmaz**.
- Parça arama yol haritası (Claude Docs): https://claude.ai/artifact/Csq933YPsxDTvgxtz8QoLz
- Ürün kodu: `~/Desktop/Projects/otodeniz-landing` (Hesap Takip; Nuxt 4 PWA, Firebase; kurulum başına ayrı Firebase projesi) ve `~/Desktop/Projects/tosthane` (Kasa Takip pilotu; README ürünü ve hesap mantığını anlatıyor). Ekran görüntüleri için demo/emülatör verisi kullanılır, gerçek müşteri verisi değil.
- Demo: https://hesap-takip-demo.web.app/panel
- SEO denetimi: `docs/seo-audit.md`
