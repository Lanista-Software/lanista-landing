# Contentrain geri bildirimi (lanista-landing, 2026-11-19)

Bu projede CLI 0.9.2, `@contentrain/query` 7.0.4 ve MCP araçlarını kullanırken karşılaşılan sorunlar. Her madde yeniden üretilebilir; geçici çözümler projede uygulandı.

## 1. i18n'e geçişte eski dosyalar geride kalıyor
- **Ne oldu:** Bir modeli `i18n: false` → `true` yapınca yeni `tr.json` / `en.json` (koleksiyon) ve `slug/tr.md` (doküman) dosyaları yazılıyor, ama eski `data.json` ve düz `slug.md` dosyaları siliniyor değil.
- **Sonuç:** `contentrain_validate` bu dosyalar için "missing translation" ve "orphan content" uyarıları veriyor (bu projede 38 uyarı).
- **Beklenen:** Geçiş eski dosyaları kaldırmalı ya da `validate --fix` bunları temizlemeli.

## 2. `validate --fix` "EEXIST" hatasıyla duruyor
- **Hata:** `Validation failed: EEXIST: file already exists, mkdir '/var/folders/.../cr-<uuid>/.contentrain/content/system/legal-pages/cerez-politikasi.md'`
- **Tekrar üretme:** Aynı slug için hem düz `cerez-politikasi.md` dosyası hem `cerez-politikasi/` klasörü (i18n dokümanı) varken `contentrain_validate {"fix": true}`.
- **Beklenen:** Düz dosya ile klasör çakışması algılanıp eski dosya taşınmalı/silinmeli; en azından anlamlı bir hata verilmeli.

## 3. Varsayılan dil değişince i18n olmayan modellerin meta düzeni
- **Ne oldu:** `config.json` içinde `locales.default` `en` → `tr` yapıldı (MCP bunu değiştiremiyor, elle yapıldı). i18n olmayan modeller (`leads`, `references`, `sociallinks`, `company`) için meta `en.json` altında kaldı, doğrulama `tr.json` bekliyor.
- **Beklenen:** Varsayılan dil değişikliği MCP aracıyla yapılabilmeli ve meta dosyalarını taşımalı.

## 4. Doküman frontmatter boolean'ları tırnaklı yazılıyor
- **Ne oldu:** `boolean` tipli doküman alanı `content_save` ile `true` gönderilince frontmatter'a `"true"` (string) yazılıyor; sonraki i18n doküman kaydı tip doğrulamasından geçmiyor.
- **Geçici çözüm:** Alanlar `select` (`'true'` / `'false'`) yapıldı, kodda boolean'a çevriliyor (`src/lib/legal.ts`).

## 5. `contentrain_bulk update_status` dokümanları desteklemiyor
- Koleksiyonlarda çalışıyor, `document` modellerinde hata veriyor.

## 6. `content_save` koleksiyon girdisini tamamen değiştiriyor
- Kısmi güncelleme (tek alan) desteklenmiyor; gönderilmeyen alanlar siliniyor ya da zorunlu alan hatası veriyor. Her güncellemede girdinin tamamı gönderilmeli.
- **Öneri:** `content_patch` / `merge: true` seçeneği.
