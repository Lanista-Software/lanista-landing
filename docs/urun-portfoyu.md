# Ürün portföyü (2026-11-25)

Kaynak: iç ürün tablosu (kullanıcı, 2026-11-25). Sitedeki karşılığı Contentrain `products` modelidir; metinler oradan düzenlenir.

| Ürün | Durum (tablo) | Sitede `status` | Grup | Sayfa |
|------|---------------|-----------------|------|-------|
| Lanista e-Fatura | Hazır | live (menüde öne çıkan) | e-donusum | /urunler/e-fatura/ |
| Lanista Kontör | Aralık 2026 | soon + "Aralık 2026", `launch_date` 2026-12-01 | e-donusum | /urunler/kontor/ |
| Lanista Köprü | Planlı | soon + "Planlı" | e-donusum | /urunler/kopru/ |
| e-Dönüşüm geçiş hizmeti | Hazır | live, `link_to: e-donusum` | e-donusum | /e-donusum/ (yalnız TR) |
| Lanista Ön Muhasebe | Kısmen hazır, Aralık başı | soon + "Aralık 2026", `launch_date` 2026-12-01 | isletme | /urunler/on-muhasebe/ |
| Lanista Yedek Parça (eski Hesap Takip) | Hazır | live | isletme | /urunler/yedek-parca/ |
| Lanista Oto Servis | Erken erişim | pilot ("Erken erişim") | isletme | /urunler/oto-servis/ |
| Lanista Lastik Oteli | Hazır | live | isletme | /urunler/lastik-oteli/ |
| Lanista Oto Galeri | Erken erişim | pilot | isletme | /urunler/oto-galeri/ |
| Lanista Emlak | Erken erişim | pilot | isletme | /urunler/emlak/ |
| Lanista Nalbur (eski Nalbur Takip) | Erken erişim | pilot | isletme | /urunler/nalbur/ |
| Lanista Toptan Satış | Erken erişim | pilot | isletme | /urunler/toptan-satis/ |
| Lanista Yazılım hizmetleri | Hazır | live, `link_to: services` | hizmet | /hizmetler/ |

- Marka: tüm ürünler Lanista adı altında.
- e-Fatura bir modüldür: sektör uygulamalarına satın alırken eklenir (kartlarda "e-Fatura modülü eklenebilir"). Lanista e-Fatura tek başına da satılır.
- Ürün sayfaları yayın öncesi zamanla tamamlanacak; ekran görüntüleri hazır oldukça eklenecek.
- Kasa Takip kaldırıldı. Eski adresler 301 ile yönlendiriliyor (`netlify.toml`): hesap-takip → yedek-parca, nalbur-takip → nalbur, kasa-takip → /urunler/.
- Gelir modeli ve "e-Fatura bağı" sütunları iç bilgidir. Sitede yalnız kartlardaki `einvoice_note` satırı ("e-Fatura dahil" vb.) olarak görünür. Kâr marjı ve maliyet yazılmaz.
- Oto Galeri ve Emlak için e-Fatura sınırı sitede yalnızca "genel sınırdan düşüktür" diye geçer. Tutar mali müşavirle teyit edilecek.

## Turkcell e-Şirket geçişi (sözleşme 2026-12-01)

1 Aralık'a kadar canlı sitede sağlayıcı adı ve kontör fiyatı yoktur. Hazırlık bir önizleme anahtarının arkasındadır:

- `LAUNCH_PREVIEW=1 yarn dev` (ya da bu değişkeni taşıyan bir Netlify deploy preview) açılınca:
  - `launch_date` dolu olan ürünler (şu an Kontör) yayında gibi görünür: paket kartları, kontör başı fiyat, geçerlilik süresi.
  - e-Dönüşüm grubundaki ürünlerde "Turkcell e-Şirket çözüm ortağıyız" bandı çıkar.
  - Sayfanın üstünde sarı bir önizleme şeridi görünür.
- Kontör paketleri (`plans`, ürün = Lanista Kontör): 1.000 / 2.500 / 5.000 / 10.000 kontör, 24 ay. **Fiyatlar yer tutucudur** (Turkcell'in herkese açık liste fiyatı). İç fiyat listesi gelince değiştirilecek ve "ÖNİZLEME" notları silinecek.

1 Aralık'ta (Contentrain'den, kod değişikliği gerekmez):
1. `company.einvoice_provider` = "Turkcell e-Şirket". Varsa resmi logo (`einvoice_provider_logo`) ve sayfa adresi (`einvoice_provider_url`) girilir. Logo kullanımı Turkcell'in marka kurallarına göre yapılır.
2. Kontör `status` = live, `status_note` boşaltılır. Plan fiyatları ve notları son hâline getirilir; satın alma linki varsa `checkout_url` girilir.
3. Ürün metinlerindeki "GİB onaylı özel entegratör altyapısı" ifadeleri istenirse sağlayıcı adıyla güncellenir (e-Fatura SSS, e-Dönüşüm sayfası).
4. Kontör SSS'sindeki "Ne zaman satışa açılıyor?" sorusu kaldırılır.

Araştırma notu (2026-11-25): Turkcell'in resmi sayfası kontörü peşin ve 24 ay taksitli fiyatla veriyor, kontörler 24 ay geçerli. Kurallar: e-Faturada gelen ve giden belge 1'er kontör, e-Arşivde yalnız giden belge, e-Defterde 60 satır 1 kontör. Kontör havuzu tüm belge türlerinde ortak. İncelenen çözüm ortağı sayfaları: ideasoft (paket tablosu + 3 adımlı başvuru) ve Netadam (ERP entegrasyonu, 5 adımlı kurulum, SSS).
