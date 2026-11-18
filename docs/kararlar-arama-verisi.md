# Arama verisine dayalı kararlar (2026-11-18)

_Fable analizi. Kullanıcı ana sayfa sadeleştirmesini onayladı ve kararın Google verisiyle verilmesini istedi. Google Trends 429 verdiği için ölçüm, Google otomatik tamamlama (`suggestqueries.google.com`, hl=tr, gl=tr, ~70 sorgu) ve rakiplerin herkese açık fiyat sayfalarıyla yapıldı. **Ö** = ölçülen, **Ç** = çıkarım. Arama hacmi rakamı yoktur._

## A) Ana sayfa
**Kalan 6 hizmet:**
1. Mobil Uygulama Geliştirme (Ö: "mobil uygulama geliştirme", şehirli varyantları)
2. Web Sitesi ve E-Ticaret (Ö: "web sitesi yaptırmak istiyorum", "e-ticaret sitesi fiyatları")
3. Web Uygulaması / Özel Yazılım (Ö: "özel yazılım geliştirme fiyatları")
4. Ödeme Entegrasyonu (Ö: "iyzico/paytr ödeme entegrasyonu")
5. POS Uygulama Geliştirme (Ö: "pos uygulaması", "yemeksepeti pos uygulaması")
6. AI Destekli Geliştirme (Ö: "yapay zeka destekli yazılım geliştirme")

**Hizmet sayfalarına taşınanlar:** MVP, SaaS, Mikroservis, Headless CMS, Ürün Tasarımı. Bunların önerileri "nedir", ders ya da İngilizce niyetli.

**Teknoloji sekmeleri ana sayfadan kalktı.** "SEO / Sosyal Medya" kategorileri ajans izlenimi veriyor (iyzico riski).

**Gradyan banner kalktı.** Hemen ardından form geliyor; "teklif alın" dili fiyatsız ürün riskini artırıyor.

## B) Hesap Takip fiyatı
| Rakip | Herkese açık fiyat (Ö) |
|---|---|
| Pratik Veresiye | 3.990 / 6.990 / 11.990 TL/yıl |
| caritakip.tr | 599 TL/ay veya 4.999 TL/yıl |
| AysimaPOS | 7.500 TL/yıl (KDV dahil) |
| BizimHesap | 8.352–10.560 TL + KDV/yıl |
| Bilsoft | 6.500 TL/yıl bulut; ömür boyu 11.000–53.750 TL |

**Karar:** İki seçenek de sunulur, öne çıkan **Yıllık Paket** olur.
- **Yıllık Paket:** 15.000 TL + KDV / yıl
- **Kurulum + 1 Yıl:** 25.000 TL + KDV, 2. yıldan itibaren 7.500 TL + KDV / yıl. 3 yılda toplam 40.000 TL; Yıllık Paket'te 45.000 TL.
- SMS paketi ayrıca satılır; taksit seçenekleri ödeme sayfasında gösterilir.
- **Yasal:** Paketler kendiliğinden yenilenmez. Süre bitmeden hatırlatılır; devam etmek isteyen yeniden öder (Abonelik Yön. md.13). Kart saklanmaz, otomatik çekim yapılmaz.
- Rakipler ücretsiz deneme sunuyor (Ö: "veresiye programı ücretsiz" önerisi baskın). Kartta "ücretsiz demo" görünür olmalı. Fiyat farkını açıklayan üç madde: yerinde kurulum, SMS ile otomatik hatırlatma, plakaya göre geçmiş.

## C) Yerel SEO sayfaları
| Sayfa | Slug | Ana anahtar kelimeler |
|---|---|---|
| Van | `/van-yazilim/` | van yazılım şirketleri / firmaları, van web tasarım, van e ticaret, van mobil uygulama |
| Doğu Anadolu | `/dogu-anadolu-yazilim/` | erzurum web tasarım, malatya web tasarım firmaları / yazılım firması, elazığ web sitesi |
| İç Anadolu | `/ic-anadolu-yazilim/` | konya / kayseri web sitesi yapan firmalar, sivas web tasarım, yozgat web sitesi, aksaray web tasarım |
| Konya | `/konya-web-yazilim/` | konya web tasarım, konya web sitesi yapan firmalar, konya e ticaret |
| Kayseri | `/kayseri-web-yazilim/` | kayseri web sitesi yaptırma, kayseri web tasarım, kayseri mobil yazılım |
| Erzurum | `/erzurum-web-yazilim/` | erzurum web tasarım, erzurum yazılım şirketleri |

- "[il] yazılım" önerileri öğrenci niyetli ("taban puanları"). Ticari niyet "[il] yazılım şirketleri / firmaları" ve "[il] web tasarım" sorgularında.
- **Ankara** ayrı sayfa olmaz, İç Anadolu sayfası içinde bir bölüm olur (rekabet yüksek, yerel kanıt yok).
- **Doorway kuralı:** Şehir sayfası ancak gerçek bir yerel müşteri, sektöre özel bir senaryo ya da yerinde görüşme bilgisi varsa yayımlanır. Yoksa içerik bölge sayfasında bir bölüm olarak kalır. `LocalBusiness` şeması yalnız Van adresiyle kullanılır; diğer sayfalar `Service` + `areaServed`.
- Ürün anahtar kelimeleri ("esnaf veresiye programı", "cari hesap takip programı", "oto yedek parça programı") yalnız `/urunler/hesap-takip/` sayfasına hedeflenir; il bazlı ürün sayfası açılmaz.

## Kaynaklar
Google otomatik tamamlama (hl=tr, gl=tr). Rakip siteler: pratikveresiye.com, caritakip.tr, aysimapos.com, bizimhesap.com/fiyatlar, bilsoft.com, kolayveresiye.com, parasut.com. Google spam politikaları: https://developers.google.com/search/docs/essentials/spam-policies
