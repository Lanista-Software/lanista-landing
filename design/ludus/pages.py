"""Ludus illustrations for the e-Dönüşüm hub, local pages and guides — see docs/illustration-style.md.

Heroes are 480 x 360 (ground y = 312); section images are 640 x 320 (ground y = 284).
One red element per image. Dashed "data" lines and seals move with a CSS animation
that only runs under prefers-reduced-motion: no-preference (works inside <img>).
Run: python3 design/ludus/pages.py  → design/ludus/out/page-*.svg, section-*.svg
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
import services as L  # noqa: E402  (shared drawing helpers)

INK, STONE, SHADE, HATCH, BLUE, RED, PALE = L.INK, L.STONE, L.SHADE, L.HATCH, L.BLUE, L.RED, L.PALE
S, S1 = L.S, L.S1
OUT = L.OUT

ANIM = '''<style>
@media (prefers-reduced-motion: no-preference) {
  .flow { animation: flow 1.6s linear infinite; }
  .pulse { transform-box: fill-box; transform-origin: center; animation: pulse 2.4s ease-in-out infinite; }
  .float { animation: float 4s ease-in-out infinite; }
  .wave { animation: wave 5s ease-in-out infinite alternate; }
}
@keyframes flow { to { stroke-dashoffset: -16; } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes wave { from { transform: translateX(-6px); } to { transform: translateX(6px); } }
</style>'''


def canvas(w, h, g):
    L.W, L.H, L.G = w, h, g


def svg(title, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {L.W} {L.H}" role="img">
<title>{title}</title>
{ANIM}
<defs><pattern id="h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="{HATCH}" stroke-width="1.5"/></pattern></defs>
<rect width="{L.W}" height="{L.H}" fill="#fff"/>
{body}
</svg>
'''


def flow(d):
    return f'<path class="flow" d="{d}" fill="none" stroke="{BLUE}" stroke-width="1.5" stroke-dasharray="4 4"/>'


def invoice(x, y, w=110, h=140, seal=True):
    """A white invoice sheet: folded corner, blue header, rows, total, round stamp. Scales with w/h."""
    k = w / 110
    f = 16 * k
    out = f'<path d="M{x} {y} H{x + w - f:.1f} L{x + w} {y + f:.1f} V{y + h} H{x} Z" fill="#fff" {S}/>'
    out += f'<path d="M{x + w - f:.1f} {y} V{y + f:.1f} H{x + w}" fill="{STONE}" {S1}/>'
    out += L.bar(x + 12 * k, y + 18 * k, 40 * k, BLUE, 1, 4 * k)
    out += L.text_lines(x + 12 * k, y + 32 * k, (30 * k, 46 * k), gap=9 * k, sw=1.5)
    rows = max(1, min(4, int((h - 92 * k) / (14 * k))))
    for i in range(rows):
        yy = y + 58 * k + i * 14 * k
        out += f'<line x1="{x + 10 * k:.1f}" y1="{yy + 7 * k:.1f}" x2="{x + w - 10 * k:.1f}" y2="{yy + 7 * k:.1f}" stroke="{SHADE}" stroke-width="1"/>'
        out += L.bar(x + 12 * k, yy, (44, 36, 50, 30)[i] * k, INK, .4, 2) + L.bar(x + w - 34 * k, yy, 20 * k, INK, .4, 2)
    out += f'<rect x="{x + w - 52 * k:.1f}" y="{y + h - 26 * k:.1f}" width="{42 * k:.1f}" height="{14 * k:.1f}" rx="3" fill="{BLUE}"/>'
    if seal:
        out += f'<g class="pulse"><circle cx="{x + 30 * k:.1f}" cy="{y + h - 20 * k:.1f}" r="{12 * k:.1f}" fill="none" stroke="{BLUE}" stroke-width="2"/><circle cx="{x + 30 * k:.1f}" cy="{y + h - 20 * k:.1f}" r="{7 * k:.1f}" fill="none" stroke="{BLUE}" stroke-width="1.25"/></g>'
    return out


def paper_stack(x, y, w=70, h=88, n=3):
    out = ''
    for i in range(n - 1, -1, -1):
        out += f'<rect x="{x + i * 6}" y="{y - i * 6}" width="{w}" height="{h}" rx="2" fill="{"#fff" if i == 0 else STONE}" {S1}/>'
    out += L.text_lines(x + 10, y + 16, (40, 30, 46, 24, 36), gap=12, sw=1.5)
    return out


def archive(x, y, w=86, rows=3):
    """Stone archive cabinet (the integrator's storage)."""
    out = f'<rect x="{x}" y="{y}" width="{w}" height="{rows * 32 + 10}" rx="4" fill="{STONE}" {S}/>'
    out += f'<rect x="{x + w - 9}" y="{y}" width="8" height="{rows * 32 + 10}" fill="url(#h)"/>'
    for r in range(rows):
        yy = y + 8 + r * 32
        out += f'<rect x="{x + 8}" y="{yy}" width="{w - 22}" height="26" rx="3" fill="#fff" {S1}/>'
        out += f'<rect x="{x + w / 2 - 16}" y="{yy + 10}" width="18" height="5" rx="2.5" fill="{BLUE}"/>'
    return out


def mountains(peaks, base, fill=PALE):
    pts = ' '.join(f'{x},{y}' for x, y in peaks)
    return f'<polygon points="{peaks[0][0]},{base} {pts} {peaks[-1][0]},{base}" fill="{fill}" {S1}/>'


def waves(x0, x1, y, n=3, gap=10):
    out = '<g class="wave">'
    for i in range(n):
        yy = y + i * gap
        d = f'M{x0} {yy}' + ''.join(f' q10 -5 20 0 t20 0' for _ in range(int((x1 - x0) / 40)))
        out += f'<path d="{d}" fill="none" stroke="{BLUE if i == 0 else HATCH}" stroke-width="1.5" stroke-linecap="round" opacity="{1 - i * .25:.2f}"/>'
    return out + '</g>'


def pin(x, y, c=BLUE):
    return f'<g class="float"><path d="M{x} {y} c-10 -14 -14 -20 -14 -27 a14 14 0 0 1 28 0 c0 7 -4 13 -14 27 z" fill="{c}" {S1}/><circle cx="{x}" cy="{y - 27}" r="5" fill="#fff"/></g>'


def laurel(cx, cy, r):
    out = f'<path d="M{cx - r * math.cos(math.radians(70)):.1f} {cy + r * math.sin(math.radians(70)):.1f} A{r} {r} 0 1 1 {cx + r * math.cos(math.radians(70)):.1f} {cy + r * math.sin(math.radians(70)):.1f}" fill="none" {S1}/>'
    for t in list(range(115, 250, 26)) + list(range(-65, 70, 26)):
        a = math.radians(t)
        x, y = cx + r * math.cos(a), cy + r * math.sin(a)
        for off in (-7, 7):
            lx, ly = x + off * math.cos(a), y + off * math.sin(a)
            out += f'<ellipse cx="{lx:.1f}" cy="{ly:.1f}" rx="8" ry="3.5" transform="rotate({t + 90 + (25 if off > 0 else -25)} {lx:.1f} {ly:.1f})" fill="{SHADE}" {S1}/>'
    return out


def window_table(x, y, w, h):
    """Desktop accounting program: window with a grid table."""
    out = L.window(x, y, w, h)
    for r in range(5):
        yy = y + 26 + r * ((h - 34) / 5)
        out += f'<line x1="{x + 8}" y1="{yy:.0f}" x2="{x + w - 8}" y2="{yy:.0f}" stroke="{SHADE}" stroke-width="1"/>'
        out += L.bar(x + 12, yy + 7, 26, INK, .4, 2) + L.bar(x + w / 2, yy + 7, 22, BLUE if r == 1 else INK, 1 if r == 1 else .4, 2)
    out += f'<line x1="{x + w / 2 - 8}" y1="{y + 22}" x2="{x + w / 2 - 8}" y2="{y + h - 6}" stroke="{SHADE}" stroke-width="1"/>'
    return out


# ================= heroes 480 x 360 =================
def hero_edonusum():
    canvas(480, 360, 312)
    b = L.ground(24, 456) + L.mosaic(240, 20, (3, 9, 15)) + L.plinth(120, 240)
    b += L.arch(240, 312 - 26, 140, 92, 72)
    b += invoice(186, 116, 108, 150)
    # left: the paper stack it replaces; right: the archive it lands in
    b += paper_stack(34, 190)
    b += flow('M116 214 C134 214 150 200 176 200')
    b += archive(366, 178, 82, 3)
    b += flow('M304 200 C326 200 340 214 360 214')
    return svg('e-Dönüşüm: kemer altında elektronik fatura; solda kâğıt fatura yığını, sağda arşiv dolabı', b)


def hero_van():
    canvas(480, 360, 312)
    b = mountains([(20, 230), (90, 150), (130, 182), (176, 120), (236, 210)], 236)  # Erek
    b += waves(24, 456, 246, 3, 10)
    # Van Kalesi: rock with crenellated wall, on the right shore
    b += f'<path d="M330 236 l18 -40 h70 l22 40 z" fill="{SHADE}" {S}/>'
    b += f'<path d="M352 196 v-16 h8 v6 h8 v-6 h8 v6 h8 v-6 h8 v6 h8 v-6 h8 v16" fill="{STONE}" {S1}/>'
    b += L.ground(24, 456) + L.mosaic(240, 20, (2, 10, 17)) + L.plinth(130, 220)
    b += L.arch(240, 312 - 26, 150, 80, 62)
    # inside the gate: a district map with a pin
    b += f'<rect x="184" y="160" width="112" height="118" rx="6" fill="#fff" {S}/>'
    b += f'<path d="M190 200 h38 v26 h-38z M236 168 h54 v40 h-54z M190 234 h52 v38 h-52z M250 216 h40 v56 h-40z" fill="{STONE}" stroke="{SHADE}" stroke-width="1"/>'
    b += f'<path d="M184 212 C220 208 240 230 296 214" fill="none" stroke="{HATCH}" stroke-width="3"/>'
    b += pin(242, 222)
    return svg('Van: Erek Dağı ve göl önünde kemerli kapı; içinde ilçe haritası ve konum işareti, sağda Van Kalesi', b)


def hero_dogu():
    canvas(480, 360, 312)
    b = mountains([(16, 226), (70, 128), (118, 176), (170, 96), (232, 168), (290, 110), (350, 176), (404, 120), (464, 220)], 230)
    b += L.ground(16, 464) + L.mosaic(240, 22, (4, 11, 18))
    # aqueduct: three arches; data flows along the channel on top to the devices at both ends
    spring, ro, ri = 236, 42, 28
    top = spring - ro
    for i, cx in enumerate((156, 240, 324)):
        b += L.arch(cx, 312, spring, ro, ri, red=(i == 1), joints=False)
    b += f'<rect x="108" y="{top - 14}" width="264" height="14" fill="{STONE}" {S}/>'
    b += f'<rect x="104" y="{top - 32}" width="272" height="18" fill="{SHADE}" {S}/>'
    b += f'<line class="flow" x1="112" y1="{top - 23}" x2="368" y2="{top - 23}" stroke="{BLUE}" stroke-width="3" stroke-dasharray="6 10" stroke-linecap="round"/>'
    b += flow(f'M104 {top - 23} C84 {top - 23} 76 210 70 222')
    b += flow(f'M376 {top - 23} C396 {top - 23} 404 214 410 226')
    b += L.phone(42, 226, 50, 86) + L.text_lines(52, 248, (30, 22, 26), gap=10, sw=1.5) + f'<rect x="52" y="284" width="30" height="10" rx="5" fill="{BLUE}"/>'
    b += L.window(386, 232, 80, 62) + L.text_lines(394, 258, (52, 36), gap=11, sw=1.5)
    return svg('Doğu Anadolu: dağların önünde kemerli su kemeri; üstünden akan veri iki uçtaki telefona ve bilgisayara ulaşıyor', b)


def hero_ic():
    canvas(480, 360, 312)
    # Cappadocia fairy chimneys on the plateau
    for x, h, cap in ((40, 120, 22), (92, 150, 26), (390, 140, 24), (436, 104, 20)):
        b0 = 236
        cone = f'<path d="M{x - 22} {b0} C{x - 14} {b0 - h * .6:.0f} {x - 10} {b0 - h} {x} {b0 - h} C{x + 10} {b0 - h} {x + 14} {b0 - h * .6:.0f} {x + 22} {b0} Z" fill="{PALE}" {S1}/>'
        hat = f'<ellipse cx="{x}" cy="{b0 - h}" rx="{cap / 2 + 4}" ry="7" fill="{SHADE}" {S1}/>'
        b = (b if 'b' in locals() else '') + cone + hat
    b += f'<line x1="16" y1="236" x2="464" y2="236" {S1}/>'
    b += L.ground(16, 464) + L.mosaic(240, 20, (3, 9, 16)) + L.plinth(110, 260)
    # colonnade with entablature and a pennant (single red)
    for x in (140, 196, 258, 314):
        b += L.column(x, 150, 312 - 26)
    b += f'<rect x="124" y="126" width="232" height="14" fill="{SHADE}" {S}/><rect x="132" y="112" width="216" height="14" fill="{STONE}" {S}/>'
    b += f'<line x1="240" y1="112" x2="240" y2="76" {S}/><path d="M240 78 l26 8 -26 8 z" fill="{RED}" {S1}/>'
    b += L.window(204, 166, 72, 86) + L.text_lines(212, 196, (52, 40, 48), gap=12, sw=1.5) + f'<rect x="212" y="232" width="40" height="12" rx="6" fill="{BLUE}"/>'
    return svg('İç Anadolu: peri bacaları önünde sütunlu revak, ortada web uygulaması penceresi ve kırmızı flama', b)


# ================= section images 640 x 320 =================
def sec_program():
    canvas(640, 320, 284)
    b = L.ground() + L.mosaic() + L.plinth(200, 240)
    b += L.arch(320, 284 - 26, 150, 70, 52)
    b += window_table(40, 110, 170, 130)
    b += invoice(472, 96, 110, 146)
    b += flow('M210 176 C250 176 268 196 300 196 H340 C372 196 392 176 466 176')
    b += f'<g class="pulse"><circle cx="320" cy="196" r="10" fill="#fff" stroke="{BLUE}" stroke-width="2"/><path d="M315 196 h10 M320 191 v10" stroke="{BLUE}" stroke-width="2" stroke-linecap="round"/></g>'
    return svg('Programınızı değiştirmeden: muhasebe programı penceresi kemerin içinden e-faturaya bağlanıyor', b)


def sec_onsite():
    canvas(640, 320, 284)
    b = L.ground() + L.mosaic()
    # shop front: arcade with awning, counter, laptop; a pin over the door
    b += f'<rect x="150" y="110" width="340" height="174" fill="{STONE}" {S}/><rect x="482" y="110" width="8" height="174" fill="url(#h)"/>'
    b += f'<rect x="140" y="96" width="360" height="14" fill="{SHADE}" {S}/>'
    b += ''.join(f'<path d="M{160 + i * 40} 110 v16 a20 12 0 0 0 40 0 v-16" fill="{BLUE if i % 2 else "#fff"}" {S1}/>' for i in range(8))
    b += L.arch(320, 284, 196, 62, 46, red=True, joints=False)
    b += f'<rect x="186" y="180" width="80" height="64" rx="4" fill="#fff" {S}/>' + L.text_lines(196, 198, (54, 40, 58, 30), gap=11, sw=1.5)
    b += f'<rect x="374" y="180" width="80" height="64" rx="4" fill="#fff" {S}/>' + L.text_lines(384, 198, (54, 40, 58, 30), gap=11, sw=1.5)
    # laptop on the counter inside the door, a phone beside
    b += f'<rect x="290" y="228" width="60" height="38" rx="3" fill="#fff" {S}/><rect x="282" y="266" width="76" height="6" rx="2" fill="{SHADE}" {S1}/>'
    b += L.bar(298, 240, 40, BLUE, 1, 3) + L.text_lines(298, 252, (30,), sw=1.5)
    b += pin(320, 90)
    # left: Van Teknokent route — dashed road to the shop
    b += f'<rect x="38" y="200" width="70" height="60" rx="4" fill="#fff" {S}/>' + L.text_lines(48, 218, (44, 30, 38), gap=11, sw=1.5)
    b += flow('M108 236 C126 236 132 250 148 250')
    b += L.phone(536, 150, 56, 110) + L.text_lines(546, 178, (36, 28, 32), gap=12, sw=1.5) + f'<rect x="546" y="222" width="36" height="12" rx="6" fill="{BLUE}"/>'
    return svg('Yerinde kurulum: tenteli dükkân cephesinde kemerli kapı, tezgâhta dizüstü bilgisayar, üstte konum işareti', b)


def sec_advisor():
    canvas(640, 320, 284)
    b = L.ground() + L.mosaic() + L.plinth(170, 300)
    b += L.column(196, 96, 284 - 26) + L.column(418, 96, 284 - 26)
    b += L.pediment(180, 280, 82)
    # open ledger (wax tablets) on a lectern between the columns
    b += f'<path d="M270 258 l20 -40 h60 l20 40 z" fill="{SHADE}" {S}/>'
    b += f'<path d="M244 214 L320 196 L396 214 V140 L320 122 L244 140 Z" fill="#fff" {S}/><line x1="320" y1="122" x2="320" y2="196" {S}/>'
    b += ''.join(L.bar(256, 150 + i * 12 - i * 0, 50 - (i % 2) * 14, INK, .4, 2) for i in range(4))
    b += ''.join(L.bar(332, 140 + i * 12, 46 - (i % 2) * 12, BLUE if i == 0 else INK, 1 if i == 0 else .4, 2) for i in range(4))
    b += f'<circle cx="372" cy="186" r="9" fill="{RED}" {S1}/>'
    # laurel wreath (partnership) on the left, client files on the right
    b += laurel(100, 180, 40)
    b += paper_stack(500, 170, 64, 80)
    b += flow('M150 176 C176 176 210 168 240 168')
    b += flow('M400 176 C440 176 470 196 496 196')
    return svg('Mali müşavir iş ortaklığı: iki sütun arasında açık defter, solda defne, sağda mükellef dosyaları', b)


def sec_guide():
    """Guide (rehber) cover: scroll with a chart under an arch."""
    canvas(640, 320, 284)
    b = L.ground() + L.mosaic() + L.plinth(190, 260)
    b += L.arch(320, 284 - 26, 140, 100, 80)
    b += f'<rect x="250" y="112" width="140" height="128" rx="3" fill="#fff" {S}/>'
    b += f'<rect x="242" y="104" width="156" height="12" rx="6" fill="{STONE}" {S}/><rect x="242" y="236" width="156" height="12" rx="6" fill="{STONE}" {S}/>'
    b += L.bar(264, 132, 60, BLUE, 1, 4) + L.text_lines(264, 148, (110, 96, 104), gap=11, sw=1.5)
    for i, hh in enumerate((18, 30, 24, 40)):
        b += f'<rect x="{268 + i * 26}" y="{226 - hh}" width="14" height="{hh}" rx="2" fill="{BLUE}" opacity="{.45 + i * .15:.2f}"/>'
    b += f'<g class="float"><circle cx="520" cy="170" r="30" fill="none" stroke="{INK}" stroke-width="3"/><line x1="542" y1="192" x2="572" y2="222" stroke="{INK}" stroke-width="6" stroke-linecap="round"/></g>'
    b += paper_stack(60, 170, 70, 84)
    b += flow('M140 210 C170 210 196 196 236 196')
    return svg('Rehber: kemer altında grafikli parşömen, solda belgeler, sağda büyüteç', b)


def guide_threshold():
    """Threshold: rising bars on a plinth crossing a marked line; the bar over the line is red-capped."""
    canvas(640, 320, 284)
    b = L.ground() + L.mosaic() + L.plinth(150, 340)
    b += L.column(170, 110, 284 - 26) + L.column(444, 110, 284 - 26)
    b += f'<rect x="158" y="92" width="324" height="16" fill="{SHADE}" {S}/>'
    vals = (54, 78, 98, 124, 146)
    for i, hh in enumerate(vals):
        x = 220 + i * 44
        b += f'<rect x="{x}" y="{258 - hh}" width="28" height="{hh}" rx="3" fill="{BLUE if i < 4 else STONE}" opacity="{.45 + i * .12:.2f}" {S1}/>'
    b += f'<rect x="{220 + 4 * 44}" y="{258 - 146}" width="28" height="12" rx="3" fill="{RED}" {S1}/>'
    b += f'<line class="flow" x1="204" y1="140" x2="440" y2="140" stroke="{INK}" stroke-width="1.5" stroke-dasharray="6 6"/>'
    b += invoice(512, 120, 86, 120, seal=False)
    b += paper_stack(44, 170, 66, 80)
    return svg('Geçiş sınırı: sütunlar arasında yükselen ciro çubukları ve kesik çizgiyle gösterilen eşik', b)


def guide_kontor():
    """Credits: a stack of stone tokens feeding invoices through an arch, a counter window."""
    canvas(640, 320, 284)
    b = L.ground() + L.mosaic() + L.plinth(200, 240)
    b += L.arch(320, 284 - 26, 150, 70, 52)
    for i in range(5):
        b += f'<ellipse cx="110" cy="{250 - i * 16}" rx="40" ry="10" fill="{STONE if i % 2 else SHADE}" {S}/>'
    b += f'<g class="pulse"><ellipse cx="110" cy="170" rx="40" ry="10" fill="{BLUE}" {S}/></g>'
    b += flow('M152 200 C200 200 240 210 290 210')
    b += invoice(282, 160, 76, 96, seal=False)
    b += flow('M360 210 C400 210 430 190 470 190')
    b += L.window(470, 140, 120, 90) + f'<rect x="486" y="170" width="88" height="30" rx="4" fill="{PALE}" stroke="{BLUE}" stroke-width="1.25"/>' + L.text_lines(494, 186, (56,), c=BLUE, op=1, sw=4) + L.text_lines(486, 214, (60, 40), gap=9, sw=1.5)
    return svg('Kontör: taş jeton yığını kemerden geçen faturaya dönüşüyor, sağda kalan kontör sayacı', b)


def guide_switch():
    """Integrator change: two archive cabinets, invoices move from the old to the new through an arch."""
    canvas(640, 320, 284)
    b = L.ground() + L.mosaic() + L.plinth(200, 240)
    b += L.arch(320, 284 - 26, 150, 70, 52)
    b += archive(60, 150, 96, 3)
    b += archive(484, 150, 96, 3)
    b += f'<rect x="60" y="150" width="96" height="106" rx="4" fill="#fff" opacity=".45"/>'
    b += flow('M160 200 C220 200 250 196 320 196 C390 196 420 200 480 200')
    b += f'<g class="float">' + invoice(292, 150, 56, 76, seal=False) + '</g>'
    return svg('Entegratör değişikliği: eski arşiv dolabından yeni dolaba kemerin içinden taşınan faturalar', b)


def guide_compare():
    """e-Arşiv vs e-Fatura: one invoice splits at a fork, to a company mailbox and to a phone/e-mail."""
    canvas(640, 320, 284)
    b = L.ground() + L.mosaic() + L.plinth(240, 160)
    b += L.column(300, 150, 284 - 26, w=40, flutes=4)
    b += f'<rect x="286" y="128" width="68" height="14" fill="{SHADE}" {S}/>'
    b += f'<circle cx="320" cy="110" r="10" fill="{RED}" {S1}/>'
    b += invoice(52, 108, 96, 132)
    b += flow('M150 176 C220 176 250 150 300 150')
    b += flow('M340 150 C390 150 420 120 470 120')
    b += flow('M340 150 C390 150 420 210 470 210')
    # company mailbox (e-Fatura) and a phone with mail (e-Arşiv)
    b += f'<rect x="474" y="86" width="110" height="64" rx="6" fill="{STONE}" {S}/><path d="M474 92 l55 30 55 -30" fill="none" {S1}/>'
    b += L.phone(500, 176, 56, 96) + f'<rect x="510" y="200" width="36" height="24" rx="3" fill="#fff" stroke="{BLUE}" stroke-width="1.25"/><path d="M510 202 l18 11 18 -11" fill="none" stroke="{BLUE}" stroke-width="1.25"/>'
    return svg('e-Arşiv mi e-Fatura mı: tek fatura bir sütunda ikiye ayrılıyor; biri firma posta kutusuna, biri telefona gidiyor', b)


if __name__ == '__main__':
    files = {
        'page-e-donusum': hero_edonusum, 'page-van': hero_van, 'page-dogu-anadolu': hero_dogu, 'page-ic-anadolu': hero_ic,
        'section-program': sec_program, 'section-onsite': sec_onsite, 'section-advisor': sec_advisor, 'section-guide': sec_guide,
        'guide-threshold': guide_threshold, 'guide-kontor': guide_kontor, 'guide-switch': guide_switch, 'guide-compare': guide_compare,
    }
    for name, fn in files.items():
        with open(os.path.join(OUT, f'{name}.svg'), 'w') as fh:
            fh.write(fn())
        print(name)
