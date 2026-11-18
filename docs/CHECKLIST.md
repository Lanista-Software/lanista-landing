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
- [ ] Ana sayfa mesajı brief'teki yapıya göre yeniden konumlansın
- [ ] Ana sayfa ve ürün sayfalarında parallax + ölçülü, etkileyici animasyonlar (stil rehberi korunarak zenginleştirilsin)
- [ ] Ürünler (brief): katalog, Hesap Takip, Nalbur Takip, Kasa Takip (Tosthane)
- [ ] Yasal metinler iyzico için uygun ve eksiksiz; iyzico logo bandı
- [ ] Yerel SEO sayfaları: Van öne çıkacak; Doğu Anadolu ve İç Anadolu illeri için "özel yazılım geliştirme" sayfaları, Google anahtar kelime araştırmasına göre
- [ ] Fiyatlar, taksit, teslim süresi → proje sonunda konuşulacak
- [ ] Hesap Takip fiyatı (2026-11-18): yıllık 15.000 TL + KDV ve/veya 25.000 TL + KDV kurulum+1 yıl, ardından 7.500 TL + KDV/yıl — Fable rakip verisiyle önerecek
- [ ] Ana sayfa sadeleştirme onaylandı; karar Fable'ın Google arama verisine dayalı analiziyle uygulanacak
- [x] KEP şimdilik boş (kullanıcı onayı; iyzico başvurusu öncesi tekrar bakılacak)
- [x] Yanyana: müşteriye özel ayağa kalkıyor → "Canlı site" bağlantısı kaldırıldı
- [x] Murat'ın referans fotoğrafı kalıyor
- [ ] Sırayla ilerle, bu listeyi eksiksiz bitir
- [ ] Yazılım şirketine yakışır arayüz kalitesi; ikon rozetli kartlar "sığ ve basit" → tek bir SVG illüstrasyon stili belirlenip sitenin her yerinde aynı tarzda görseller
- [ ] Stil, "Lanista" anlamından (Latince: gladyatör okulu/akademisi) beslenecek
- [ ] Başka oturumda hazırlanan ürün ekran görüntüleri ve videoları (`feat/urun-gorselleri`, `0c49346`) → telefon numaraları gizlenip Studio CDN'e yüklenecek, ürün sayfalarında kullanılacak
- [ ] Arka plandaki SVG çizgi grafikleri tüm sitede standart hale gelecek: eski Yunan / Latin / Roma uyumlu, içeriği engellemeyen, ciddiyeti koruyan
- [ ] Ana sayfa hero'su ve ilk önceliği: satılacak ürünler (Hesap Takip ve diğer uygulamalar)
- [x] Kararlar ve adımlar için Fable alt ajanlarıyla analiz ve fikir alınabilir (kullanıcı izni)

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
- [ ] Netlify: `STUDIO_CDN_KEY` build ortam değişkeni (yalnız build, tarayıcıya gitmez)

## 2b. İllüstrasyon sistemi ("Ludus" stili)
- [x] Stil rehberi: `docs/illustration-style.md` (motifler, çizgi, renk, kompozisyon, yapılmayacaklar); üretici `design/ludus/generate.py`
- [x] Süreç kartları (6) — ikon rozetleri yerine illüstrasyon (`processes.illustration`, Studio CDN, `ProcessCard`)
- [ ] Hizmet görselleri bu stile uyumlu hale getirilecek
- [ ] Hero / banner / bölüm görselleri
- [x] Site geneli arka plan deseni: `decor/Amphitheatre` (hero + sayfa başlıkları), `decor/Arcade` (koyu banner), `decor/Meander` (ayırıcı) — satır içi SVG, `aria-hidden`, `pointer-events:none`, parallax katmanları hazır
- [ ] Ürün, yerel SEO, yasal ve 404 sayfaları için aynı stilde görseller
- [ ] SVG'ler Studio CDN'de; animasyonlu olanlar satır içi bileşen

## 3. Ana sayfa yeniden konumlandırma (brief §1, §2, §8)
- [x] Hero: ilk öncelik ürünler — "Defteri bırakın…" + Hesap Takip/Demo CTA + Ludus kemerinde vade takibi ekranı
- [x] Ürünler bloğu (3 kart, Ludus ürün illüstrasyonları) + "Nasıl başlarsınız" (3 adım + 4 güven maddesi) + köprü bloğu
- [x] Hizmetler bloğu korundu; "rehberlik/dış kaynak" ifadeleri çıkarıldı; banner metni "Yazılımınızı birlikte yapalım"
- [ ] Karar bekliyor: ana sayfada hizmetler 11→6, teknolojiler sekmesi taşınsın mı, banner kalksın mı (Fable önerisi)
- [x] TR meta başlık/açıklama güncellendi (Fable önerisi uyarlandı)
- [ ] Ses ve dil kuralları (sade dil, yasaklı kelimeler yok)

## 4. Animasyon ve parallax
- [x] Hero parallax: `data-parallax` katmanları (kemer, telefon, bildirim, amfitiyatro halkaları, banner arkadı) — `src/scripts/parallax.ts`, CSS `translate` ile
- [x] Kademeli görünme (`--reveal-delay`) ve kart hover (illüstrasyon kalkışı, ok kayması)
- [x] Tek orkestra anı: hero girişinde kemer çizilir → kilit taşı düşer → telefon yükselir → satırlar → bildirim
- [ ] Ürün sayfalarında video/ekran animasyonları (ürün aşamasında)
- [x] `prefers-reduced-motion` ile tamamen kapalı; transform/opacity dışında animasyon yok (CLS yok)

## 5. Ürünler
- [x] Contentrain modelleri: `products` (3 ürün, yayında), `plans` (Hesap Takip: 3 paket, fiyatsız)
- [ ] `legal-pages` modeli (+ şirket bilgisi)
- [ ] `/urunler/` katalog
- [ ] `/urunler/hesap-takip/` (yayında)
- [ ] `/urunler/nalbur-takip/`, `/urunler/kasa-takip/` (yakında + bekleme listesi)
- [ ] Demo / teklif / bekleme listesi formları (`leads`, type + product)
- [ ] Ekran görüntüleri (demo ortamı, telefon çerçevesi) + stok fotoğraflar (sanayi dükkânı, nalbur, büfe)
- [x] Header'a "Ürünler" (şimdilik /#urunler; ürün sayfaları gelince /urunler/)
- [ ] Footer'a "Ürünler"
- [ ] JSON-LD: SoftwareApplication + Offer, FAQPage, BreadcrumbList

## 6. Yerel SEO sayfaları (Van öncelikli)
- [ ] Anahtar kelime araştırması (Google: "van yazılım şirketi", "özel yazılım van", bölge/il varyantları, hacim ve rekabet)
- [ ] Van sayfası: Teknokent ofisi, yerel bağlam, referanslar, LocalBusiness JSON-LD
- [ ] Doğu Anadolu ve İç Anadolu bölge sayfaları
- [ ] Yalnız talebi olan birkaç il için özgün içerikli sayfalar (doorway/kopya sayfa riskinden kaçınılacak)
- [ ] İç bağlantılar, sitemap, hreflang yok (yalnız TR)

## 7. iyzico ve yasal (bkz. `docs/iyzico-gereksinimleri.md`)
- [ ] KEP adresi (iyzico şartı, (b) maddesi) → şu an yok, boş kalacak; başvuru öncesi tekrar
- [x] Meslek odası: Van Ticaret ve Sanayi Odası (kullanıcı teyit etti)
- [ ] Van TSO adresi ve meslek kuralları bağlantısı doğrulanacak
- [ ] İletişim sayfası (ana sayfadan doğrudan erişim)
- [ ] Hakkımızda
- [ ] İşlem rehberi
- [ ] Mesafeli satış sözleşmesi, Ön bilgilendirme formu
- [ ] Teslimat, iade ve cayma
- [ ] KVKK aydınlatma metni, Gizlilik politikası, Çerez politikası
- [ ] Çerez onay bandı (GA onaydan sonra)
- [ ] Ön onay adımı → iyzico ödeme linki
- [ ] iyzico logo bandı (footer, resmi paket)
- [ ] Fiyatlar, taksit, teslim süresi (kullanıcıdan — proje sonunda)

## 8. Yayın
- [ ] Studio: `leads` formu açık + public + alanlar exposed; Netlify env: `PUBLIC_CONTENTRAIN_PROJECT_ID`, `PUBLIC_CONTENTRAIN_STUDIO_URL`, `STUDIO_CDN_KEY`
- [ ] `.contentrain/config.json`: stack `nuxt` → `astro`, varsayılan dil `tr` (MCP değiştirmiyor → kullanıcı onayı)
- [ ] Lighthouse (performans, erişilebilirlik, SEO) ve axe taraması
- [ ] PR → `content` dalı; yayın sonrası Search Console izlemesi (`/en/` sitemap'ini gönder; İngilizce sıralamalar 301 ile taşınamıyor)
- [ ] ETBİS kaydı (kullanıcı, e-Devlet)
