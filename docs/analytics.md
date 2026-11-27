# Analytics (GA4)

- Ölçüm kimliği: `G-K7HYYT7SYM`, mülk `p252432555` ("Lanista yeni mülk").
- Panel: https://analytics.google.com/analytics/web/#/a182648914p252432555/reports/intelligenthome
- Yükleme: `src/components/CookieConsent.astro`, yalnızca çerez onayından sonra (KVKK). Reddeden ziyaretçi sayılmaz.

## Sitenin gönderdiği olaylar

| Olay | Ne zaman | Parametreler |
|------|----------|--------------|
| `generate_lead` | Form başarıyla gönderildi | `form_type` (contact / demo / quote / waitlist), `product` (e-Dönüşüm formu: `e-donusum`) |
| `plan_click` | Paket kartındaki "Satın al" / "Satın almak için yazın" | `product`, `plan_name`, `billing`, `destination` (checkout / contact) |
| `cta_click` | Ana butonlar | `cta_name`, ürün sayfasında `product` |
| `contact_click` | Telefon, e-posta, WhatsApp linki | `method` (phone / email / whatsapp) |
| `faq_toggled` | SSS sorusu açıldı/kapandı | `faq_title` |
| `language_changed` | Dil seçici | `language` |
| `section_viewed` | Ana sayfada bölüm göründü | `section_id` |

Ürün slug'ları 2026-11-25'te değişti: `hesap-takip` → `yedek-parca`, `nalbur-takip` → `nalbur` (raporlarda eski değerler eski tarihlerde kalır). Yeni `cta_name` değerleri: `menu_product`, `menu_featured` (header menüsü), `product_early_access` (erken erişim butonu).

`cta_name` değerleri: `hero_primary`, `hero_secondary`, `header_contact`, `header_login` (panel girişi), `header_signup` (panel kaydı, 14 gün deneme), `home_services`, `home_process`, `local_contact`, `cta_block`, `product_demo`, `product_waitlist`, `product_prices`, `see_live_project`, `solution_form` (e-Dönüşüm sayfasındaki "maliyet analizi" butonu, `product=e-donusum`), `guide_card` (rehber kartı, `product`=rehber slug'ı), `guide_cta` (rehber sonundaki maliyet analizi butonu).

Her sayfa görüntülemede ayrıca:
- `content_group`: home, product, service, works, process, contact, legal, local, solution (/e-donusum/), guide (/rehber/), company, not_found
- `site_language`: tr / en

GA'nın kendi ölçtükleri (geliştirilmiş ölçüm): sayfa görüntüleme, kaydırma, giden tıklama, site içi arama, dosya indirme.

## Panel ayarları

Durum (2026-11-21): 1–3 numaralı adımlar Admin API ile yapıldı (önemli etkinlikler, 11 özel boyut, 14 ay saklama). 4 ve 5 panelden elle yapılır.

API erişimi: `ga-admin@lanista-parca-katalog.iam.gserviceaccount.com` servis hesabı mülkte Düzenleyici; anahtar dosyası yok, kimliğe bürünme ile token alınır:

```
gcloud auth print-access-token --impersonate-service-account=ga-admin@lanista-parca-katalog.iam.gserviceaccount.com --scopes=https://www.googleapis.com/auth/analytics.edit
```

Aynı servis hesabı Search Console'da (`sc-domain:lanista.com.tr`) Kısıtlı kullanıcı: `--scopes=https://www.googleapis.com/auth/webmasters.readonly` ile site haritası, arama performansı ve URL denetimi okunur. GA verisi için `analytics.readonly` (Data API).

(gcloud'un varsayılan giriş uygulaması `analytics.edit` iznini artık vermiyor; bu yüzden servis hesabı.)

### Yapılacaklar listesi

1. **Önemli etkinlikler** (Yönetici → Veri görünümü → Etkinlikler): `generate_lead` ve `plan_click` önemli etkinlik olarak işaretlenir. `generate_lead` henüz listede yoksa ilk form gönderiminden sonra çıkar ya da Yönetici → Önemli etkinlikler → "Yeni önemli etkinlik" ile adı yazılarak eklenir.
2. **Özel boyutlar** (Yönetici → Veri görünümü → Özel tanımlar → Özel boyut oluştur). Kapsam: Etkinlik.

   | Boyut adı | Etkinlik parametresi |
   |-----------|----------------------|
   | Buton | `cta_name` |
   | Ürün | `product` |
   | Paket | `plan_name` |
   | Paket yönü | `destination` |
   | Form türü | `form_type` |
   | İletişim yolu | `method` |
   | SSS sorusu | `faq_title` |
   | Bölüm | `section_id` |
   | Site dili | `site_language` |
   | Ödeme tipi | `billing` |
   | Seçilen dil | `language` |

   Boyutlar oluşturulduktan sonraki verilere uygulanır; geriye dönük çalışmaz.
3. **Veri saklama** (Yönetici → Veri toplama ve değişiklik → Veri saklama): 14 ay.
4. **Search Console bağlantısı** (Yönetici → Ürün bağlantıları → Search Console): arama sorguları GA raporlarında görünür.
5. **Dahili trafik** (isteğe bağlı): ofis IP'si "internal" olarak tanımlanıp filtre etkinleştirilir.

## Okunacak raporlar

- **Kaç talep geldi, nereden:** Raporlar → Etkileşim → Önemli etkinlikler → `generate_lead`, ikincil boyut "Oturum kaynağı/aracı".
- **Hangi sayfa grubu ilgi görüyor:** Raporlar → Etkileşim → Sayfalar ve ekranlar, birincil boyut "İçerik grubu".
- **Hangi buton tıklanıyor:** Raporlar → Etkileşim → Etkinlikler → `cta_click`, "Buton" boyutu.
- **Paket ilgisi:** Etkinlikler → `plan_click`, "Ürün" ve "Paket" boyutları.
- **Huni:** Keşfet → Dönüşüm hunisi keşfi: `page_view` (content_group = product) → `cta_click` / `plan_click` → `generate_lead`.
