# lanista.com.tr — Yapılacaklar Listesi

_Sırayla ilerlenir. Her madde bittiğinde işaretlenir. Kullanıcı talepleri tarihleriyle "Talepler" bölümünde birebir kayıtlıdır._

## Talepler (kullanıcının söyledikleri, 2026-11-18)
- [x] Nuxt'tan tamamen Astro'ya geçiş
- [x] LUI kaldırılsın; Astro uyumlu headless kütüphane (→ Zag.js); W3C + erişilebilirlik eksiksiz; mevcut tasarım dili ve token'lara sadık
- [x] Site önceliği Türkçe (TR kökte, EN `/en/` altında kalabilir ama öncelik değil)
- [x] Telefon 0 506 215 07 00, e-posta info@lanista.com.tr, adres Teknokent İç Kapı 9 (aynı)
- [x] Formlar Contentrain Studio'ya bağlansın (Studio Pro plan)
- [x] Proje temizliği: eski/stale dosyalar, eski node_modules kalıntıları
- [x] Commit + yerelde ayağa kaldırma (dev: http://localhost:4322)
- [x] Tüm görseller Studio Medya CDN'e; bozuk/kötü görseller stok veya üretilmiş uygun görsellerle değiştirilsin
- [x] Collabers referanslara ve çalışmalara eklensin (uçtan uca Lanista geliştirdi)
- [x] Ana sayfa mesajı brief'teki yapıya göre yeniden konumlansın
- [x] Ana sayfa ve ürün sayfalarında parallax + ölçülü, etkileyici animasyonlar (stil rehberi korunarak zenginleştirilsin)
- [x] Ürünler (brief): katalog, Hesap Takip, Nalbur Takip, Kasa Takip (Tosthane)
- [x] Yasal metinler iyzico için uygun ve eksiksiz; iyzico logo bandı
- [x] Yerel SEO sayfaları: Van öne çıkacak; Doğu Anadolu ve İç Anadolu illeri için "özel yazılım geliştirme" sayfaları, Google anahtar kelime araştırmasına göre
- [x] Fiyatlar, taksit, teslim süresi → proje sonunda konuşulacak
- [x] Hesap Takip fiyatı: ikisi birden, öne çıkan Yıllık Paket 15.000 TL + KDV; Kurulum + 1 yıl 25.000 + 7.500/yıl; "kendiliğinden yenilenmez" notu (rakip fiyat tablosu `docs/kararlar-arama-verisi.md`)
- [x] Ana sayfa sadeleştirme uygulandı (Fable kararı)
- [x] KEP şimdilik boş (kullanıcı onayı; iyzico başvurusu öncesi tekrar bakılacak)
- [x] Yanyana: müşteriye özel ayağa kalkıyor → "Canlı site" bağlantısı kaldırıldı
- [x] Murat'ın referans fotoğrafı kalıyor
- [ ] Sırayla ilerle, bu listeyi eksiksiz bitir
- [x] Yazılım şirketine yakışır arayüz kalitesi; ikon rozetli kartlar "sığ ve basit" → tek bir SVG illüstrasyon stili belirlenip sitenin her yerinde aynı tarzda görseller
- [x] Stil, "Lanista" anlamından (Latince: gladyatör okulu/akademisi) beslenecek
- [x] Başka oturumda hazırlanan ürün ekran görüntüleri ve videoları (`feat/urun-gorselleri`, `0c49346`) → Studio CDN'e yüklenecek, ürün sayfalarında kullanılacak (numaralar sahte — kullanıcı teyidi)
- [x] Arka plandaki SVG çizgi grafikleri tüm sitede standart hale gelecek: eski Yunan / Latin / Roma uyumlu, içeriği engellemeyen, ciddiyeti koruyan
- [x] Ana sayfa hero'su ve ilk önceliği: satılacak ürünler (Hesap Takip ve diğer uygulamalar)
- [x] Kararlar ve adımlar için Fable alt ajanlarıyla analiz ve fikir alınabilir (kullanıcı izni)
- [x] Studio formu public; uç nokta, CORS ve test gönderimi doğrulandı (test kaydı Studio'dan silinebilir: "TEST Claude form kontrolü")
- [x] Sitemap doğrulandı: 64 URL, hepsi 200, canonical = loc, noindex yok, hreflang karşılıklı → indexlemeye hazır
- [x] Contentrain temizliği: SEO/sosyal medya araç kayıtları (6) + 2 kategori, kullanılmayan 3 bölüm kaydı, 15 sözlük anahtarı (kullanılmayan + tekrarlı) silindi; kullanılmayan Banner/Arcade bileşenleri kaldırıldı
- [x] **SEO-GEO**: `/llms.txt` + `/llms-full.txt` (Contentrain'den, TR+EN özet), robots'ta AI tarayıcılarına açık izin (`/odeme/` kapalı), Organization + WebSite her sayfada (knowsAbout, areaServed), og:locale:alternate, 64 sayfada JSON-LD doğrulandı
- [x] SEO-GEO devam: Van sayfasında LocalBusiness, `llms.txt` İngilizce sayfalar bölümü (2026-11-19)
- [x] **İngilizce eksiksiz**: `products`, `plans`, `legal-pages` iki dilli (Fable çevirisi); `/en/products/` (+3 ürün), `/en/legal/` (7 metin, "Türkçe metin geçerlidir" notu), `/en/about/`; dil değiştirici her sayfada karşılığa gidiyor; sitemap 76 URL, tüm çiftler karşılıklı; EN sayfalarda Türkçe alt metin yok
- [x] Contentrain'e geri bildirim notu: `docs/contentrain-geri-bildirim.md` (6 madde; ekibe iletilmesi kullanıcıda)
- [x] ~~Ödeme onay sayfası yalnız Türkçe (`/odeme/`)~~ — sayfa kaldırıldı, onaylar ürün backend'inde
- [x] **Projede sabit (hard-coded) metin olmayacak**: arayüz metinleri dahil her içerik eksiksiz Contentrain'de (2026-11-18) — tarama temiz
- [x] Formlar ve iletişim ayrı sayfada: `/iletisim/`, `/en/contact/` (şirket bilgileri + talep türü seçmeli form); ana sayfada SSS + iletişim kartı
- [ ] Stil kararlarına (Ludus, token'lar, erişilebilirlik) sadık kalınacak; kontrol listesi her adımda güncel tutulacak
- [x] Hizmetler ve Süreç ayrı sayfalarda (`/hizmetler/` + teknoloji sekmeleri, `/surec/` + HowTo şeması; EN `/en/services/`, `/en/process/`); ana sayfada 3 hizmet + 6 adımlık şerit; bölüm boşlukları daraltıldı
- [x] Ödeme altyapısı devir dokümanı: `docs/odeme-altyapisi.md` (durum, modeller, Aşama A akışı, ödeme sonrası adımlar, Aşama B tasarımı, dosya haritası); CLAUDE.md'den bağlantılı

## 1. Astro'ya geçiş ✅ (`0d50ee0`)
- [x] Nuxt → Astro 6 (statik), LUI kaldırıldı, Zag.js (sekmeler, akordeon, mobil menü)
- [x] Türkçe kökte, İngilizce `/en/`, `/tr/*` → 301 (netlify.toml)
- [x] Canonical, hreflang, sitemap, JSON-LD, build-time OG görselleri
- [x] Erişilebilirlik: kontrast düzeltmeleri, skip link, form doğrulama, odak yönetimi
- [x] Formlar → Contentrain Studio (`leads` modeli), Firebase kaldırıldı
- [x] Temizlik: eski dosyalar, kullanılmayan görseller, temiz `node_modules`

## 2. Görseller → Studio Medya CDN
- [x] Studio anahtarı `media:write` ✔, CDN açık ve anahtarsız teslim ✔
- [x] 52 görsel yüklendi (alt metin + etiket); büyük SVG kapaklar 2x raster → WebP (ör. Wordify 1,8 MB → 173 KB)
- [x] Yeni görseller: 4 hizmet illüstrasyonu (ödeme, mikroservis, POS, yapay zekâ); 4 proje illüstrasyonu (Yanyana, FoodButik POS, RezMe, LUI Vue); 3 canlı site kapağı (LineDiff, FoodButik, Collabers)
- [x] İçerikteki görsel alanları CDN adresleriyle güncellendi (MCP, 5 model)
- [x] Collabers: referans logosu + çalışma kaydı (TR/EN, sıra 2), yayında
- [x] Kod: build sırasında Studio medya kütüphanesinden alt metin, boyut ve blurhash okunuyor (`src/lib/media.ts`, `<Img>`)
- [x] Koddaki görseller (hero arka planı, banner) CDN'de; bayraklar satır içi SVG
- [x] `public/` içinde yalnız favicon, logo ve robots.txt kaldı
- [x] Logo alt metinleri dilden bağımsız; EN sayfalarda kapak alt metni İngilizce başlık
- [x] Kullanılmayan meta-tags anahtarları ve Cloudinary OG kaldırıldı
- [x] Netlify: `STUDIO_CDN_KEY` build ortam değişkeni (yalnız build, tarayıcıya gitmez)

## 2a. İçerik bütünlüğü (sabit metin yok)
- [x] `ui` sözlüğü (i18n, TR/EN, 159 anahtar): menü, butonlar, landmark etiketleri, form etiketleri/hata mesajları, ürün sayfası başlıkları, 404, OG etiketleri; eksik anahtar build'i durdurur
- [x] `src/lib/i18n.ts` ve `src/lib/forms.ts` metinleri sözlükte; kod yalnız anahtar kullanıyor
- [x] Sayfalardaki `en ? '…' : '…'` kalıpları sözlüğe taşındı
- [x] "Nasıl başlarsınız" adımları → `onboarding-steps`; kurucular → `team`; şirket bilgileri → `company` singleton
- [x] Şema/OG sabit metinleri içerikte; kodda duran "kendi ürünlerimiz" şeması kaldırıldı (bilgiler zaten çalışma kayıtlarında); hero'daki sahte vade satırları yerine gerçek ekran görüntüsü
- [x] Doğrulama: `src/` taraması temiz (yalnız geliştirici log mesajları ve font adları kaldı)

## 2b. İllüstrasyon sistemi ("Ludus" stili)
- [x] Stil rehberi: `docs/illustration-style.md` (motifler, çizgi, renk, kompozisyon, yapılmayacaklar); üretici `design/ludus/generate.py`
- [x] Süreç kartları (6) — ikon rozetleri yerine illüstrasyon (`processes.illustration`, Studio CDN, `ProcessCard`)
- [x] Hizmet görselleri bu stile uyumlu hale getirildi (11 adet, 2:1)
- [x] Hero / banner / bölüm görselleri
- [x] Site geneli arka plan deseni: `decor/Amphitheatre` (hero + sayfa başlıkları), `decor/Arcade` (koyu banner), `decor/Meander` (ayırıcı) — satır içi SVG, `aria-hidden`, `pointer-events:none`, parallax katmanları hazır
- [x] 404 illüstrasyonu: kilit taşı düşmüş kemer (`decor/FallenKeystone.astro`, tek seferlik düşme animasyonu, reduced-motion'da sabit)
- [x] Hizmet kartı görselleri: 11 hizmet Ludus stilinde 2:1 illüstrasyonla yeniden çizildi (`design/ludus/services.py`), Studio CDN'e yüklendi; proje ekran görüntüleri, müşteri portreleri ve ürün ekranları gerçek kaldı (kullanıcı kararı bana bıraktı)
- [x] SVG'ler Studio CDN'de; animasyonlu olanlar satır içi bileşen

## 3. Ana sayfa yeniden konumlandırma (brief §1, §2, §8)
- [x] Hero: ilk öncelik ürünler — "Defteri bırakın…" + Hesap Takip/Demo CTA + Ludus kemerinde vade takibi ekranı
- [x] Ürünler bloğu (3 kart, Ludus ürün illüstrasyonları) + "Nasıl başlarsınız" (3 adım + 4 güven maddesi) + köprü bloğu
- [x] Hizmetler bloğu korundu; "rehberlik/dış kaynak" ifadeleri çıkarıldı; banner metni "Yazılımınızı birlikte yapalım"
- [x] Ana sayfa sadeleştirildi (Fable + Google öneri verisi, `docs/kararlar-arama-verisi.md`): 6 hizmet (`services.on_home`), teknoloji sekmeleri ve banner kaldırıldı
- [x] Teknoloji logoları `/hizmetler/` sayfasında (SEO/sosyal medya kategorileri hariç)
- [x] TR meta başlık/açıklama güncellendi (Fable önerisi uyarlandı)
- [x] Ses ve dil kuralları (sade dil, yasaklı kelimeler yok)
- [x] EN ana sayfa (hero, bölümler, meta) TR konumlandırmasıyla eşitlendi — önceden eski ajans metni kalmıştı (2026-11-19)
- [x] Tüm buton/CTA ve bağlantı denetimi (2026-11-19): `contentLink` TR yollarını dile göre çevirir, `#contact` → iletişim sayfası; hizmet kırıntısı `/hizmetler/`; Headless CMS → Contentrain vaka çalışması, Ürün Tasarımı → Süreç; ölü proje siteleri kaldırıldı (Popile, Visivi, DXP 360); React/Nuxt/Adobe adresleri düzeltildi; teknoloji logolarına ad alanı; iç bağlantı ve çapa taraması temiz

## 4. Animasyon ve parallax
- [x] Hero parallax: `data-parallax` katmanları (kemer, telefon, bildirim, amfitiyatro halkaları, banner arkadı) — `src/scripts/parallax.ts`, CSS `translate` ile
- [x] Kademeli görünme (`--reveal-delay`) ve kart hover (illüstrasyon kalkışı, ok kayması)
- [x] Tek orkestra anı: hero girişinde kemer çizilir → kilit taşı düşer → telefon yükselir → satırlar → bildirim
- [x] Ürün sayfalarında video/ekran animasyonları (ürün aşamasında)
- [x] `prefers-reduced-motion` ile tamamen kapalı; transform/opacity dışında animasyon yok (CLS yok)

## 5. Ürünler
- [x] Ürün ekran görüntüleri ve videoları Studio CDN'de (33 dosya, alt metinli); `products.hero_screenshot`, `screenshots`, `desktop_screenshots`, `videos`
- [x] Fiyatlar `plans`'ta (15.000 öne çıkan, 25.000 + 7.500)
- [x] Ürün sayfası şablonu (hero, dert→çözüm, ekranlar/video, özellikler, paketler, güven, SSS, demo/bekleme formu)
- [x] Contentrain modelleri: `products` (3 ürün, yayında), `plans` (Hesap Takip: 3 paket, fiyatsız)
- [x] `legal-pages` doküman modeli (token'lar: {{kep}}, {{kurulum_suresi}}, {{urun}}, {{paket}}, {{tutar}}), `/yasal/{slug}/` + `/{slug}/` (kurumsal) şablonu, içindekiler, taslak uyarısı
- [x] Yasal metin taslakları (Fable) gözden geçirildi ve Contentrain'e kaydedildi: mesafeli satış, ön bilgilendirme, teslimat-iade, KVKK, gizlilik, çerez, işlem rehberi, hakkımızda (`reviewed: false` → sayfada taslak uyarısı)
- [x] Hukuki kontrol tamamlandı (kullanıcı, 2026-11-18) → tüm yasal dokümanlar `reviewed: true`, taslak uyarısı kalktı
- [ ] KVKK yurt dışı aktarım standart sözleşmeleri (Google, Studio) imzalanıp Kurul'a bildirilecek (kullanıcı)
- [x] Doküman modellerinde toplu durum (published) MCP'de desteklenmiyor — Studio'dan yayınlanacak
- [x] Kurulum süresi: en geç 3 iş günü (`company.setup_days`; çoğunlukla kurulum ödemeden önce yapılıyor)
- [x] Meslek kuralları bağlantısı: Van TSO (kullanıcı onayı)
- [x] `feat/urun-gorselleri` dalı silindi (yerel + remote)
- [x] `/urunler/` katalog
- [x] `/urunler/hesap-takip/` (yayında; 2 video, 6 mobil ekran)
- [x] `/urunler/nalbur-takip/` (yakında), `/urunler/kasa-takip/` (pilotta; 1 video, 6 ekran) + bekleme listesi
- [x] Demo / satın alma / bekleme listesi formları (`leads`, type + product)
- [x] Ekran görüntüleri (demo ortamı, telefon çerçevesi) + stok fotoğraflar (sanayi dükkânı, nalbur, büfe)
- [x] Header'a "Ürünler" → `/urunler/`
- [x] Footer yeniden: marka cümlesi, Ürünlerimiz (durum etiketli), Hizmetlerimiz, Kurumsal, Yasal (Contentrain'den), çerez tercihleri, şirket kimliği satırı, iyzico logo bandı
- [x] JSON-LD: SoftwareApplication + Offer (KDV hariç, UnitPriceSpecification), FAQPage, BreadcrumbList

## 6. Yerel SEO sayfaları (Van öncelikli)
- [x] Anahtar kelime araştırması (Fable, Google önerileri): `docs/kararlar-arama-verisi.md` §C — slug'lar, title/meta, doorway kuralları
- [x] Van sayfası `/van-yazilim/` (EN `/en/software-company-van/`): Teknokent ofisi, sahadaki Hesap Takip kurulumu (anonim), Van TSO, SSS, LocalBusiness (ProfessionalService) JSON-LD
- [x] Doğu Anadolu `/dogu-anadolu-yazilim/` ve İç Anadolu `/ic-anadolu-yazilim/` (Ankara bölüm olarak), Service + areaServed; içerik `local-pages` modelinde, TR + EN
- [ ] İl sayfaları (Konya, Kayseri, Erzurum): yalnız gerçek yerel müşteri/senaryo olunca açılacak (doorway kuralı) — şu an bölge sayfasında bölüm
- [x] İç bağlantılar (footer Kurumsal, sayfalar arası "Diğer bölgeler"), sitemap + hreflang (TR↔EN), OG kartları, llms.txt

### 6b. e-Dönüşüm ve yerel SEO genişletme (2026-11-23, brief: e-dönüşüm ana büyüme alanı)
- [x] Arama verisi: il/ilçe + e-fatura aranmıyor → ilçe sayfası yok, tek hub (`docs/kararlar-arama-verisi.md` §E)
- [x] `/e-donusum/` sayfası: `solution-pages` modeli (TR), hizmetler, geçiş adımları, programınızı değiştirmeden, Van'da yerinde kurulum, mali müşavir iş ortaklığı, hizmet bölgeleri (13 ilçe + komşu iller), SSS, "maliyet analizi" formu (`quote`, `product=e-donusum`); Service + FAQPage JSON-LD, OG kartı, llms.txt, menü + footer
- [x] Van sayfası: e-fatura bölümü, ilçelerde yerinde kurulum, 13 ilçe `areaServed`, 2 yeni SSS, e-Dönüşüm kartı
- [x] Doğu Anadolu sayfası: Muş/Bitlis/Hakkari/Ağrı e-fatura bölümü + SSS, Siirt ve Batman
- [x] Görseller (2026-11-23): Ludus çizimleri `design/ludus/pages.py` — 4 sayfa kapağı (e-Dönüşüm, Van, Doğu/İç Anadolu), 3 e-Dönüşüm bölüm görseli, 4 rehber kapağı; SVG içi animasyon (reduced-motion güvenli); Studio media
- [x] Rehber: `guides` modeli, `/rehber/` + `/rehber/{slug}/` (Article + FAQPage JSON-LD, içindekiler, kısa cevap, kaynaklar, okuma ilerleme çubuğu, CTA), footer + e-Dönüşüm sayfasında liste, OG, llms.txt
- [x] İlk 4 rehber: e-fatura geçiş sınırı 2026, kontör nedir, entegratör değişikliği, e-arşiv mi e-fatura mı — tutarlar 509 güncel hâli + 589 (RG 31.12.2025) ile kontrol edildi (2026-11-23)
- [ ] Rehberlerin yıllık kontrolü: her ocakta GİB'deki 509 güncel hâli; değişirse `checked_at` ve metin
- [ ] Kontör paketleri sayfası + kontör hesaplayıcı: fiyatlar kesinleşince
- [ ] Mali müşavir iş ortaklığı sayfası: program koşulları kesinleşince
- [ ] Turkcell / sağlayıcı adı: sözleşme imzalanınca
- [x] Search Console dizine ekleme isteği (2026-11-23, Claude/Chrome): /e-donusum/, /rehber/ + 4 rehber, /van-yazilim/, /dogu-anadolu-yazilim/, /ic-anadolu-yazilim/
- [ ] 2–3 hafta sonra (≈2026-12-10) dizin durumu ve sorgu kontrolü

## 7. iyzico ve yasal (bkz. `docs/iyzico-gereksinimleri.md`)
- [ ] KEP adresi (iyzico şartı, (b) maddesi) → şu an yok, boş kalacak; başvuru öncesi tekrar
- [x] Meslek odası: Van Ticaret ve Sanayi Odası (kullanıcı teyit etti)
- [x] Van TSO sitesi doğrulandı (vantso.org.tr)
- [x] İletişim sayfası (`/iletisim/`, header + footer'dan erişim): unvan, adres, telefon, e-posta, MERSİS, VKN, ticaret sicil, meslek odası (KEP gelince otomatik görünür)
- [x] Hakkımızda (`/hakkimizda/`)
- [x] İşlem rehberi (`/yasal/islem-rehberi/`)
- [x] Mesafeli satış sözleşmesi, Ön bilgilendirme formu (taslak)
- [x] Teslimat, iade ve cayma (taslak)
- [x] KVKK aydınlatma metni, Gizlilik politikası, Çerez politikası (taslak)
- [x] Çerez onay bandı: GA yalnız "Kabul et" sonrası yükleniyor (test edildi); Reddet eşit ağırlıkta; footer'dan tercih değişikliği
- [x] ~~Ön onay adımı: `/odeme/{plan}/`~~ (2026-11-19 kaldırıldı) (sipariş özeti, siparişe göre doldurulmuş ÖBF + MSS, 3 işaretsiz onay, `leads` type=order kaydı, iyzico linkine yönlendirme); `CHECKOUT_PREVIEW=1` ile test edildi
- [x] Karar (2026-11-19): landing'de ödeme kodu yok; `/odeme/` akışı kaldırıldı, "Satın al" → `plans.checkout_url` (ürünün kendi backend'i). Ödeme/abonelik ürün backend'lerinde
- [ ] `plans.checkout_url`: ürün backend'indeki satın alma sayfası hazır olunca girilecek
- [ ] Yasal metinler yeni akışa göre güncellenecek (sitedeki onay sayfası / ödeme linki / "kendiliğinden yenilenmez" ifadeleri) — abonelik koşulları netleşince, hukukçu onayıyla
- [x] iyzico logo bandı (footer, resmi paket; `company.payment_logo_band`, Studio CDN)
- [x] Fiyatlar, taksit, teslim süresi (kullanıcıdan — proje sonunda)

## 8. Yayın
- [x] Sitemap: yerelleştirilmiş slug çiftleri için hreflang (`astro.config.mjs` LOCALIZED_PAIRS); `/odeme/` sitemap dışı
- [x] Studio: `leads` formu açık + public + alanlar exposed; Netlify env: `PUBLIC_CONTENTRAIN_PROJECT_ID`, `PUBLIC_CONTENTRAIN_STUDIO_URL`, `STUDIO_CDN_KEY`
- [x] `.contentrain/config.json`: stack `astro`, varsayılan dil `tr` (kullanıcı onayıyla elle, 2026-11-18)
- [x] Lighthouse (canlı, mobil): Erişilebilirlik 100, En iyi uygulamalar 100, SEO 100 (ana sayfa, ürün, iletişim)
- [x] Performans iyileştirmesi: ikon fontu (165 KB) + 23 KB kullanılmayan CSS kaldırıldı (satır içi SVG `Icon`), CSS HTML'e gömüldü, Studio CDN preconnect
- [x] Performans yeniden ölçüm: ana sayfa 78→82, ürün 69→87 (FCP 3,3→1,1 sn); A11y/BP/SEO 100
- [x] Yayın `main` dalından (Netlify); PR akışı gerekmedi
- [~] Search Console: sitemap gönderildi, durum "Başarılı" (2026-11-18); `https://lanista.com.tr/sitemap-index.xml` gönder, eski sitemap'leri kaldır, birkaç hafta izle (İngilizce sıralamalar 301 ile taşınamıyor) — kullanıcı
- [ ] ETBİS kaydı (kullanıcı, e-Devlet)
