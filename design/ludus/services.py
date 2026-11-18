"""Ludus service-card illustrations, 2:1 (640 x 320) — see docs/illustration-style.md.

Service cards are wide, so the software object is large and leads; the classical
structure frames it. One red element per image. Run: python3 design/ludus/services.py
"""
import math, os

OUT = os.path.join(os.path.dirname(__file__), 'out')
os.makedirs(OUT, exist_ok=True)

INK, STONE, SHADE, HATCH, BLUE, RED, PALE = '#10273E', '#EBF2FA', '#C2D9EF', '#9ABFE5', '#2F73B6', '#E31F30', '#F5F9FD'
S = f'stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
S1 = f'stroke="{INK}" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"'
W, H, G = 640, 320, 284  # canvas and ground line


def svg(title, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img">
<title>{title}</title>
<defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="{HATCH}" stroke-width="1.5"/></pattern></defs>
<rect width="{W}" height="{H}" fill="#fff"/>
{body}
</svg>
'''


# ---------- architecture ----------
def ground(x0=40, x1=600):
    return f'<line x1="{x0}" y1="{G}" x2="{x1}" y2="{G}" {S}/>'


def plinth(x0, w):
    return (f'<rect x="{x0}" y="{G - 14}" width="{w}" height="14" fill="{SHADE}" {S}/>'
            f'<rect x="{x0 + 18}" y="{G - 26}" width="{w - 36}" height="12" fill="{STONE}" {S}/>'
            f'<rect x="{x0 + w - 16}" y="{G - 14}" width="16" height="14" fill="url(#h)"/>')


def mosaic(cx=320, n=24, blue=(4, 11, 19)):
    x0 = cx - n * 5
    return ''.join(f'<rect x="{x0 + i * 10}" y="{G + 8}" width="8" height="8" rx="1" fill="{BLUE if i in blue else STONE}" {S1}/>' for i in range(n))


def column(x, top, base, w=26, flutes=3, capital=True):
    out = f'<rect x="{x}" y="{top}" width="{w}" height="{base - top}" fill="{STONE}" {S}/>'
    for k in range(1, flutes + 1):
        xx = x + k * w / (flutes + 1)
        out += f'<line x1="{xx:.1f}" y1="{top + 8}" x2="{xx:.1f}" y2="{base - 6}" {S1}/>'
    out += f'<rect x="{x + w - 7}" y="{top}" width="6" height="{base - top}" fill="url(#h)"/>'
    if capital:
        out += f'<rect x="{x - 6}" y="{top - 10}" width="{w + 12}" height="10" fill="{SHADE}" {S}/>'
    return out


def pediment(x0, w, y, oculus=False):
    cx = x0 + w / 2
    out = f'<rect x="{x0}" y="{y}" width="{w}" height="12" fill="{STONE}" {S}/>'
    out += f'<polygon points="{x0},{y} {cx},{y - 34} {x0 + w},{y}" fill="{STONE}" {S}/>'
    if oculus:
        out += f'<circle cx="{cx}" cy="{y - 13}" r="6" fill="{RED}" {S}/>'
    return out


def keystone(cx, spring, ro, ri, dy=0, fill=RED):
    a = math.radians(8)
    pts = [(cx - ro * math.sin(a) - 3, spring - ro * math.cos(a) - 6 + dy), (cx + ro * math.sin(a) + 3, spring - ro * math.cos(a) - 6 + dy),
           (cx + ri * math.sin(a), spring - ri * math.cos(a) + dy), (cx - ri * math.sin(a), spring - ri * math.cos(a) + dy)]
    return f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="{fill}" {S}/>'


def arch(cx, base, spring, ro, ri, red=True, joints=True):
    xl, xr, il, ir = cx - ro, cx + ro, cx - ri, cx + ri
    p = (f'<path d="M{xl} {base} V{spring} A{ro} {ro} 0 0 1 {xr} {spring} V{base} H{ir} V{spring} '
         f'A{ri} {ri} 0 0 0 {il} {spring} V{base} Z" fill="{STONE}" {S}/>')
    p += f'<rect x="{xr - 8}" y="{spring}" width="7" height="{base - spring}" fill="url(#h)"/>'
    p += f'<rect x="{xl - 5}" y="{spring - 4}" width="{ro - ri + 10}" height="8" fill="{SHADE}" {S}/>'
    p += f'<rect x="{ir - 5}" y="{spring - 4}" width="{ro - ri + 10}" height="8" fill="{SHADE}" {S}/>'
    if joints:
        for a in (30, 55, 80, 100, 125, 150):
            r = math.radians(a)
            p += f'<line x1="{cx - ri * math.cos(r):.1f}" y1="{spring - ri * math.sin(r):.1f}" x2="{cx - ro * math.cos(r):.1f}" y2="{spring - ro * math.sin(r):.1f}" {S1}/>'
    p += keystone(cx, spring, ro, ri, fill=RED if red else SHADE)
    return p


# ---------- software objects ----------
def window(x, y, w, h, bar=True):
    out = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="7" fill="#fff" {S}/>'
    if bar:
        out += f'<line x1="{x}" y1="{y + 16}" x2="{x + w}" y2="{y + 16}" {S1}/>'
        out += ''.join(f'<circle cx="{x + 11 + i * 8}" cy="{y + 8}" r="2.2" fill="{BLUE}"/>' for i in range(3))
    return out


def bar(x, y, w, c=BLUE, op=1, sw=3):
    return f'<line x1="{x}" y1="{y}" x2="{x + w}" y2="{y}" stroke="{c}" stroke-width="{sw}" stroke-linecap="round" opacity="{op}"/>'


def text_lines(x, y, widths, gap=11, c=INK, op=.45, sw=2):
    return ''.join(bar(x, y + i * gap, w, c, op, sw) for i, w in enumerate(widths))


def phone(x, y, w=74, h=146):
    out = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="#fff" {S}/>'
    out += f'<rect x="{x + w / 2 - 12}" y="{y + 6}" width="24" height="5" rx="2.5" fill="{INK}"/>'
    out += f'<line x1="{x + w / 2 - 14}" y1="{y + h - 8}" x2="{x + w / 2 + 14}" y2="{y + h - 8}" {S1}/>'
    return out


def chip(x, y, w, h=16, fill=PALE, stroke=BLUE):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h / 2}" fill="{fill}" stroke="{stroke}" stroke-width="1.25"/>'


# ============ 1. Mobil uygulama — two phones under a double arcade ============
def mobile():
    b = ground() + mosaic() + plinth(160, 320)
    b += arch(260, G - 26, 120, 76, 56, red=False, joints=False) + arch(380, G - 26, 120, 76, 56, red=True, joints=False)
    b += f'<rect x="184" y="112" width="272" height="8" fill="{SHADE}" {S}/>'
    # phones in the openings
    for i, (px, tint) in enumerate(((223, BLUE), (343, BLUE))):
        b += phone(px, 96, 74, 150)
        b += f'<rect x="{px + 8}" y="{116}" width="58" height="40" rx="5" fill="{STONE}"/>'
        b += f'<circle cx="{px + 22}" cy="{136}" r="9" fill="{tint}" opacity=".8"/>'
        b += f'<polyline points="{px + 34},{150} {px + 46},{134} {px + 58},{150}" fill="none" stroke="{tint}" stroke-width="2" stroke-linejoin="round"/>'
        b += text_lines(px + 9, 168, (48, 36, 42), gap=12)
        b += f'<rect x="{px + 9}" y="{210}" width="56" height="16" rx="8" fill="{BLUE}"/>'
    # asymmetric: app-store style rating card on the left, notifications on the right
    b += window(58, 150, 96, 58, bar=False) + ''.join(f'<path d="M{72 + i * 15} 168 l3 6 6 1 -4.5 4 1.2 6 -5.7 -3 -5.7 3 1.2 -6 -4.5 -4 6 -1z" fill="{BLUE if i < 4 else STONE}" stroke="{BLUE}" stroke-width="1"/>' for i in range(5))
    b += text_lines(70, 192, (60,), sw=2)
    b += window(492, 120, 98, 34, bar=False) + f'<circle cx="508" cy="137" r="7" fill="{BLUE}"/>' + text_lines(522, 132, (54, 36), gap=9)
    b += window(500, 164, 90, 34, bar=False) + f'<circle cx="516" cy="181" r="7" fill="{SHADE}" stroke="{BLUE}" stroke-width="1.25"/>' + text_lines(530, 176, (46, 30), gap=9)
    return svg('Mobil uygulama geliştirme: çifte kemer altında iki telefon, değerlendirme ve bildirim kartları', b)


# ============ 2. Web sitesi ve e-ticaret — browser storefront in a portico ============
def web_ecommerce():
    b = ground() + mosaic() + plinth(140, 360)
    b += column(166, 86, G - 26) + column(448, 86, G - 26)
    b += pediment(150, 340, 64, oculus=True)
    b += window(206, 88, 228, 160)
    # storefront: hero banner + product grid
    b += f'<rect x="218" y="114" width="204" height="40" rx="5" fill="{STONE}"/>' + text_lines(230, 128, (90, 60), gap=12, c=BLUE, op=.9, sw=3)
    for c in range(3):
        x = 218 + c * 70
        b += f'<rect x="{x}" y="164" width="64" height="44" rx="5" fill="#fff" {S1}/>'
        b += f'<rect x="{x + 8}" y="171" width="48" height="22" rx="3" fill="{SHADE}"/>'
        b += bar(x + 8, 201, 26, BLUE, 1, 3)
    b += f'<rect x="218" y="218" width="96" height="20" rx="10" fill="{BLUE}"/>'
    # cart on the right, outside the portico
    b += f'<path d="M520 196 h12 l12 46 h44 l10 -32 h-60" fill="none" {S}/>'
    b += f'<rect x="548" y="200" width="22" height="18" rx="2" fill="{STONE}" {S1}/><rect x="572" y="206" width="18" height="14" rx="2" fill="{SHADE}" {S1}/>'
    b += f'<circle cx="552" cy="254" r="7" fill="#fff" {S}/><circle cx="584" cy="254" r="7" fill="#fff" {S}/>'
    # SEO tablet on the left
    b += window(46, 150, 92, 70, bar=False) + f'<circle cx="68" cy="174" r="11" fill="none" stroke="{BLUE}" stroke-width="2"/><line x1="76" y1="182" x2="84" y2="190" stroke="{BLUE}" stroke-width="3" stroke-linecap="round"/>'
    b += text_lines(92, 168, (34, 26, 30), gap=10)
    return svg('Web sitesi ve e-ticaret: sütunlu revak içinde ürün ızgaralı mağaza sayfası ve alışveriş sepeti', b)


# ============ 3. Web uygulaması ve özel yazılım — dashboard window under a great arch ============
def web_app():
    b = ground() + mosaic() + plinth(150, 340)
    b += arch(320, G - 26, 160, 140, 120)
    b += window(214, 112, 212, 140)
    # sidebar + charts
    b += f'<rect x="215" y="129" width="42" height="122" fill="{STONE}"/>' + f'<line x1="257" y1="128" x2="257" y2="252" {S1}/>'
    b += ''.join(bar(224, 144 + i * 16, 22 - (i % 2) * 6, BLUE if i == 0 else INK, 1 if i == 0 else .4, 3) for i in range(5))
    for i, hh in enumerate((30, 48, 38, 64, 54, 72)):
        b += f'<rect x="{270 + i * 16}" y="{214 - hh}" width="10" height="{hh}" rx="2" fill="{BLUE}" opacity="{.4 + i * .1:.2f}"/>'
    b += f'<line x1="266" y1="216" x2="366" y2="216" {S1}/>'
    b += f'<circle cx="398" cy="170" r="24" fill="none" stroke="{SHADE}" stroke-width="9"/><path d="M398 146 A24 24 0 0 1 420 180" fill="none" stroke="{BLUE}" stroke-width="9"/>'
    b += text_lines(268, 232, (110, 80), gap=10)
    # workflow cards on the sides (asymmetric)
    b += window(44, 170, 104, 64, bar=False) + chip(56, 182, 42) + text_lines(56, 212, (70, 50), gap=10)
    b += f'<path d="M148 202 C170 202 166 180 186 180" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-dasharray="4 4"/>'
    b += window(500, 136, 96, 54, bar=False) + f'<polyline points="512,172 528,160 544,166 560,150 584,156" fill="none" stroke="{BLUE}" stroke-width="2" stroke-linejoin="round"/>'
    return svg('Web uygulaması ve özel yazılım: büyük kemer altında yan menülü yönetim paneli ve iş akışı kartları', b)


# ============ 4. Ödeme entegrasyonu — card + checkout on a plinth, shield gate ============
def payment():
    b = ground() + mosaic() + plinth(170, 300)
    b += column(194, 96, G - 26) + column(420, 96, G - 26)
    b += f'<rect x="182" y="78" width="276" height="16" fill="{SHADE}" {S}/>'
    # checkout window
    b += window(238, 98, 164, 152)
    b += text_lines(252, 128, (70,), c=INK, op=.8, sw=3)
    for i in range(3):
        b += f'<rect x="252" y="{142 + i * 26}" width="136" height="18" rx="4" fill="#fff" {S1}/>' + bar(260, 151 + i * 26, (78, 40, 30)[i], INK, .35, 2)
    b += f'<rect x="252" y="222" width="136" height="20" rx="10" fill="{BLUE}"/>' + f'<path d="M314 228 v-2 a6 6 0 0 1 12 0 v2" fill="none" stroke="#fff" stroke-width="1.5"/><rect x="312" y="228" width="16" height="10" rx="2" fill="#fff"/>'
    # card tilted, the single red is its chip? no: the card stripe stays blue; red = keystone-like seal
    b += f'<g transform="rotate(-8 120 200)"><rect x="60" y="160" width="124" height="78" rx="9" fill="{STONE}" {S}/>' \
         f'<rect x="74" y="178" width="24" height="18" rx="3" fill="{SHADE}" {S1}/>' + text_lines(74, 214, (80,), c=INK, op=.6, sw=3) + text_lines(74, 226, (40,), c=BLUE, op=1, sw=3) + '</g>'
    # success seal (the single red element) on the right
    b += f'<circle cx="520" cy="176" r="30" fill="#fff" {S}/><circle cx="520" cy="176" r="22" fill="{RED}" {S1}/>'
    b += f'<polyline points="509,177 517,185 532,168" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
    b += f'<path d="M500 200 l-8 30 14 -6 8 12 6 -26 M540 200 l8 30 -14 -6 -8 12 -6 -26" fill="{SHADE}" {S1}/>'
    b += f'<path d="M184 196 C210 196 214 172 236 172" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-dasharray="4 4"/><path d="M404 172 C440 172 456 176 488 176" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-dasharray="4 4"/>'
    return svg('Ödeme entegrasyonu: sütunlar arasında ödeme formu, kredi kartı ve onay mührü', b)


# ============ 5. POS — terminal on a stone counter, order tickets ============
def pos():
    b = ground() + mosaic()
    # stone counter (long plinth)
    b += f'<rect x="120" y="214" width="400" height="70" fill="{STONE}" {S}/><rect x="108" y="202" width="424" height="12" fill="{SHADE}" {S}/>'
    b += f'<rect x="510" y="214" width="9" height="70" fill="url(#h)"/>'
    b += ''.join(f'<rect x="{140 + i * 64}" y="230" width="48" height="40" fill="none" {S1}/>' for i in range(6))
    # POS terminal with screen
    b += f'<path d="M250 202 l12 -26 h36 l12 26 z" fill="{SHADE}" {S}/>'
    b += f'<rect x="214" y="58" width="152" height="118" rx="8" fill="#fff" {S}/>'
    for r in range(2):
        for c in range(3):
            b += f'<rect x="{226 + c * 30}" y="{72 + r * 34}" width="24" height="28" rx="4" fill="{STONE}" stroke="{BLUE}" stroke-width="1.25"/>'
    b += f'<line x1="320" y1="70" x2="320" y2="164" {S1}/>' + text_lines(328, 82, (28, 22, 30, 18), gap=12)
    b += f'<rect x="326" y="146" width="32" height="16" rx="8" fill="{BLUE}"/>' + f'<rect x="226" y="142" width="84" height="20" rx="4" fill="{PALE}" stroke="{BLUE}" stroke-width="1.25"/>'
    # printer + receipt (right)
    b += f'<rect x="400" y="168" width="72" height="34" rx="5" fill="{STONE}" {S}/>'
    b += f'<path d="M412 168 V96 l6 4 6 -4 6 4 6 -4 6 4 6 -4 6 4 6 -4 V168" fill="#fff" {S}/>'
    b += text_lines(420, 112, (34, 24, 30, 20), gap=10) + bar(420, 156, 34, BLUE, 1, 3)
    # order ticket rail (left) with one new order = red
    b += f'<line x1="70" y1="92" x2="190" y2="92" {S}/>'
    for i, x in enumerate((78, 120, 158)):
        b += f'<rect x="{x}" y="96" width="30" height="46" rx="3" fill="#fff" {S1}/>' + text_lines(x + 6, 108, (18, 14, 16), gap=9, sw=1.5)
    b += f'<circle cx="93" cy="92" r="5" fill="{RED}" {S1}/>'
    return svg('POS uygulama geliştirme: taş tezgâh üzerinde POS terminali, fiş yazıcısı ve sipariş fişleri', b)


# ============ 6. AI destekli geliştirme — oracle tablet: chat + node graph ============
def ai():
    b = ground() + mosaic() + plinth(150, 340)
    b += arch(320, G - 26, 124, 110, 92, red=False)
    b += window(234, 96, 172, 150)
    # chat bubbles
    b += f'<rect x="248" y="122" width="100" height="24" rx="10" fill="{STONE}"/>' + text_lines(258, 134, (70,), sw=2)
    b += f'<rect x="292" y="154" width="100" height="36" rx="10" fill="{BLUE}"/>' + text_lines(302, 166, (76, 52), gap=11, c='#fff', op=1, sw=2)
    b += f'<rect x="248" y="198" width="80" height="22" rx="10" fill="{STONE}"/>' + text_lines(258, 209, (54,), sw=2)
    b += f'<rect x="248" y="226" width="144" height="12" rx="6" fill="#fff" {S1}/>'
    # node graph (right), the active node is red
    nodes = [(500, 120), (560, 150), (520, 190), (580, 214), (480, 230)]
    for (x1, y1), (x2, y2) in ((nodes[0], nodes[1]), (nodes[0], nodes[2]), (nodes[1], nodes[2]), (nodes[2], nodes[3]), (nodes[2], nodes[4]), (nodes[1], nodes[3])):
        b += f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{HATCH}" stroke-width="1.5"/>'
    for i, (x, y) in enumerate(nodes):
        b += f'<circle cx="{x}" cy="{y}" r="{11 if i == 2 else 8}" fill="{RED if i == 2 else (BLUE if i % 2 else STONE)}" {S1}/>'
    b += f'<path d="M412 180 C440 180 470 190 506 190" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-dasharray="4 4"/>'
    # code panel (left)
    b += f'<rect x="44" y="144" width="120" height="86" rx="7" fill="{INK}"/>'
    for i, (w, c) in enumerate(((60, '#6FA3D8'), (82, '#C2D9EF'), (48, '#6FA3D8'), (70, '#C2D9EF'), (36, '#6FA3D8'))):
        b += bar(56 + (10 if i in (1, 2, 3) else 0), 160 + i * 14, w, c, 1, 2.5)
    b += f'<path d="M164 186 C190 186 200 170 230 170" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-dasharray="4 4"/>'
    return svg('Yapay zekâ destekli geliştirme: kemer altında sohbet arayüzü, kod paneli ve etkin düğümlü ağ', b)


# ============ 7. SaaS — amphitheatre of tenants around one platform ============
def saas():
    b = ground() + mosaic()
    # amphitheatre seen from the front: concentric tiers (cavea) behind the stage
    for i, (r, fill) in enumerate(((270, STONE), (220, PALE), (170, STONE), (120, '#fff'))):
        b += f'<path d="M{320 - r} {G} A{r} {r * .62:.0f} 0 0 1 {320 + r} {G} Z" fill="{fill}" {S}/>'
    b += f'<path d="M50 {G} A270 167 0 0 1 120 {G - 112}" fill="none" stroke="{HATCH}" stroke-width="0"/>'
    # central platform window
    b += window(234, 108, 172, 120)
    b += f'<rect x="246" y="136" width="60" height="80" rx="4" fill="{STONE}"/>' + text_lines(254, 150, (40, 30, 44, 26, 36), gap=13, c=BLUE, op=.9, sw=3)
    b += f'<rect x="316" y="136" width="78" height="36" rx="4" fill="#fff" {S1}/><polyline points="324,164 340,154 354,158 370,144 386,148" fill="none" stroke="{BLUE}" stroke-width="2"/>'
    b += f'<rect x="316" y="180" width="78" height="36" rx="4" fill="#fff" {S1}/>' + ''.join(f'<rect x="{324 + k * 18}" y="188" width="12" height="20" rx="2" fill="{BLUE}" opacity="{.4 + k * .15:.2f}"/>' for k in range(4))
    # tenant seats: small windows on the tiers, one red (new tenant)
    seats = [(92, 262), (548, 262), (130, 214), (510, 214), (196, 176), (444, 176), (170, 258), (470, 258)]
    for i, (x, y) in enumerate(seats):
        b += f'<rect x="{x - 18}" y="{y - 14}" width="36" height="26" rx="4" fill="#fff" {S1}/>'
        b += f'<circle cx="{x - 8}" cy="{y - 1}" r="4" fill="{RED if i == 3 else BLUE}"/>' + bar(x - 1, y - 1, 12, INK, .4, 2)
    return svg('SaaS platform geliştirme: amfi tiyatro basamaklarında kiracı pencereleri, ortada tek platform paneli', b)


# ============ 8. MVP — a small temple model on the drafting table + first release ============
def mvp():
    b = ground() + mosaic()
    # table
    b += f'<rect x="96" y="196" width="448" height="12" fill="{SHADE}" {S}/>'
    b += f'<path d="M126 208 L114 {G} M514 208 L526 {G}" {S}/>'
    # temple model (small, left of centre)
    b += f'<rect x="132" y="180" width="140" height="16" fill="{STONE}" {S}/>'
    b += ''.join(column(146 + i * 32, 118, 180, w=16, flutes=1) for i in range(4))
    b += pediment(136, 132, 104)
    # pennant (the single red) on top
    b += f'<line x1="202" y1="70" x2="202" y2="40" {S}/><path d="M202 40 L226 47 L202 54 Z" fill="{RED}" {S1}/>'
    # first-release phone + browser (right)
    b += window(318, 70, 176, 118)
    b += f'<rect x="330" y="98" width="152" height="34" rx="5" fill="{STONE}"/>' + text_lines(342, 110, (80, 56), gap=11, c=BLUE, op=.9, sw=3)
    b += text_lines(330, 146, (120, 96, 110), gap=12)
    b += f'<rect x="330" y="166" width="64" height="14" rx="7" fill="{BLUE}"/>'
    b += phone(462, 108, 58, 88) + text_lines(472, 132, (36, 28, 32), gap=11) + f'<rect x="472" y="170" width="38" height="12" rx="6" fill="{BLUE}"/>'
    # roadmap tags on the table edge
    b += chip(300, 216, 52) + chip(360, 216, 64) + chip(432, 216, 44, fill='#fff', stroke=HATCH)
    return svg('MVP geliştirme: çizim masasında küçük tapınak maketi, ilk sürümün web ve mobil ekranları', b)


# ============ 9. Mikroservis — Roman aqueduct carrying data between services ============
def microservice():
    b = ground() + mosaic(n=30)
    # aqueduct: row of arches
    xs = (130, 230, 330, 430, 530)
    b += f'<rect x="80" y="134" width="500" height="18" fill="{SHADE}" {S}/>'
    b += f'<rect x="80" y="152" width="500" height="10" fill="{STONE}" {S1}/>'
    for i, cx in enumerate(xs):
        b += f'<path d="M{cx - 50} {G} V162 H{cx + 50} V{G} H{cx + 34} V210 A34 34 0 0 0 {cx - 34} 210 V{G} Z" fill="{STONE}" {S}/>'
        b += f'<rect x="{cx + 34}" y="162" width="7" height="{G - 162}" fill="url(#h)"/>' if i < 4 else ''
    b += keystone(330, 210, 48, 34, fill=RED)
    # data packets flowing along the channel
    b += ''.join(f'<rect x="{110 + i * 58}" y="139" width="22" height="9" rx="3" fill="{BLUE}" opacity="{.5 + (i % 3) * .2:.2f}"/>' for i in range(8))
    # service boxes standing on the channel
    for i, (x, label_w) in enumerate(((96, 40), (276, 52), (456, 44))):
        b += window(x, 60, 108, 66)
        b += f'<rect x="{x + 10}" y="{86}" width="18" height="18" rx="4" fill="{STONE}" stroke="{BLUE}" stroke-width="1.25"/>' + text_lines(x + 36, 90, (label_w, 30), gap=11)
        b += f'<line x1="{x + 54}" y1="126" x2="{x + 54}" y2="134" {S1}/>'
    return svg('Mikroservis geliştirme: servis pencerelerini birbirine bağlayan, üzerinde veri paketleri akan Roma su kemeri', b)


# ============ 10. Headless CMS — one content scroll feeding web, mobile and kiosk ============
def headless():
    b = ground() + mosaic()
    # central column with a content scroll on top
    b += plinth(250, 140) + column(298, 168, G - 26, w=44, flutes=4)
    b += f'<rect x="254" y="80" width="132" height="10" rx="5" fill="{SHADE}" {S}/><rect x="262" y="90" width="116" height="62" fill="#fff" {S}/><rect x="254" y="152" width="132" height="10" rx="5" fill="{SHADE}" {S}/>'
    b += ''.join(f'<rect x="272" y="{98 + i * 16}" width="12" height="10" rx="2" fill="{BLUE}" opacity="{.5 + i * .2:.2f}"/>' + bar(292, 103 + i * 16, 70 - i * 12, INK, .45, 2) for i in range(3))
    # outputs: web (left), phone (right), kiosk/watch (far right)
    b += window(54, 96, 150, 110) + f'<rect x="66" y="122" width="126" height="30" rx="4" fill="{STONE}"/>' + text_lines(66, 166, (110, 86, 98), gap=11)
    b += phone(456, 92, 66, 128) + f'<rect x="464" y="112" width="50" height="34" rx="4" fill="{STONE}"/>' + text_lines(464, 160, (44, 34, 40), gap=11)
    b += f'<rect x="548" y="140" width="48" height="58" rx="10" fill="#fff" {S}/><rect x="560" y="128" width="24" height="12" rx="3" fill="{SHADE}" {S1}/><rect x="560" y="198" width="24" height="12" rx="3" fill="{SHADE}" {S1}/>' + text_lines(558, 160, (28, 20), gap=11, c=BLUE, op=.9)
    # API lines, the hub node is red
    b += f'<circle cx="320" cy="122" r="0" fill="none"/>'
    for (x2, y2) in ((204, 150), (456, 156), (548, 168)):
        b += f'<path d="M{386 if x2 > 320 else 254} 122 C{(386 if x2 > 320 else 254) + (30 if x2 > 320 else -30)} 122 {x2 + (-30 if x2 > 320 else 30)} {y2} {x2} {y2}" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-dasharray="4 4"/>'
    b += f'<circle cx="320" cy="68" r="8" fill="{RED}" {S1}/><line x1="320" y1="76" x2="320" y2="80" {S1}/>'
    return svg('Headless CMS çözümleri: sütun üzerindeki içerik parşömeni web sayfasını, telefonu ve ekranı besliyor', b)


# ============ 11. Ürün tasarımı — divider over wireframes, golden-ratio arc ============
def product_design():
    b = ground() + mosaic() + plinth(140, 360)
    b += column(166, 92, G - 26) + column(448, 92, G - 26)
    b += f'<rect x="154" y="74" width="332" height="16" fill="{SHADE}" {S}/>'
    # three wireframe screens: sketch -> wireframe -> UI
    for i, x in enumerate((214, 288, 362)):
        b += phone(x, 108, 64, 134)
        if i == 0:
            b += f'<rect x="{x + 8}" y="126" width="48" height="30" rx="3" fill="none" stroke="{HATCH}" stroke-width="1.25" stroke-dasharray="3 3"/>' + ''.join(bar(x + 8, 168 + k * 12, (40, 30, 44, 24)[k], HATCH, 1, 2) for k in range(4))
        elif i == 1:
            b += f'<rect x="{x + 8}" y="126" width="48" height="30" rx="3" fill="none" stroke="{BLUE}" stroke-width="1.25"/><path d="M{x + 8} 126 l48 30 M{x + 56} 126 l-48 30" stroke="{HATCH}" stroke-width="1"/>' + text_lines(x + 8, 168, (40, 30, 44), gap=12, op=.35)
        else:
            b += f'<rect x="{x + 8}" y="126" width="48" height="30" rx="4" fill="{STONE}"/><circle cx="{x + 22}" cy="141" r="7" fill="{BLUE}" opacity=".8"/>' + text_lines(x + 8, 168, (40, 30, 44), gap=12) + f'<rect x="{x + 8}" y="210" width="48" height="14" rx="7" fill="{BLUE}"/>'
    b += f'<path d="M280 176 h6 M354 176 h6" stroke="{BLUE}" stroke-width="1.5" stroke-linecap="round"/>'
    # divider (compass) on the left with red pivot, colour swatches on the right
    b += f'<path d="M96 120 L72 236 M96 120 L132 230" fill="none" {S}/><circle cx="96" cy="117" r="6" fill="{RED}" {S1}/>'
    b += f'<path d="M66 246 A70 70 0 0 0 140 238" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-dasharray="3 4"/>'
    for i, c in enumerate((INK, BLUE, HATCH, STONE)):
        b += f'<rect x="{512 + (i % 2) * 34}" y="{150 + (i // 2) * 34}" width="28" height="28" rx="5" fill="{c}" {S1}/>'
    return svg('Ürün tasarımı: sütunlar arasında eskizden arayüze üç ekran, pergel ve renk paleti', b)


SETS = {
    'service-mobile': mobile, 'service-web-ecommerce': web_ecommerce, 'service-web-app': web_app,
    'service-payment': payment, 'service-pos': pos, 'service-ai': ai, 'service-saas': saas,
    'service-mvp': mvp, 'service-microservice': microservice, 'service-headless': headless,
    'service-product-design': product_design,
}
if __name__ == '__main__':
    for name, fn in SETS.items():
        open(os.path.join(OUT, f'{name}.svg'), 'w').write(fn())
    print('ok', len(SETS))
