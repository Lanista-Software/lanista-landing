# iyzico ve mevzuat gereksinimleri — site kontrol listesi

_Kaynak taraması: 2026-11-18. Hukuki yorum gerektiren maddeler (B2B şartları, yenileme kurgusu) yayından önce hukukçu/mali müşavir onayından geçmelidir._

## Kaynaklar
- iyzico başvuru koşulları: https://www.iyzico.com/destek/yardim-merkezi/basvuru/basvuru-olusturma
- iyzico logo paketi: https://docs.iyzico.com/ek-bilgiler/iyzico-logo-paketi
- Mesafeli Sözleşmeler Yönetmeliği (2014): https://www.resmigazete.gov.tr/eskiler/2014/11/20141127-6.htm — 2022 değişikliği: https://www.resmigazete.gov.tr/eskiler/2022/08/20220823-2.htm
- Elektronik Ticaret Hizmet Sağlayıcılar Yönetmeliği (2022): https://www.resmigazete.gov.tr/eskiler/2022/12/20221229-5.htm
- Abonelik Sözleşmeleri Yönetmeliği: https://www.resmigazete.gov.tr/eskiler/2015/01/20150124-2.htm
- ETBİS: https://ticaret.gov.tr/ic-ticaret/elektronik-ticaret/elektronik-ticaret-bilgi-sistemi-etbis — karekod uygulaması 02.09.2025'te sonlandı.
- KVKK Çerez Rehberi: https://www.kvkk.gov.tr/SharedFolderServer/CMSFiles/fb193dbb-b159-4221-8a7b-3addc083d33f.pdf

## Sitede bulunması gerekenler (Z = zorunlu, Ö = önerilen)
| Madde | Durum | Not |
|---|---|---|
| Ürünler **ve TL fiyatları** yayında | Z (iyzico) | En az link ile satılan paketler sabit fiyatlı olmalı. |
| Gizlilik politikası | Z (iyzico) | `/yasal/gizlilik/` |
| Mesafeli satış sözleşmesi | Z (iyzico + MSY) | `/yasal/mesafeli-satis/` |
| Teslimat ve iade şartları | Z (iyzico) | Dijital teslim: hesap aktivasyonu/kurulum süresi + cayma/iade. `/yasal/iade-iptal/` |
| Hakkımızda | Z (iyzico) | `/hakkimizda/` |
| İletişim (ana sayfadan doğrudan erişilebilir) | Z (iyzico + ETHS Yön. md.5) | Unvan, MERSİS, merkez adresi, **KEP**, e-posta, telefon, **meslek odası** ve meslek kuralları. |
| "iyzico ile Öde" + Visa + Mastercard logoları | Z (iyzico) | Logo paketindeki `footer_iyzico_ile_ode` bandı; değiştirmeden, açık zeminde Colored, koyu zeminde White. |
| İşlem rehberi | Z (ETHS Yön. md.7) | Sipariş adımları, sözleşmenin saklanması/erişimi, giriş hatalarının düzeltilmesi, alternatif uyuşmazlık çözümü. |
| Ön bilgilendirme formu, ödeme **öncesinde** ve onaylı | Z (MSY md.5–8) | Ödeme linkine gitmeden önce sitede ön onay adımı. |
| Ödeme öncesi sipariş özeti, KDV dahil toplam | Z (ETHS md.8, MSY md.5) | Fiyat "+ KDV" ile birlikte KDV dahil tutar da gösterilir. |
| Sipariş teyidi (site + e-posta) | Z (ETHS md.9) | iyzico link sonrası e-posta ile teyit + sözleşme PDF. |
| ETBİS kaydı | Z (kanun) | e-Devlet üzerinden, satışa başlamadan. Sitede rozet artık yok. |
| KVKK aydınlatma metni (her veri toplama noktasında) | Z (6698 md.10) | Formlarda bağlantı + onay kutusu. |
| Çerez politikası + onay bandı (GA onaydan önce yüklenmez) | Z (KVKK kurul kararları) | "Reddet" en az "Kabul et" kadar kolay. |
| SSL | Z | Netlify HTTPS. |
| Kullanım koşulları / lisans | Ö | |

## Ödeme akışı (Aşama A — iyzico ödeme linki)
iyzico link sayfasına özel onay kutusu eklenemediği için sitede bir **ön onay sayfası** gerekir:
1. Paket özeti (ürün, süre, KDV hariç + KDV dahil tutar, ödeme yöntemleri).
2. Ön Bilgilendirme Formu ve Mesafeli Satış Sözleşmesi metinleri (ürün/paket adı değişken).
3. Onay kutuları (işaretsiz gelir): ÖBF okudum-onaylıyorum · MSS kabul · "Hizmetin cayma süresi dolmadan derhal başlatılmasını talep ediyorum; cayma hakkımı kaybedeceğimi kabul ediyorum" (MSY md.15/1-h).
4. Düğme metni ödeme yükümlülüğünü açıkça söyler: **"Onayla ve ödemeye geç"** (MSY md.8).
5. Onay kaydı (zaman, sözleşme sürümü) → iyzico linkine yönlendirme.
6. Pazarlama izni (İYS) ayrı, isteğe bağlı, satın almanın şartı değil.

## Cayma ve yenileme
- Anında teslim edilen yazılım/SMS kredisi: MSY md.15/1-ğ istisnası. Kurulum ve barındırılan hizmet: md.15/1-h (tüketicinin açık onayıyla başlatılırsa).
- **Belirli süreli tüketici sözleşmesi kendiliğinden uzatılamaz** (Abonelik Yön. md.13). "Kurulum + 1 yıl" paketinin yenilemesi hatırlatma + yeni ödeme ile alınmalı; otomatik çekim (Aşama B) için belirsiz süreli, her an iptal edilebilir abonelik kurgusu hukukçuyla netleştirilmeli.
- İade: 14 gün içinde, aynı ödeme aracına.
- Alıcı tacir/esnaf ise TKHK uygulanmaz; yine de site B2C seviyesinde uyumlu kurulur.

## iyzico reddetme riskleri
1. **Danışmanlık iş modeli iyzico'nun değerlendirme dışı listesinde.** Site satışta "ajans/danışmanlık" değil, sabit fiyatlı yazılım lisansı satan bir yer gibi görünmeli; ürünler ve fiyatlar öne çıkmalı.
2. Eksik iletişim bloğu (KEP, MERSİS, meslek odası).
3. Eksik yasal sayfa, şablon metin (başka şirket adı, "kargo" ifadeleri).
4. Fiyatsız ürünler ("teklif alın"), yapım aşamasındaki sayfalar.
5. Unvan / vergi levhası / IBAN sahibi uyuşmazlığı.

## KVKK notları
- Aydınlatma metni: veri sorumlusu, amaçlar, aktarılan taraflar (iyzico, Contentrain Studio, Google Analytics, SMS sağlayıcı, mali müşavir), toplama yöntemi ve hukuki sebep, md.11 hakları. Açık rıza metninden ayrı.
- Yurt dışı aktarım (md.9, 2024): yeterlilik kararı yoksa Kurul'un standart sözleşmesi + 5 iş günü içinde bildirim. Açık rıza yalnız arızi aktarımlar için.
