# Lanista Software — SEO Audit

_Tarih: 2026-06-28 · Kapsam: lanista.com.tr (kod tabanı + Search Console verisi + canlı doğrulama)_

## 1. Yönetici özeti

Site teknik olarak temiz kurulmuş ama **iki temel sorun** organik performansı kilitliyor:

1. **İçerik derinliği yok.** 2018'den beri yüzlerce iş yapılmış olmasına rağmen index'lenebilir
   yüzey ≈ **8 İngilizce sayfa** (1 ana sayfa + 7 servis). Portföy yalnızca ana sayfada 13 kart
   olarak ve **dış linklerle** duruyor; tek bir index'lenebilir vaka/proje sayfası yok.
2. **Birkaç teknik i18n/canonical hatası** mevcut sinyalleri de zayıflatıyor (özellikle kırık hreflang).

**Search Console (son 3 ay):** 42 tık · 9.490 gösterim · **%0,4 TO** · **ort. konum 15,8**.
Yani site 2. sayfada görünüyor (düşük sıralama) ve görünen yerlerde de tıklanmıyor (zayıf snippet).

> Not: SC'deki "Yönlendirmeli sayfa" (http/www) ve "Doğru standart etikete sahip alternatif sayfa"
> (?ref=, trailing-slash) kayıtları **hata değil** — Google'ın doğru yönettiği durumlar. Asıl sorun
> aşağıdaki içerik + teknik bulgular.

---

## 2. Teknik SEO bulguları (önceliğe göre)

### 🔴 KRİTİK — hreflang kırık (TR sayfası sahipsiz)
- Canlı `/tr/` **HTTP 200** döndürüyor (ayrı Türkçe sayfa mevcut).
- Ama ana sayfanın hreflang etiketleri:
  `en → https://lanista.com.tr/`, `tr → https://lanista.com.tr/`, `x-default → https://lanista.com.tr/`
  — **üçü de aynı (EN) URL'yi** gösteriyor. `/tr/` hiç referans edilmiyor.
- Sonuç: Google EN ve TR sayfalarını eşleştiremiyor; TR içeriği hreflang'den kopuk.
- **Düzeltme:** hreflang `tr` → `https://lanista.com.tr/tr/`, servis sayfalarında da
  `tr → /tr/services/{slug}/`. Aynı hata `pages/services/[slug].vue` ve `nuxt.config.ts > sitemap`'te de var.

### 🟠 YÜKSEK — trailing-slash canonical uyumsuzluğu
- Canlı: `/services/{slug}` → **301** → `/services/{slug}/` (sunucu trailing-slash'ı tercih ediyor).
- Ama sayfa `canonical` etiketi ve sitemap **slash'sız** sürümü bildiriyor.
- Sonuç: SC'deki "alternatif sayfa" gürültüsü; canonical sinyali kendiyle çelişiyor.
- **Düzeltme:** Tek biçim seç (öneri: trailing-slash'lı), canonical + sitemap + iç linkleri ona göre hizala.

### 🟠 YÜKSEK — SERP başlık/açıklamaları kırpılıyor (düşük TO sebebi)
- Ana sayfa meta description **188 karakter** (Google ~155-160'ta keser).
- Servis sayfası `metaTitle` uzunlukları: 67–**98** karakter (≥60 SERP'te kesilir):
  `saas` 98, `ai-powered` 93, `pos` 93, `payment` 92, `nuxtjs` 88, `nestjs` 81.
- Servis `metaDescription`'ları 171–190 karakter (uzun).
- **Düzeltme:** başlıkları ≤60, açıklamaları ≤155 karaktere indir; her sayfaya benzersiz, fayda+anahtar
  kelime odaklı, tıklamaya teşvik eden snippet yaz. (Artık Contentrain'de tek yerden yönetilebilir.)

### 🟡 ORTA — sitemap eksik & statik
- `nuxt.config.ts` sitemap'i elle 8 URL listeliyor: yalnızca EN, `/tr/` yok, `/tr/services/*` yok,
  trailing-slash yok, `/works` yok. `lastmod` her build'de değişiyor.
- **Düzeltme:** Sitemap'i `.contentrain/`'den **dinamik** üret (EN+TR, doğru slash, gelecekteki /works dahil).

### 🟢 DÜŞÜK
- `robots.txt` sağlıklı (`Disallow: /_nuxt/`, `/*?trk=*`). `?ref=` engellenmiyor ama canonical'landığı için zararsız.
  `Host:` direktifi deprecated (yalnız Yandex) — kaldırılabilir.
- `?ref=peerlist`, `?ref=steemhunt` aslında **backlink** (iyi) — dokunma.

---

## 3. İçerik bulguları (asıl kaldıraç)

| İçerik tipi | Mevcut | index'lenebilir sayfa? | Fırsat |
|---|---|---|---|
| Ana sayfa | 1 | ✓ | snippet/CTR iyileştirme |
| Servis sayfaları | 7 | ✓ (~330–370 kelime) | derinleştir + ≥800 kelime |
| Portföy (workitems) | 13 | ✗ (sadece kart + dış link) | **/works/:slug vaka sayfaları** |
| Testimonial | 3 | ✗ | sosyal kanıt + içerik |
| FAQ | 11 | ✗ (ana sayfada) | servis sayfalarına dağıt |
| Blog/insights | 0 | — | anahtar kelime hedefli makaleler |

**Kök neden:** Yüzlerce projesi olan bir ajansın Google'a sunduğu içerik ≈ 8 EN sayfa. Sıralanacak/
gösterim alacak yüzey yok → düşük gösterim + 2. sayfa sıralaması. Çözüm doğrudan içerik üretmek;
ve yaptığımız Contentrain migrasyonu tam da bunu **ölçekli + governance altında** üretmek için zemin.

---

## 4. Önceliklendirilmiş yol haritası

### Faz A — Hızlı teknik kazanımlar (düşük efor, hızlı etki)
1. hreflang'i düzelt (TR → /tr/) — ana sayfa + servis sayfaları + sitemap.
2. Trailing-slash'ı tek biçime sabitle (canonical + sitemap + iç linkler).
3. Başlık/açıklamaları kısalt & benzersizleştir (CTR).
4. Sitemap'i `.contentrain`'den dinamik üret (EN+TR, doğru slash).
5. Her sayfaya benzersiz OG görseli (şu an tek statik OG).

### Faz B — İçerik ölçeği (en yüksek SEO etkisi)
6. **`/works/:slug` vaka-çalışması sistemi**: yeni model + sayfa şablonu; 13 → onlarca/yüzlerce
   index'lenebilir, zengin proje sayfası (problem → çözüm → teknoloji → sonuç + görsel + iç link).
7. Servis sayfalarını derinleştir (≥800 kelime, SSS, ilgili işler, şema).
8. Testimonial/sosyal kanıtı genişlet.

### Faz C — Otorite
9. Blog/insights (`document` modeli) — anahtar kelime hedefli düzenli makaleler + iç linkleme.

> Tüm fazlar yeni Contentrain modelleri + MCP ile yürütülebilir; içerik git-governance altında kalır.

---

## 5. Ölçüm
- Search Console: konum (hedef <10), gösterim, TO (hedef >%2), index'lenen sayfa sayısı.
- Yeni /works ve blog sayfalarının index'lenme + sıralama takibi.
- Çekirdek kelimeler için konum takibi (servis + teknoloji kombinasyonları).
