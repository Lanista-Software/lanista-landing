# Ürün görselleri

Gerçek uygulamalardan alınmış ekran görüntüleri ve kısa ekran kayıtları. Veriler **kurgusaldır**: yerel emülatörde "Lanista Oto Yedek Parça" (Hesap Takip) ve "Lanista Tost" (Kasa Takip) adına üretilmiş örnek cariler, hareketler ve kasa günleri. Gerçek müşteri verisi, adı ya da telefonu yoktur.

Çekim: 2026-11-18 · telefon 390×844 (2x), masaüstü 1440×900 (1920 genişliğe küçültüldü) · WebP q80 · video H.264 MP4 (sessiz, döngüye uygun).

## Hesap Takip (`hesap-takip/`)

| Dosya | Ne gösteriyor | Önerilen alt metin |
|---|---|---|
| `mobil-ozet.webp` | Özet: toplam alacak, bu ay satış/tahsilat, vadesi geçen alacak, vadesi geçenler listesi | Hesap Takip özet ekranı: toplam alacak ve vadesi geçen cariler |
| `mobil-cariler.webp` | Cari listesi, "Vadesi geçti" rozetleri, filtreler | Cari listesi ve vadesi geçen borç rozetleri |
| `mobil-cari-ekstre.webp` | Cari kartı: bakiye, vade uyarısı, Satış/Tahsilat/İade/Döküm düğmeleri, ekstre | Bir carinin bakiyesi, vade uyarısı ve hesap ekstresi |
| `mobil-satis-ekle.webp` | Satış formu: plaka, araç, parça (kod ve fiyat hafızadan gelir) | Plaka ve parçayla hızlı satış girişi |
| `mobil-sms-hatirlatma.webp` | SMS hatırlatma onay listesi (vadesi geçenler, tutarlar) | Vadesi geçenlere SMS hatırlatma onay listesi |
| `mobil-hareketler.webp` | Tüm hareketler | Satış ve tahsilat hareketleri |
| `mobil-raporlar.webp` | Dönem raporu: satış, iade, net satış, tahsilat, gruplu döküm | Dönem raporu: satış, tahsilat ve gruplu döküm |
| `masaustu-*.webp` | Aynı ekranların masaüstü (kenar menülü) hali: özet, cariler, cari ekstre, hareketler, SMS, raporlar | |
| `video-satis-girisi.mp4` (+ `-kapak.webp`) | 16 sn: cariye satış girilir; parça adı yazılınca kod ve fiyat kendiliğinden gelir; kayıt ekstreye düşer | Parça hafızasıyla satış girişi |
| `video-ozet-ve-sms.mp4` (+ `-kapak.webp`) | 9 sn: özet kaydırılır, SMS hatırlatma listesine geçilir | Özet ekranı ve SMS hatırlatma listesi |

## Kasa Takip (`kasa-takip/`)

| Dosya | Ne gösteriyor | Önerilen alt metin |
|---|---|---|
| `mobil-gun.webp` | Gün ekranı: gece kasa, devir, kart ve platform gelirleri (platform net oranıyla) | Günlük kasa girişi: nakit, kart ve yemek platformları |
| `mobil-gun-bugun.webp` | Bugünün kaydı | Bugünün kasa kaydı |
| `mobil-gun-giderler.webp` | Gider satırları: kasa/kart, tür, tedarikçi, borç ödemesi / peşin alım | Gider girişi ve tedarikçi seçimi |
| `mobil-gunler.webp` | Ay görünümü: gün gün ciro ve kâr | Ay içinde gün gün ciro ve kâr |
| `mobil-raporlar.webp` | Ciro, net gelir, gider, kâr; kanallara göre gelir ve komisyon | Ciro, platform komisyonu ve kâr raporu |
| `mobil-kisiler.webp` | Çalışanlar ve tedarikçiler, tedarikçilere toplam borç | Çalışan ve tedarikçi ödemeleri |
| `mobil-tedarikci-cari.webp` | Tedarikçi cari hesabı, borç bakiyesi | Tedarikçiye borç takibi |
| `masaustu-*.webp` | Aynı ekranların masaüstü hali | |
| `video-gun-sonu-kasa.mp4` (+ `-kapak.webp`) | 17 sn: gün sonu kasa ve kanallar girilir, ciro/net/kâr anında hesaplanır, "Ekmek" yazılınca tür ve tedarikçi kendiliğinden gelir | Gün sonu kasa girişi ve anında kâr hesabı |

> **Not — telefon numaraları:** Cari listesinde ve SMS ekranında görünen numaralar örnek veri üreticisinin yazdığı rastgele numaralardır; gerçek birine ait olabilirler. Bu görseller sitede büyük ve okunur boyutta kullanılacaksa önce numaraların bulanıklaştırılması ya da `0555 000 xx xx` gibi açıkça sahte numaralarla yeniden çekilmesi önerilir.

## Yeniden çekmek

Görseller şu kurulumla üretildi (Lanista ekibi için):

1. `otodeniz-landing`: `INSTANCE=demo pnpm dev:emulator` (işletme adı geçici olarak "Lanista Oto Yedek Parça"), ardından `scripts/seed-demo.mjs`'in emülatöre yönlendirilmiş kopyasıyla 28 cari / ~700 hareket.
2. `tosthane`: `pnpm dev:emulator` + kurgusal "Lanista Tost" verisi (62 gün, kurgusal çalışan ve tedarikçiler); sayfadaki "Tosthane" adı çekimde "Lanista Tost" ile değiştirildi.
3. Playwright (Chromium) ile 390×844 @2x ve 1440×900 @2x ekran görüntüsü; videolar ekran kaydı → `ffmpeg` ile H.264.

## Kullanım

Görsel yolları Contentrain'de `public/images/products/...` olarak verilir (`imagePath` başındaki `public/`ı atar). Telefon görüntüleri `HeroVisual`'daki telefon çerçevesine birebir oturur (390×844).

Video için:

```html
<video src="/images/products/hesap-takip/video-satis-girisi.mp4"
       poster="/images/products/hesap-takip/video-satis-girisi-kapak.webp"
       autoplay muted loop playsinline preload="none" width="390" height="844"></video>
```

`prefers-reduced-motion` açıksa `autoplay` kaldırılıp yalnız kapak gösterilmeli. Videolar 390 px genişlikte kaydedildi; telefon çerçevesinde ~300–390 px gösterim için uygundur, daha büyük gösterilmemeli.
