"""Lanista illustration set generator — see docs/illustration-style.md."""
import math, os, sys

OUT = os.path.join(os.path.dirname(__file__), 'out')  # upload the files to Studio media; not served from the repo
os.makedirs(OUT, exist_ok=True)

INK, STONE, SHADE, HATCH, BLUE, RED = '#10273E', '#EBF2FA', '#C2D9EF', '#9ABFE5', '#2F73B6', '#E31F30'
S = f'stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
S1 = f'stroke="{INK}" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"'


def svg(title, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360" role="img">
<title>{title}</title>
<defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="{HATCH}" stroke-width="1.5"/></pattern></defs>
<rect width="480" height="360" fill="#fff"/>
{body}
</svg>
'''


def ground():
    return f'<line x1="36" y1="312" x2="444" y2="312" {S}/>'


def plinth(x0=100, w=280):
    return (f'<rect x="{x0}" y="296" width="{w}" height="16" fill="{SHADE}" {S}/>'
            f'<rect x="{x0 + 24}" y="282" width="{w - 48}" height="14" fill="{STONE}" {S}/>'
            f'<rect x="{x0 + w - 18}" y="296" width="18" height="16" fill="url(#h)"/>')


def mosaic(x0=150, n=18, blue=(3, 8, 13)):
    out = []
    for i in range(n):
        fill = BLUE if i in blue else STONE
        out.append(f'<rect x="{x0 + i * 10}" y="320" width="8" height="8" rx="1" fill="{fill}" {S1}/>')
    return ''.join(out)


def arch(cx=240, base=282, spring=150, ro=90, ri=64, keystone=True, joints=True, built=1.0):
    """Roman arch: two piers + semicircular archivolt, red keystone."""
    xl, xr = cx - ro, cx + ro
    il, ir = cx - ri, cx + ri
    p = (f'<path d="M{xl} {base} V{spring} A{ro} {ro} 0 0 1 {xr} {spring} V{base} H{ir} V{spring} '
         f'A{ri} {ri} 0 0 0 {il} {spring} V{base} Z" fill="{STONE}" {S}/>')
    # hatched right pier face
    p += f'<rect x="{xr - 9}" y="{spring}" width="8" height="{base - spring}" fill="url(#h)"/>'
    # impost capitals
    p += f'<rect x="{xl - 6}" y="{spring - 4}" width="{ro - ri + 12}" height="8" fill="{SHADE}" {S}/>'
    p += f'<rect x="{ir - 6}" y="{spring - 4}" width="{ro - ri + 12}" height="8" fill="{SHADE}" {S}/>'
    if joints:
        for a in (28, 52, 76, 104, 128, 152):
            r = math.radians(a)
            x1, y1 = cx - ri * math.cos(r), spring - ri * math.sin(r)
            x2, y2 = cx - ro * math.cos(r), spring - ro * math.sin(r)
            p += f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" {S1}/>'
    if keystone:
        p += keystone_shape(cx, spring, ro, ri)
    return p


def keystone_shape(cx, spring, ro, ri, dy=0):
    a = math.radians(8)
    pts = [(cx - ro * math.sin(a) - 3, spring - ro * math.cos(a) - 6 + dy), (cx + ro * math.sin(a) + 3, spring - ro * math.cos(a) - 6 + dy),
           (cx + ri * math.sin(a), spring - ri * math.cos(a) + dy), (cx - ri * math.sin(a), spring - ri * math.cos(a) + dy)]
    return f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="{RED}" {S}/>'


def window(x, y, w, h, lines=3):
    """Software window: white, blue title dots, content lines."""
    out = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="#fff" {S}/>'
    out += f'<line x1="{x}" y1="{y + 14}" x2="{x + w}" y2="{y + 14}" {S1}/>'
    for i in range(3):
        out += f'<circle cx="{x + 9 + i * 8}" cy="{y + 7}" r="2" fill="{BLUE}"/>'
    return out


# ---------- 1. Araştırma ve Analiz — scroll with chart under an arch, loupe ----------
def research():
    b = ground() + plinth() + mosaic()
    b += arch()
    # scroll hanging in the arch opening
    b += f'<rect x="186" y="132" width="108" height="12" rx="6" fill="{SHADE}" {S}/>'
    b += f'<rect x="192" y="144" width="96" height="112" fill="#fff" {S}/>'
    b += f'<rect x="186" y="256" width="108" height="12" rx="6" fill="{SHADE}" {S}/>'
    for i, h in enumerate((26, 44, 34, 62, 52)):
        b += f'<rect x="{202 + i * 16}" y="{240 - h}" width="10" height="{h}" fill="{BLUE}" opacity="{0.45 + i * 0.11:.2f}"/>'
    b += f'<polyline points="204,226 220,206 236,214 252,180 268,188 284,162" fill="none" {S}/>'
    b += f'<line x1="200" y1="244" x2="282" y2="244" {S1}/>'
    # loupe, asymmetric, leaning on the right pier
    b += f'<circle cx="352" cy="232" r="26" fill="#fff" fill-opacity=".7" {S}/><circle cx="352" cy="232" r="19" fill="none" stroke="{BLUE}" stroke-width="1.25"/>'
    b += f'<line x1="370" y1="251" x2="398" y2="280" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>'
    return svg('Araştırma ve analiz: kemer altında grafikli parşömen ve büyüteç', b)


# ---------- 2. Tasarım ve Prototipleme — drafting tablet + divider (compass) ----------
def design():
    b = ground() + plinth() + mosaic()
    # two columns flanking (capital sketch feel)
    for x in (128, 324):
        b += f'<rect x="{x}" y="128" width="28" height="154" fill="{STONE}" {S}/>'
        for k in range(1, 4):
            b += f'<line x1="{x + k * 7}" y1="136" x2="{x + k * 7}" y2="276" {S1}/>'
        b += f'<rect x="{x - 6}" y="116" width="40" height="12" fill="{SHADE}" {S}/>'
        b += f'<rect x="{x + 20}" y="128" width="8" height="154" fill="url(#h)"/>'
    # entablature
    b += f'<rect x="116" y="102" width="248" height="14" fill="{STONE}" {S}/>'
    b += f'<polygon points="116,102 240,62 364,102" fill="{STONE}" {S}/>'
    b += f'<circle cx="240" cy="88" r="7" fill="{RED}" {S}/>'  # the single accent (pediment oculus)
    # drafting tablet (wireframe)
    b += f'<rect x="172" y="146" width="136" height="104" rx="4" fill="#fff" {S}/>'
    b += f'<rect x="184" y="158" width="112" height="18" rx="3" fill="none" stroke="{BLUE}" stroke-width="1.25" stroke-dasharray="4 3"/>'
    b += f'<rect x="184" y="184" width="52" height="54" rx="3" fill="none" stroke="{BLUE}" stroke-width="1.25" stroke-dasharray="4 3"/>'
    for i in range(3):
        b += f'<line x1="246" y1="{190 + i * 14}" x2="{296 - i * 12}" y2="{190 + i * 14}" stroke="{BLUE}" stroke-width="2" stroke-linecap="round"/>'
    b += f'<line x1="186" y1="186" x2="234" y2="236" stroke="{HATCH}" stroke-width="1.25"/><line x1="234" y1="186" x2="186" y2="236" stroke="{HATCH}" stroke-width="1.25"/>'
    # divider / compass drawing an arc over the tablet
    b += f'<path d="M262 130 L240 224 M262 130 L292 220" fill="none" {S}/>'
    b += f'<circle cx="262" cy="128" r="5" fill="{SHADE}" {S}/>'
    b += f'<path d="M226 238 A60 60 0 0 0 300 232" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-dasharray="3 4"/>'
    return svg('Tasarım ve prototipleme: sütunlar arasında tel kafes çizilen çizim tableti ve pergel', b)


# ---------- 3. Geliştirme — arch being built from code blocks, keystone being set ----------
def build():
    b = ground() + plinth() + mosaic()
    b += arch(keystone=False)
    # code lines on voussoirs? -> code panel inside opening
    b += window(190, 168, 100, 86)
    for i, (w, c) in enumerate(((54, BLUE), (70, INK), (40, BLUE), (62, INK), (30, BLUE))):
        b += f'<line x1="{200 + (8 if i in (1, 2, 3) else 0)}" y1="{194 + i * 12}" x2="{200 + w}" y2="{194 + i * 12}" stroke="{c}" stroke-width="2" stroke-linecap="round" opacity="{1 if c == BLUE else .55}"/>'
    # keystone hovering above, being lowered with a crane line
    b += keystone_shape(240, 150, 90, 64, dy=-34)
    b += f'<line x1="240" y1="8" x2="240" y2="22" {S1}/><path d="M232 22 h16" {S1}/>'
    b += f'<path d="M236 46 l4 6 l4 -6" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-linecap="round"/>'
    # blocks waiting on the ground (left)
    b += f'<rect x="56" y="290" width="30" height="22" fill="{STONE}" {S}/><rect x="70" y="270" width="30" height="20" fill="{STONE}" {S}/>'
    b += f'<line x1="62" y1="301" x2="80" y2="301" stroke="{BLUE}" stroke-width="2" stroke-linecap="round"/>'
    return svg('Yazılım geliştirme: kod penceresi taşıyan kemer, kilit taşı yerine indiriliyor', b)


# ---------- 4. Test — shield on plinth + test mosaic ----------
def test():
    b = ground() + plinth() + mosaic(blue=tuple(range(18)))
    # tiles all passed (blue); shield centre
    b += f'<path d="M240 92 L304 114 V176 C304 222 274 252 240 270 C206 252 176 222 176 176 V114 Z" fill="{STONE}" {S}/>'
    b += f'<path d="M240 92 L304 114 V176 C304 222 274 252 240 270 Z" fill="url(#h)"/>'
    b += f'<path d="M240 108 L290 125 V176 C290 214 266 238 240 252 C214 238 190 214 190 176 V125 Z" fill="#fff" {S1}/>'
    b += f'<polyline points="214,178 232,198 268,156" fill="none" stroke="{BLUE}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
    b += f'<path d="M240 270 v12" {S}/>'
    # test grid tablet on the right (asymmetric) with one red = the caught bug
    b += f'<rect x="338" y="196" width="78" height="86" rx="4" fill="#fff" {S}/>'
    for r in range(4):
        for c in range(4):
            fill = RED if (r, c) == (2, 1) else BLUE
            op = 1 if fill == RED else .7
            b += f'<rect x="{348 + c * 16}" y="{206 + r * 17}" width="11" height="11" rx="2" fill="{fill}" opacity="{op}"/>'
    # torch-less left: magnifier-free; checklist scroll
    b += f'<rect x="66" y="214" width="70" height="68" rx="4" fill="#fff" {S}/>'
    for i in range(4):
        b += f'<polyline points="{76},{230 + i * 13} {80},{234 + i * 13} {86},{226 + i * 13}" fill="none" stroke="{BLUE}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>'
        b += f'<line x1="94" y1="{230 + i * 13}" x2="{124 - (i % 2) * 10}" y2="{230 + i * 13}" {S1}/>'
    return svg('Test: kaide üzerinde onay işaretli kalkan, test sonuç ızgarası ve kontrol listesi', b)


# ---------- 5. Dağıtım — triumphal arch, road through it, laurel ----------
def deploy():
    b = ground() + mosaic(x0=60, n=36, blue=(4, 11, 18, 25, 32))
    # triumphal arch: wide attic + central opening
    b += f'<rect x="120" y="96" width="240" height="186" fill="{STONE}" {S}/>'
    b += f'<rect x="120" y="70" width="240" height="26" fill="{SHADE}" {S}/>'
    b += f'<rect x="108" y="282" width="264" height="14" fill="{SHADE}" {S}/><rect x="96" y="296" width="288" height="16" fill="{STONE}" {S}/>'
    b += f'<path d="M196 282 V176 A44 44 0 0 1 284 176 V282 Z" fill="#fff" {S}/>'
    b += f'<rect x="350" y="96" width="9" height="186" fill="url(#h)"/>'
    b += keystone_shape(240, 176, 58, 44)
    # side panels with columns
    for x in (138, 322):
        b += f'<rect x="{x}" y="120" width="20" height="162" fill="{STONE}" {S1}/>'
    # road through the arch to a deployed window (perspective lines)
    b += f'<polygon points="222,282 258,282 300,312 180,312" fill="{STONE}" {S1}/>'
    b += window(206, 186, 68, 58)
    b += f'<line x1="214" y1="216" x2="252" y2="216" stroke="{BLUE}" stroke-width="2" stroke-linecap="round"/><line x1="214" y1="228" x2="240" y2="228" stroke="{BLUE}" stroke-width="2" stroke-linecap="round" opacity=".6"/>'
    # laurel on the attic
    for side in (-1, 1):
        for i in range(5):
            x = 240 + side * (12 + i * 11)
            y = 83 - i * 1.5
            b += f'<ellipse cx="{x}" cy="{y}" rx="6" ry="3" transform="rotate({side * (20 + i * 6)} {x} {y})" fill="{BLUE}" opacity=".85"/>'
    b += f'<path d="M168 83 Q240 98 312 83" fill="none" {S1}/>'
    return svg('Proje dağıtımı: yolun geçtiği zafer takı, içinde yayına alınmış uygulama, defne çelengi', b)


# ---------- 6. Destek ve Bakım — column with torch + pulse line ----------
def support():
    b = ground() + plinth(150, 180) + mosaic()
    b += f'<rect x="216" y="120" width="48" height="162" fill="{STONE}" {S}/>'
    for k in range(1, 6):
        b += f'<line x1="{216 + k * 8}" y1="130" x2="{216 + k * 8}" y2="274" {S1}/>'
    b += f'<rect x="256" y="120" width="8" height="162" fill="url(#h)"/>'
    b += f'<rect x="204" y="106" width="72" height="14" fill="{SHADE}" {S}/>'
    # brazier bowl + flame (the single red)
    b += f'<path d="M210 106 Q240 120 270 106 L262 92 H218 Z" fill="{STONE}" {S}/>'
    b += f'<path d="M240 30 C258 52 262 66 252 82 C262 76 264 70 262 64 C272 78 266 92 254 92 H226 C214 92 208 78 218 64 C216 72 220 78 226 82 C218 62 228 48 240 30 Z" fill="{RED}" {S}/>'
    # pulse / uptime line across a monitor panel on the left
    b += f'<rect x="56" y="168" width="128" height="80" rx="6" fill="#fff" {S}/>'
    b += f'<polyline points="66,214 92,214 100,196 110,232 120,206 128,214 174,214" fill="none" stroke="{BLUE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    b += f'<line x1="66" y1="236" x2="110" y2="236" {S1}/>'
    # gear / maintenance on the right
    cx, cy = 352, 228
    teeth = ''.join(f'<rect x="{cx - 5}" y="{cy - 40}" width="10" height="12" rx="2" fill="{STONE}" {S1} transform="rotate({a} {cx} {cy})"/>' for a in range(0, 360, 45))
    b += teeth + f'<circle cx="{cx}" cy="{cy}" r="30" fill="{STONE}" {S}/><circle cx="{cx}" cy="{cy}" r="11" fill="#fff" {S}/>'
    b += f'<path d="M{cx - 30} {cy} A30 30 0 0 0 {cx} {cy + 30} L{cx} {cy + 11} A11 11 0 0 1 {cx - 11} {cy} Z" fill="url(#h)"/>'
    return svg('Destek ve bakım: üzerinde meşale yanan sütun, kesintisiz çalışma grafiği ve dişli', b)


# ---------- Products ----------
def product_ledger():
    """Lanista Yedek Parça (was Hesap Takip): wax tablet ledger on a plinth, overdue rows, a coin stack."""
    b = ground() + plinth() + mosaic()
    b += arch()
    b += f'<rect x="194" y="150" width="92" height="118" rx="5" fill="#fff" {S}/>'
    rows = [(RED, 1), (HATCH, .9), (HATCH, .9), (BLUE, .8), (BLUE, .8)]
    for i, (c, o) in enumerate(rows):
        y = 166 + i * 19
        b += f'<rect x="204" y="{y}" width="8" height="8" rx="2" fill="{c if c != RED else "#fff"}" stroke="{INK if c == RED else c}" stroke-width="1.25"/>'
        b += f'<line x1="218" y1="{y + 4}" x2="{258 - (i % 2) * 10}" y2="{y + 4}" {S1}/><line x1="266" y1="{y + 4}" x2="276" y2="{y + 4}" stroke="{BLUE}" stroke-width="2" stroke-linecap="round"/>'
    # coin stack (right, asymmetric)
    for i in range(4):
        y = 300 - i * 9
        b += f'<ellipse cx="364" cy="{y}" rx="22" ry="6" fill="{STONE}" {S}/>'
    b += f'<ellipse cx="364" cy="264" rx="22" ry="6" fill="{SHADE}" {S}/>'
    return svg('Lanista Yedek Parça: kemer altında vade satırları olan hesap tableti ve madeni para yığını', b)


def product_hardware():
    """Lanista Nalbur (was Nalbur Takip): building blocks being stacked, trowel, plumb line, site ledger."""
    b = ground() + plinth() + mosaic()
    # wall of blocks
    for r in range(4):
        for c in range(4 - (r % 2)):
            x = 150 + c * 44 + (22 if r % 2 else 0)
            y = 260 - r * 26
            b += f'<rect x="{x}" y="{y}" width="40" height="22" fill="{STONE}" {S}/>'
    b += f'<rect x="304" y="208" width="8" height="74" fill="url(#h)"/>'
    # keystone-like red top block being placed (single red)
    b += f'<rect x="216" y="142" width="40" height="22" fill="{RED}" {S}/><line x1="236" y1="90" x2="236" y2="142" {S1}/>'
    # plumb line + bob on the right
    b += f'<line x1="344" y1="96" x2="344" y2="222" {S1}/><path d="M336 222 h16 l-8 16 z" fill="{SHADE}" {S}/>'
    b += f'<line x1="330" y1="96" x2="360" y2="96" {S}/>'
    # trowel left
    b += f'<path d="M84 270 L120 250 L128 266 Z" fill="{STONE}" {S}/><line x1="124" y1="258" x2="140" y2="246" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>'
    # site ledger slip
    b += f'<rect x="380" y="240" width="54" height="42" rx="3" fill="#fff" {S}/><line x1="388" y1="254" x2="424" y2="254" stroke="{BLUE}" stroke-width="2" stroke-linecap="round"/><line x1="388" y1="266" x2="414" y2="266" {S1}/>'
    return svg('Lanista Nalbur: üst üste dizilen yapı taşları, çekül, mala ve şantiye fişi', b)


def product_till():
    """Kasa Takip: Roman strongbox (arca) with a day ledger and channel bars."""
    b = ground() + plinth() + mosaic()
    b += f'<rect x="170" y="190" width="140" height="92" rx="4" fill="{STONE}" {S}/>'
    b += f'<path d="M170 190 Q240 150 310 190" fill="{SHADE}" {S}/>'
    b += f'<rect x="300" y="196" width="9" height="86" fill="url(#h)"/>'
    for x in (186, 280):
        b += f'<line x1="{x}" y1="196" x2="{x}" y2="276" {S1}/>'
    b += f'<circle cx="240" cy="226" r="11" fill="{RED}" {S}/><rect x="237" y="226" width="6" height="14" rx="2" fill="{INK}"/>'
    # day-sheet above with channel bars
    b += f'<rect x="196" y="72" width="88" height="70" rx="4" fill="#fff" {S}/>'
    for i, w in enumerate((60, 42, 30, 18)):
        b += f'<rect x="206" y="{84 + i * 13}" width="{w}" height="7" rx="2" fill="{BLUE}" opacity="{1 - i * .18:.2f}"/>'
    b += f'<line x1="240" y1="142" x2="240" y2="160" {S1}/>'
    # coins spilling right
    for i, (x, y) in enumerate(((352, 300), (378, 302), (366, 290))):
        b += f'<ellipse cx="{x}" cy="{y}" rx="14" ry="5" fill="{STONE}" {S}/>'
    return svg('Kasa Takip: kanal kanal gelir çubuklu gün sayfası ve Roma kasası', b)


# ---------- Products (2026-11-27): one function per Lanista product card ----------
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import services as L  # noqa: E402  (bar, text_lines, phone, column, pediment)
import pages as P  # noqa: E402  (invoice, paper_stack, window_table, flow)


def tick(cx, cy, r=10, sw=2):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#fff" stroke="{BLUE}" stroke-width="1.5"/>'
            f'<polyline points="{cx - r * .45:.1f},{cy:.1f} {cx - r * .1:.1f},{cy + r * .38:.1f} {cx + r * .48:.1f},{cy - r * .38:.1f}" fill="none" stroke="{BLUE}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>')


def car(x0, x1, base, roof):
    """Flat side elevation of a car between x0..x1; wheels touch y=base."""
    w = x1 - x0
    wy = base - 12
    body_top = roof + (wy - roof) * .52
    f = lambda t: x0 + w * t
    out = (f'<path d="M{x0} {wy} V{body_top + 10:.1f} Q{x0} {body_top + 2:.1f} {f(.07):.1f} {body_top:.1f} L{f(.24):.1f} {body_top - 2:.1f} '
           f'L{f(.37):.1f} {roof} H{f(.66):.1f} L{f(.8):.1f} {body_top - 2:.1f} L{f(.94):.1f} {body_top:.1f} Q{x1} {body_top + 2:.1f} {x1} {body_top + 10:.1f} V{wy} Z" fill="{STONE}" {S}/>')
    out += f'<rect x="{f(.9):.1f}" y="{body_top + 2:.1f}" width="{w * .1 - 2:.1f}" height="{wy - body_top - 4:.1f}" fill="url(#h)"/>'
    out += (f'<path d="M{f(.27):.1f} {body_top - 3:.1f} L{f(.39):.1f} {roof + 5} H{f(.5):.1f} V{body_top - 3:.1f} Z" fill="{SHADE}" {S1}/>'
            f'<path d="M{f(.54):.1f} {body_top - 3:.1f} V{roof + 5} H{f(.64):.1f} L{f(.76):.1f} {body_top - 3:.1f} Z" fill="{SHADE}" {S1}/>')
    out += f'<line x1="{f(.52):.1f}" y1="{body_top + 4:.1f}" x2="{f(.52):.1f}" y2="{wy - 4}" {S1}/>'
    for t in (.2, .8):
        out += f'<circle cx="{f(t):.1f}" cy="{wy}" r="12" fill="{INK}"/><circle cx="{f(t):.1f}" cy="{wy}" r="5" fill="{STONE}"/>'
    return out


def product_efatura():
    """Lanista e-Fatura: approved invoice under the arch, the phone that issues it."""
    b = ground() + plinth() + mosaic() + arch()
    b += P.invoice(194, 132, 92, 128, seal=False)
    b += tick(220, 238, 11, 2.5)
    b += L.phone(384, 212, 52, 100)
    b += P.invoice(392, 232, 36, 44, seal=False).replace(f'stroke-width="2"', 'stroke-width="1.25"')
    b += tick(410, 288, 7, 1.75)
    return svg('Lanista e-Fatura: kemer altında onaylı fatura ve faturayı kesen telefon', b)


def product_kontor():
    """Lanista Kontör: a stack of stone tokens under a colonnade, top token red; e-documents beside it."""
    b = ground() + plinth() + mosaic()
    for x in (122, 330):
        b += L.column(x, 140, 282, w=28)
    b += f'<rect x="108" y="116" width="264" height="14" fill="{STONE}" {S}/><rect x="100" y="106" width="280" height="10" fill="{SHADE}" {S}/>'
    for i in range(8):
        y = 262 - i * 14
        b += f'<path d="M196 {y} V{y + 8} A44 10 0 0 0 284 {y + 8} V{y} Z" fill="{SHADE if i % 2 else STONE}" {S}/>'
        b += f'<ellipse cx="240" cy="{y}" rx="44" ry="10" fill="{RED if i == 7 else STONE}" {S}/>'
    b += f'<rect x="398" y="222" width="44" height="58" rx="2" fill="{STONE}" {S1}/>'
    b += P.invoice(392, 228, 46, 84, seal=False)
    return svg('Lanista Kontör: sütunlar arasında taş jeton yığını, yanında e-belgeler', b)


def product_kopru():
    """Lanista Köprü: an arched bridge carries data from the accounting program to the e-invoice."""
    b = ground() + plinth(150, 180) + mosaic()
    for x in (66, 362):  # abutments
        b += f'<rect x="{x}" y="146" width="52" height="166" fill="{STONE}" {S}/><rect x="{x + 43}" y="146" width="8" height="166" fill="url(#h)"/>'
        for y in (190, 234, 278):
            b += f'<line x1="{x}" y1="{y}" x2="{x + 52}" y2="{y}" {S1}/>'
    b += f'<rect x="160" y="146" width="160" height="136" fill="{STONE}" {S}/>'
    b += f'<path d="M192 282 V222 A48 48 0 0 1 288 222 V282 Z" fill="#fff"/>'
    b += arch(240, 282, 222, 70, 48)
    b += f'<rect x="56" y="134" width="372" height="12" fill="{SHADE}" {S}/>'
    b += P.window_table(44, 50, 96, 80)
    b += P.invoice(364, 58, 58, 76, seal=False)
    b += P.flow('M146 120 H350') + f'<polyline points="344,114 351,120 344,126" fill="none" stroke="{BLUE}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>'
    return svg('Lanista Köprü: muhasebe programını e-faturaya bağlayan kemerli köprü', b)


def product_onmuhasebe():
    """Lanista Ön Muhasebe: a balance on a column weighs cash against the bank; income/expense on a phone."""
    b = ground() + plinth() + mosaic()
    b += L.column(226, 150, 282, w=28)
    b += f'<polygon points="228,140 240,116 252,140" fill="{STONE}" {S}/>'
    b += f'<rect x="148" y="110" width="184" height="6" rx="3" fill="{SHADE}" {S}/>'
    for cx in (156, 324):
        b += f'<path d="M{cx} 116 L{cx - 30} 188 M{cx} 116 L{cx + 30} 188" fill="none" {S1}/>'
        b += f'<path d="M{cx - 32} 188 H{cx + 32} Q{cx} 212 {cx - 32} 188 Z" fill="{STONE}" {S}/>'
    for i in range(3):  # cash
        b += f'<ellipse cx="156" cy="{182 - i * 8}" rx="15" ry="5" fill="{STONE if i < 2 else SHADE}" {S1}/>'
    # bank: a small temple front
    b += f'<rect x="306" y="182" width="36" height="6" fill="{SHADE}" {S1}/>'
    for x in (312, 324, 336):
        b += f'<line x1="{x}" y1="172" x2="{x}" y2="182" {S1}/>'
    b += f'<polygon points="306,172 324,162 342,172" fill="{STONE}" {S1}/>'
    b += f'<circle cx="240" cy="113" r="6" fill="{RED}" {S}/>'
    # income / expense on the phone
    b += L.phone(388, 214, 50, 98)
    for i, (h, c) in enumerate(((34, BLUE), (22, INK), (42, BLUE))):
        b += f'<rect x="{397 + i * 12}" y="{288 - h}" width="8" height="{h}" rx="1.5" fill="{c}" opacity="{1 if c == BLUE else .45}"/>'
    return svg('Lanista Ön Muhasebe: sütun üstünde nakit ile bankayı tartan terazi ve gelir-gider ekranı', b)


def crate(x, y, w=44, h=36):
    out = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{STONE}" {S}/>'
    out += f'<rect x="{x + 5}" y="{y + 5}" width="{w - 10}" height="{h - 10}" fill="none" {S1}/>'
    out += f'<line x1="{x + 5}" y1="{y + h - 5}" x2="{x + w - 5}" y2="{y + 5}" {S1}/>'
    return out


def product_toptan():
    """Lanista Toptan Satış: crates stacked in a warehouse arch, a price tag, the dealer price list."""
    b = ground() + plinth(108, 264) + mosaic()
    b += arch(240, 282, 150, 100, 76)
    for x in (174, 218, 262):
        b += crate(x, 246)
    for x in (196, 240):
        b += crate(x, 210)
    b += crate(218, 174)
    # price tag hanging from the top crate
    b += f'<line x1="262" y1="180" x2="276" y2="190" {S1}/>'
    b += f'<path d="M274 188 L292 184 L300 200 L286 212 Z" fill="#fff" {S1}/><circle cx="279" cy="192" r="2" fill="{INK}"/>'
    b += f'<line x1="286" y1="196" x2="292" y2="204" stroke="{BLUE}" stroke-width="2" stroke-linecap="round"/>'
    # dealer price list
    b += L.window(382, 226, 58, 86)
    for i in range(4):
        b += L.bar(390, 256 + i * 13, 22, INK, .45, 2) + L.bar(418, 256 + i * 13, 14, BLUE, 1, 2.5)
    return svg('Lanista Toptan Satış: depo kemeri altında istif sandıklar, fiyat etiketi ve bayi fiyat listesi', b)


def product_otoservis():
    """Lanista Oto Servis: a car on a scissor lift in the workshop arch; the work order beside it."""
    b = ground() + plinth(108, 264) + mosaic()
    b += arch(240, 282, 150, 106, 84)
    # lift
    b += f'<path d="M186 248 L294 280 M294 248 L186 280" fill="none" {S}/>'
    b += f'<rect x="172" y="240" width="136" height="8" rx="2" fill="{SHADE}" {S}/><rect x="176" y="278" width="128" height="4" fill="{INK}"/>'
    b += car(170, 310, 240, 178)
    b += f'<rect x="171" y="214" width="14" height="8" rx="1.5" fill="#fff" {S1}/>'  # plate
    # work order
    b += f'<rect x="380" y="214" width="60" height="78" rx="4" fill="#fff" {S}/><rect x="398" y="208" width="24" height="10" rx="3" fill="{SHADE}" {S1}/>'
    for i in range(3):
        b += f'<polyline points="388,{232 + i * 16} 391,{235 + i * 16} 396,{229 + i * 16}" fill="none" stroke="{BLUE}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>'
        b += L.bar(402, 232 + i * 16, 28 - (i % 2) * 8, INK, .45, 2)
    b += f'<path d="M386 300 L432 300" {S1}/>'
    return svg('Lanista Oto Servis: kemerli atölyede lift üzerindeki araç, plaka ve iş emri', b)


def tyre(cx, cy, r=23):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{INK}"/><circle cx="{cx}" cy="{cy}" r="{r - 8}" fill="{STONE}" {S1}/>'
            f'<circle cx="{cx}" cy="{cy}" r="4" fill="{SHADE}" {S1}/>')


def product_lastik():
    """Lanista Lastik Oteli: tyres stored on racks under a temple front; QR label scanned by phone."""
    b = ground() + plinth() + mosaic()
    for x in (116, 338):
        b += L.column(x, 128, 282, w=26)
    b += L.pediment(104, 272, 106, oculus=True)
    b += f'<rect x="154" y="136" width="6" height="146" fill="{SHADE}" {S1}/><rect x="320" y="136" width="6" height="146" fill="{SHADE}" {S1}/>'
    for y, row in ((198, 172), (272, 246)):
        b += f'<rect x="154" y="{y}" width="172" height="6" fill="{SHADE}" {S1}/>'
        for cx in (194, 240, 286):
            b += tyre(cx, row - 1)
    # QR label on one tyre
    b += f'<line x1="240" y1="171" x2="252" y2="180" {S1}/><rect x="248" y="178" width="18" height="18" rx="2" fill="#fff" {S1}/>'
    for dx, dy in ((0, 0), (8, 0), (0, 8), (5, 5), (8, 8)):
        b += f'<rect x="{252 + dx}" y="{182 + dy}" width="3" height="3" fill="{BLUE}"/>'
    b += L.phone(386, 214, 50, 98)
    b += f'<rect x="398" y="240" width="26" height="26" rx="2" fill="none" stroke="{BLUE}" stroke-width="1.5"/>'
    for dx, dy in ((0, 0), (12, 0), (0, 12), (6, 6), (12, 12)):
        b += f'<rect x="{402 + dx}" y="{244 + dy}" width="6" height="6" fill="{BLUE}"/>'
    b += L.bar(398, 280, 26, INK, .45, 2)
    return svg('Lanista Lastik Oteli: sütunlu depoda raflarda saklanan lastikler, QR etiket ve telefon', b)


def product_galeri():
    """Lanista Oto Galeri: a car displayed in a colonnade, its vehicle card hanging above, the key beside."""
    b = ground() + plinth() + mosaic()
    for x in (110, 344):
        b += L.column(x, 132, 282, w=26)
    b += f'<rect x="96" y="108" width="288" height="14" fill="{STONE}" {S}/><rect x="88" y="98" width="304" height="10" fill="{SHADE}" {S}/>'
    b += f'<rect x="164" y="270" width="152" height="12" fill="{SHADE}" {S}/>'
    b += car(164, 316, 270, 206)
    # vehicle card (profit up) hanging from the architrave
    b += f'<line x1="224" y1="122" x2="224" y2="136" {S1}/><line x1="256" y1="122" x2="256" y2="136" {S1}/>'
    b += L.window(204, 136, 72, 52)
    b += f'<polyline points="214,178 230,170 242,174 264,160" fill="none" stroke="{BLUE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    b += f'<polyline points="257,159 264,160 262,167" fill="none" stroke="{BLUE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
    # key with red fob, lying on the ground right
    b += f'<rect x="388" y="296" width="26" height="16" rx="6" fill="{RED}" {S}/><circle cx="397" cy="304" r="2.5" fill="#fff"/>'
    b += f'<circle cx="420" cy="304" r="6" fill="none" {S1}/><path d="M426 304 H442 M436 304 V309 M441 304 V308" fill="none" {S}/>'
    return svg('Lanista Oto Galeri: sütunlar arasında sergilenen araç, kârı gösteren araç kartı ve anahtar', b)


def product_emlak():
    """Lanista Emlak: a classical house front with its key; the rent calendar with the due day in red."""
    b = ground() + plinth(110, 260) + mosaic()
    b += f'<rect x="154" y="160" width="172" height="122" fill="{STONE}" {S}/><rect x="317" y="160" width="8" height="122" fill="url(#h)"/>'
    b += f'<rect x="142" y="150" width="196" height="10" fill="{SHADE}" {S}/><polygon points="142,150 240,100 338,150" fill="{STONE}" {S}/>'
    b += f'<circle cx="240" cy="131" r="7" fill="#fff" {S1}/>'
    for x in (172, 226, 280):
        b += f'<rect x="{x}" y="172" width="28" height="30" rx="2" fill="#fff" {S1}/><line x1="{x + 14}" y1="172" x2="{x + 14}" y2="202" {S1}/>'
    for x in (172, 280):
        b += f'<rect x="{x}" y="222" width="28" height="34" rx="2" fill="#fff" {S1}/><line x1="{x}" y1="239" x2="{x + 28}" y2="239" {S1}/>'
    b += f'<path d="M222 282 V232 A18 18 0 0 1 258 232 V282 Z" fill="{SHADE}" {S}/><circle cx="251" cy="256" r="2" fill="{INK}"/>'
    # key hanging from the door handle
    b += f'<line x1="251" y1="258" x2="251" y2="264" {S1}/><circle cx="251" cy="268" r="4" fill="none" {S1}/><path d="M251 272 V280 M251 277 H255" fill="none" {S1}/>'
    # rent calendar
    b += f'<rect x="372" y="234" width="68" height="78" rx="4" fill="#fff" {S}/><rect x="372" y="234" width="68" height="16" rx="4" fill="{BLUE}"/>'
    b += f'<line x1="388" y1="228" x2="388" y2="240" {S}/><line x1="424" y1="228" x2="424" y2="240" {S}/>'
    for r in range(3):
        for c in range(4):
            b += f'<rect x="{380 + c * 14}" y="{258 + r * 16}" width="10" height="10" rx="2" fill="{RED if (r, c) == (1, 2) else STONE}" {S1 if (r, c) == (1, 2) else ""} stroke="{HATCH}" stroke-width="1"/>'.replace(f'{S1} stroke="{HATCH}" stroke-width="1"', S1)
    return svg('Lanista Emlak: alınlıklı bina, kapı anahtarı ve kira gününü işaretleyen takvim', b)


def product_gecis():
    """e-Dönüşüm geçiş hizmeti: invoices move from the paper archive, through the arch, to the phone."""
    b = ground() + plinth() + mosaic() + arch()
    b += P.paper_stack(48, 238, 62, 74)
    b += P.flow('M120 252 C150 252 170 222 200 222') + P.flow('M282 222 C320 222 340 252 374 252')
    b += f'<polyline points="368,246 375,252 368,258" fill="none" stroke="{BLUE}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>'
    b += P.invoice(202, 160, 76, 100, seal=False)
    b += L.phone(384, 212, 52, 100)
    b += P.invoice(393, 232, 34, 44, seal=False).replace('stroke-width="2"', 'stroke-width="1.25"')
    b += tick(410, 288, 7, 1.75)
    return svg('e-Dönüşüm geçiş hizmeti: kâğıt arşivdeki faturalar kemerin içinden telefona taşınıyor', b)


def product_yazilim():
    """Yazılım hizmetleri: a code window framed by a temple front; stone building blocks beside it."""
    b = ground() + plinth() + mosaic()
    for x in (110, 344):
        b += L.column(x, 138, 282, w=26)
    b += L.pediment(98, 284, 116)
    b += L.window(154, 150, 172, 118)
    rows = ((0, 60, BLUE), (14, 76, INK), (28, 48, BLUE), (28, 70, INK), (14, 40, INK), (0, 30, BLUE))
    for i, (ind, w, c) in enumerate(rows):
        b += L.bar(168 + ind, 182 + i * 13, w, c, 1 if c == BLUE else .5, 2.5)
    b += f'<rect x="{168 + 14 + 40 + 6}" y="{182 + 4 * 13 - 6}" width="4" height="12" fill="{RED}"/>'  # cursor
    b += f'<rect x="154" y="268" width="172" height="14" fill="{SHADE}" {S}/>'
    # building blocks, left
    b += f'<rect x="44" y="290" width="40" height="22" fill="{STONE}" {S}/><rect x="56" y="268" width="40" height="22" fill="{STONE}" {S}/>'
    b += f'<path d="M58 297 l-5 4 5 4 M70 297 l5 4 -5 4" fill="none" stroke="{BLUE}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>'
    return svg('Yazılım hizmetleri: alınlıklı sütunlar arasında kod penceresi ve yapı taşları', b)


SETS = {'product-ledger': product_ledger, 'product-hardware': product_hardware, 'product-till': product_till,
        'product-e-fatura': product_efatura, 'product-kontor': product_kontor, 'product-kopru': product_kopru,
        'product-on-muhasebe': product_onmuhasebe, 'product-toptan-satis': product_toptan, 'product-oto-servis': product_otoservis,
        'product-lastik-oteli': product_lastik, 'product-oto-galeri': product_galeri, 'product-emlak': product_emlak,
        'product-e-donusum-gecis': product_gecis, 'product-yazilim-hizmetleri': product_yazilim,
        'process-research': research, 'process-design': design, 'process-build': build,
        'process-test': test, 'process-deploy': deploy, 'process-support': support}
for name, fn in SETS.items():
    open(os.path.join(OUT, f'{name}.svg'), 'w').write(fn())
print('ok', len(SETS))
