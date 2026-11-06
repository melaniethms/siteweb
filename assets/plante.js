/* Melania fabricatrix — dessin organique de la plante, en SVG.
   Plante.dessin({ largeur, hauteur, sol, sommet, graine }) renvoie le SVG (chaîne) d'une plante entière :
   terre en strates, mycélium, racines, rhizomes, tige effilée, feuilles composées, fleurs, aigrette et graines.
   Utilisé par le parcours (fond animé) et pour générer l'emblème, l'icône et l'image de partage. */
(function (global) {
  const C = {
    ink: "#141414", paper: "#f6f1e7", cream: "#efdcc4",
    sage: "#8c9c7a", sage2: "#9eab8c", sage3: "#7a8b69", sageDark: "#5d6b4f",
    rust: "#b5522b", rust2: "#c4673f", rustDark: "#94401f"
  };

  function rng(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  const f = (n) => Math.round(n * 10) / 10;

  // Courbe lisse passant par tous les points (Catmull-Rom → Bézier)
  function smooth(pts, closed) {
    const n = pts.length;
    if (n < 2) return "";
    const P = (i) => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    const last = closed ? n : n - 1;
    for (let i = 0; i < last; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return closed ? d + "Z" : d;
  }

  // Forme pleine qui s'affine le long d'une ligne (tige, rameau, racine épaisse)
  function taper(pts, w0, w1) {
    const L = [], R = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      let dx = b[0] - a[0], dy = b[1] - a[1];
      const len = Math.hypot(dx, dy) || 1;
      dx /= len; dy /= len;
      const t = i / (pts.length - 1);
      const w = (w0 + (w1 - w0) * Math.pow(t, 0.8)) / 2;
      L.push([pts[i][0] - dy * w, pts[i][1] + dx * w]);
      R.push([pts[i][0] + dy * w, pts[i][1] - dx * w]);
    }
    return smooth(L.concat(R.reverse()), true);
  }

  // Ligne qui avance en tournant doucement (renvoie les points)
  function walk(x, y, ang, len, steps, curl, r, wiggle) {
    const pts = [[x, y]];
    const step = len / steps;
    for (let i = 0; i < steps; i++) {
      ang += curl / steps + (r() - 0.5) * (wiggle || 0);
      x += Math.cos(ang) * step; y += Math.sin(ang) * step;
      pts.push([x, y]);
    }
    return { pts, ang };
  }

  // Foliole : pointe, légèrement courbe, asymétrique, avec nervure
  function leaflet(x, y, ang, len, wid, bend, fill, r) {
    const N = 9, L = [], R = [], mid = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const along = len * t;
      const off = bend * len * t * t * 0.35;
      const mx = x + Math.cos(ang) * along - Math.sin(ang) * off;
      const my = y + Math.sin(ang) * along + Math.cos(ang) * off;
      mid.push([mx, my]);
      const w = wid * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.05)), 0.85) * (1 - 0.25 * t);
      const nx = -Math.sin(ang), ny = Math.cos(ang);
      L.push([mx + nx * w * (0.55 + r() * 0.06), my + ny * w * (0.55 + r() * 0.06)]);
      R.push([mx - nx * w * (0.45 + r() * 0.06), my - ny * w * (0.45 + r() * 0.06)]);
    }
    let o = `<path d="${smooth(L.concat(R.reverse()), true)}" fill="${fill}" stroke="${C.sageDark}" stroke-width="1.3"/>`;
    o += `<path d="${smooth(mid.slice(0, N), false)}" fill="none" stroke="${C.paper}" stroke-width="1" opacity=".6"/>`;
    return o;
  }

  // Feuille composée : rachis courbe, folioles alternes de taille décroissante, foliole terminale
  function compoundLeaf(x, y, ang, len, side, r) {
    const curl = side * (0.3 + r() * 1.1);
    const { pts } = walk(x, y, ang, len, 12, curl, r, 0.04);
    let o = `<path d="${taper(pts, 5, 1.2)}" fill="${C.sageDark}"/>`;
    const fills = [C.sage, C.sage2, C.sage3];
    const n = 3 + Math.floor(r() * 3);
    for (let k = 0; k < n; k++) {
      const u = 0.22 + (k / n) * 0.7;
      const idx = Math.min(pts.length - 2, Math.floor(u * (pts.length - 1)));
      const [px, py] = pts[idx], [qx, qy] = pts[idx + 1];
      const da = Math.atan2(qy - py, qx - px);
      const sz = (1 - u * 0.45);
      for (const s of [-1, 1]) {
        const shift = s === 1 ? 0 : 0.05;
        const j = Math.min(pts.length - 2, idx + (s === 1 ? 0 : 1));
        const a = da + s * (0.75 + r() * 0.35) + (shift ? 0.1 : 0);
        o += leaflet(pts[j][0], pts[j][1], a, (46 + r() * 18) * sz, (17 + r() * 6) * sz, s * (0.6 + r() * 0.6), fills[Math.floor(r() * 3)], r);
      }
    }
    const [ex, ey] = pts[pts.length - 1], [fx, fy] = pts[pts.length - 2];
    o += leaflet(ex, ey, Math.atan2(ey - fy, ex - fx), 40 + r() * 10, 14, curl * 0.6, C.sage, r);
    return o;
  }

  // Cercle tremblé (cœurs de fleurs, anneaux de vannerie)
  function wobble(cx, cy, rad, amp, r, n) {
    const pts = [];
    n = n || 16;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const rr = rad + (r() - 0.5) * amp;
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    return smooth(pts, true);
  }

  // Fleur-atelier : pétales rouille irréguliers, cœur d'étamines
  function flowerAtelier(x, y, size, r, rot) {
    let o = "";
    const n = 6 + Math.floor(r() * 2);
    for (let k = 0; k < n; k++) {
      const a = rot + (k / n) * Math.PI * 2 + (r() - 0.5) * 0.25;
      const len = size * (0.95 + r() * 0.35);
      const wid = size * (0.42 + r() * 0.12);
      const N = 8, L = [], R = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const w = wid * Math.pow(Math.sin(Math.PI * t), 0.7) * (0.6 + 0.4 * t);
        const along = size * 0.18 + len * t;
        const px = x + Math.cos(a) * along, py = y + Math.sin(a) * along;
        L.push([px - Math.sin(a) * w / 2, py + Math.cos(a) * w / 2]);
        R.push([px + Math.sin(a) * w / 2, py - Math.cos(a) * w / 2]);
      }
      o += `<path d="${smooth(L.concat(R.reverse()), true)}" fill="${k % 2 ? C.rust : C.rust2}" stroke="${C.rustDark}" stroke-width="1.2"/>`;
      o += `<path d="M${f(x + Math.cos(a) * size * 0.3)} ${f(y + Math.sin(a) * size * 0.3)} L${f(x + Math.cos(a) * (size * 0.3 + len * 0.6))} ${f(y + Math.sin(a) * (size * 0.3 + len * 0.6))}" stroke="${C.rustDark}" stroke-width="1" opacity=".5"/>`;
    }
    o += `<path d="${wobble(x, y, size * 0.32, size * 0.08, r)}" fill="${C.cream}" stroke="${C.ink}" stroke-width="1.6"/>`;
    for (let i = 0; i < 11; i++) {
      const a = r() * Math.PI * 2, d = r() * size * 0.22;
      o += `<circle cx="${f(x + Math.cos(a) * d)}" cy="${f(y + Math.sin(a) * d)}" r="${f(1.6 + r() * 2)}" fill="${C.ink}"/>`;
    }
    return o;
  }

  // Fleur tressée : cœur en fond de panier (spirale et montants courbes), sépales sauge
  function flowerTressee(x, y, size, r, rot) {
    let o = "";
    for (let k = 0; k < 5; k++) {
      const a = rot + (k / 5) * Math.PI * 2;
      o += leaflet(x + Math.cos(a) * size * 0.55, y + Math.sin(a) * size * 0.55, a, size * 0.75, size * 0.45, (r() - 0.5), C.sage2, r);
    }
    o += `<path d="${wobble(x, y, size * 0.72, size * 0.06, r, 20)}" fill="${C.cream}" stroke="${C.rustDark}" stroke-width="2"/>`;
    let sp = "";
    const turns = 4.2, N = 90;
    for (let i = 0; i <= N; i++) {
      const t = i / N, a = rot + t * turns * Math.PI * 2, rr = size * 0.66 * t + (r() - 0.5) * 1.2;
      sp += (i ? " L" : "M") + f(x + Math.cos(a) * rr) + " " + f(y + Math.sin(a) * rr);
    }
    o += `<path d="${sp}" fill="none" stroke="${C.rustDark}" stroke-width="2" stroke-linecap="round"/>`;
    for (let k = 0; k < 8; k++) {
      const a = rot + (k / 8) * Math.PI * 2;
      const p = [[x, y], [x + Math.cos(a + 0.15) * size * 0.35, y + Math.sin(a + 0.15) * size * 0.35], [x + Math.cos(a) * size * 0.7, y + Math.sin(a) * size * 0.7]];
      o += `<path d="${smooth(p, false)}" fill="none" stroke="${C.rust}" stroke-width="1.4" opacity=".8"/>`;
    }
    return o;
  }

  // Aigrette cotonneuse (linaigrette) : filaments fins
  function tuft(x, y, size, r) {
    let o = `<g fill="none" stroke-linecap="round">`;
    for (let i = 0; i < 70; i++) {
      const a = -Math.PI / 2 + (r() - 0.5) * 2.6;
      const len = size * (0.5 + r() * 0.6);
      const { pts } = walk(x, y, a, len, 5, (r() - 0.5) * 1.2, r, 0.15);
      o += `<path d="${smooth(pts, false)}" stroke="${i % 4 ? "#ffffff" : C.cream}" stroke-width="${f(1 + r() * 1.6)}"/>`;
    }
    o += `</g><path d="${wobble(x, y + 4, 6, 2, r, 8)}" fill="${C.sageDark}"/>`;
    return o;
  }

  // Racines ramifiées (récursif)
  function roots(x, y, ang, len, w, depth, r, out) {
    const { pts, ang: a2 } = walk(x, y, ang, len, 7, (r() - 0.5) * 0.9, r, 0.12);
    out.push(`<path d="${smooth(pts, false)}" fill="none" stroke="rgba(246,241,231,.85)" stroke-width="${f(w)}" stroke-linecap="round"/>`);
    if (depth <= 0 || w < 0.8) return;
    const nb = 1 + Math.floor(r() * 3);
    for (let i = 0; i < nb; i++) {
      const j = 2 + Math.floor(r() * (pts.length - 3));
      roots(pts[j][0], pts[j][1], a2 + (r() < 0.5 ? -1 : 1) * (0.5 + r() * 0.7), len * (0.5 + r() * 0.25), w * 0.6, depth - 1, r, out);
    }
  }

  function dessin(o) {
    const W = o.largeur, T = o.hauteur, ys = o.sol, yTop = o.sommet;
    const r = rng(o.graine || 11);
    const cx = W / 2;
    const soilBottom = o.fondSol || T;
    let soil = "", plant = "";

    // --- Terre en strates ondulées ---
    const bands = o.strates || 12;
    for (let i = 0; i <= bands; i++) {
      const t = i / bands;
      const y = ys + (soilBottom - ys) * t;
      const pts = [];
      for (let x = -40; x <= W + 40; x += 80) pts.push([x, y + (r() - 0.5) * 14]);
      const col = o.couleurSol ? o.couleurSol(t) : C.rust;
      soil += `<path d="${smooth(pts, false)} L${W + 40} ${soilBottom + 40} L-40 ${soilBottom + 40}Z" fill="${col}"/>`;
    }
    // Mycélium et débris de compost
    soil += '<g fill="none" stroke="#f6f1e7" stroke-linecap="round" opacity=".5">';
    const nMyc = o.mycelium === undefined ? 16 : o.mycelium;
    for (let i = 0; i < nMyc; i++) {
      const { pts } = walk(r() * W, ys + 30 + r() * (soilBottom - ys - 60), r() * Math.PI * 2, 260 + r() * 140, 12, (r() - 0.5) * 2, r, 0.5);
      soil += `<path d="${smooth(pts, false)}" stroke-width="1.2"/>`;
      for (let k = 2; k < pts.length - 1; k += 3) {
        const b = walk(pts[k][0], pts[k][1], r() * Math.PI * 2, 30 + r() * 30, 4, (r() - 0.5) * 2, r, 0.4);
        soil += `<path d="${smooth(b.pts, false)}" stroke-width=".8"/>`;
      }
    }
    soil += "</g>";
    for (let i = 0; i < (o.debris === undefined ? 50 : o.debris); i++) {
      const x = r() * W, y = ys + 20 + r() * (soilBottom - ys - 40);
      const c = [C.ink, C.sageDark, C.paper][i % 3];
      soil += `<path d="${wobble(x, y, 1.5 + r() * 2.5, 1.2, r, 6)}" fill="${c}" opacity=".45"/>`;
    }

    // --- Racines ---
    const rootOut = [];
    for (let i = 0; i < 5; i++) roots(cx + (i - 2) * 6, ys + 4, Math.PI / 2 + (i - 2) * 0.35, (o.racine || 150) * (0.8 + r() * 0.4), 5 - Math.abs(i - 2), 3, r, rootOut);
    plant += rootOut.join("");

    // --- Rhizomes : réseau horizontal avec renflements ---
    if (o.rhizomes !== false) {
      const yR = o.yRhizome || ys + (soilBottom - ys) * 0.5;
      const nodes = [];
      for (let i = 0; i < 9; i++) nodes.push([40 + i * (W - 80) / 8 + (r() - 0.5) * 60, yR + Math.sin(i * 1.3) * 45 + (r() - 0.5) * 60]);
      for (let i = 0; i < nodes.length - 1; i++) {
        const [x1, y1] = nodes[i], [x2, y2] = nodes[i + 1];
        const mid = [(x1 + x2) / 2 + (r() - 0.5) * 30, (y1 + y2) / 2 + (r() - 0.5) * 40];
        plant += `<path d="${taper([[x1, y1], mid, [x2, y2]], 6, 3)}" fill="#f6f1e7" opacity=".9"/>`;
        const sprout = walk(x1, y1, -Math.PI / 2 + (r() - 0.5) * 0.6, 26 + r() * 22, 4, (r() - 0.5), r, 0.2);
        plant += `<path d="${smooth(sprout.pts, false)}" fill="none" stroke="#f6f1e7" stroke-width="2" stroke-linecap="round"/>`;
      }
      nodes.forEach(([x, y]) => { plant += `<path d="${wobble(x, y, 7, 3, r, 9)}" fill="#f6f1e7"/>`; });
      plant += `<path d="${taper([[cx, ys + 6], [cx + 10, (ys + nodes[4][1]) / 2], nodes[4]], 6, 3)}" fill="#f6f1e7" opacity=".9"/>`;
    }

    // --- Mousse de surface : touffes courbes ---
    for (let x = -10; x < W + 10; x += 9) {
      const a = -Math.PI / 2 + (r() - 0.5) * 0.7;
      const s = walk(x, ys + 4, a, 9 + r() * 15, 3, (r() - 0.5) * 0.8, r, 0);
      plant += `<path d="${smooth(s.pts, false)}" fill="none" stroke="${r() > 0.6 ? C.rust : C.sage}" stroke-width="3" stroke-linecap="round"/>`;
    }

    // --- Tige effilée, légèrement sinueuse ---
    const stemPts = [];
    const N = 22;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      stemPts.push([cx + Math.sin(t * 2.3 + 0.2) * 58 * (0.35 + 0.65 * t) + (o.penche === undefined ? 30 : o.penche) * t * t + (r() - 0.5) * 5, ys + 6 + (yTop - ys - 6) * t]);
    }
    const stemX = (y) => {
      const t = Math.max(0, Math.min(1, (y - ys) / (yTop - ys)));
      const i = Math.min(N - 1, Math.floor(t * N));
      const u = t * N - i;
      return stemPts[i][0] * (1 - u) + stemPts[i + 1][0] * u;
    };

    // Rameaux fleuris (dessinés avant la tige pour qu'elle passe devant)
    const flowers = [];
    const nF = o.fleurs === undefined ? 5 : o.fleurs;
    for (let i = 0; i < nF; i++) {
      const t = 0.62 + (i / Math.max(1, nF)) * 0.3;
      const y = ys + (yTop - ys) * t;
      const side = i % 2 ? 1 : -1;
      const x = stemX(y);
      const reach = (o.portee || 260) * (0.6 + r() * 0.5);
      const br = walk(x, y, -Math.PI / 2 + side * (0.9 + r() * 0.3), reach, 10, -side * (0.9 + r() * 0.4), r, 0.05);
      plant += `<path d="${taper(br.pts, 6, 2.2)}" fill="${C.sageDark}"/>`;
      flowers.push([br.pts[br.pts.length - 1], i]);
      const mid = br.pts[4];
      plant += leaflet(mid[0], mid[1], br.ang - side * 1.2, 34 + r() * 10, 13, side * 0.6, C.sage2, r);
    }

    // Feuilles composées alternes
    const nL = o.feuilles === undefined ? 9 : o.feuilles;
    for (let i = 0; i < nL; i++) {
      const t = 0.1 + (i / nL) * 0.62 + (r() - 0.5) * 0.06;
      const y = ys + (yTop - ys) * t;
      const side = (i % 2 ? 1 : -1) * (r() < 0.12 ? -1 : 1);
      const ang = -Math.PI / 2 + side * (0.55 + r() * 0.95);
      plant += compoundLeaf(stemX(y), y, ang, (o.feuille || 210) * (0.6 + r() * 0.6) * (1 - t * 0.3), side, r);
    }

    plant += `<path d="${taper(stemPts, o.epaisseur || 16, 4)}" fill="${C.sageDark}"/>`;
    // Nœuds de la tige
    for (let i = 3; i < N; i += 4) plant += `<path d="${wobble(stemPts[i][0], stemPts[i][1], 3.2, 1, r, 8)}" fill="${C.sage}"/>`;

    flowers.forEach(([[fx, fy], i]) => {
      const size = (o.fleur || 34) * (0.85 + r() * 0.3);
      plant += i % 2 ? flowerAtelier(fx, fy, size, r, r() * 6.28) : flowerTressee(fx, fy, size * 0.9, r, r() * 6.28);
    });

    // Aigrette au sommet (dessinée à part, sans décalage)
    const tx = stemPts[N][0], ty = stemPts[N][1];
    let top = tuft(tx, ty, o.aigrette || 46, r);

    // Graines qui s'envolent : akènes à aigrette, quelques-unes en QR
    const nG = o.graines === undefined ? 22 : o.graines;
    for (let i = 0; i < nG; i++) {
      const gx = tx + 30 + r() * (o.envol || 460);
      const gy = ty - 30 - r() * (o.hautEnvol || 400);
      if (i % 6 === 5) {
        const s = 12, rot = (r() - 0.5) * 40;
        top += `<g transform="rotate(${f(rot)} ${f(gx)} ${f(gy)})"><rect x="${f(gx)}" y="${f(gy)}" width="${s}" height="${s}" fill="none" stroke="${C.ink}" stroke-width="2"/><rect x="${f(gx + 4)}" y="${f(gy + 4)}" width="4" height="4" fill="${C.ink}"/></g>`;
      } else {
        const a = -Math.PI / 2 - 0.5 + (r() - 0.5) * 0.6;
        top += `<path d="${wobble(gx, gy, 2.6, 0.8, r, 6)}" fill="${C.ink}"/>`;
        const bx = gx + Math.cos(a) * 14, by = gy + Math.sin(a) * 14;
        top += `<path d="M${f(gx)} ${f(gy)} L${f(bx)} ${f(by)}" stroke="${C.ink}" stroke-width="1"/>`;
        for (let k = 0; k < 7; k++) {
          const b = a + (k - 3) * 0.32;
          top += `<path d="M${f(bx)} ${f(by)} q${f(Math.cos(b) * 5)} ${f(Math.sin(b) * 5 - 2)} ${f(Math.cos(b) * 10)} ${f(Math.sin(b) * 10)}" fill="none" stroke="${C.ink}" stroke-width=".8"/>`;
        }
      }
    }

    const defs = `<defs>
      <filter id="riso" x="-3%" y="-3%" width="106%" height="106%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="onde"/>
        <feDisplacementMap in="SourceGraphic" in2="onde" scale="${o.tremble === undefined ? 5 : o.tremble}" xChannelSelector="R" yChannelSelector="G" result="main"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="4" result="bruit"/>
        <feColorMatrix in="bruit" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="alpha"/>
        <feComponentTransfer in="alpha" result="masque"><feFuncA type="discrete" tableValues="0 1 1 1 1 1 1 1"/></feComponentTransfer>
        <feComposite in="main" in2="masque" operator="in"/>
      </filter>
      <pattern id="trame" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
        <circle cx="5" cy="5" r="2" fill="${C.ink}"/>
      </pattern>
      <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6f1e7"/><stop offset=".55" stop-color="#eceee3"/><stop offset="1" stop-color="#dfe5d4"/>
      </linearGradient>
    </defs>`;

    const misreg = o.decalage === false ? "" :
      `<g class="misreg" transform="translate(5 4)" style="mix-blend-mode:multiply;opacity:.5">${plant
        .replace(/fill="[^"]*"/g, 'fill="none"')
        .replace(/stroke="[^"]*"/g, `stroke="${C.rust}"`)
        .replace(/stroke-width="[^"]*"/g, 'stroke-width="1.4"')
        .replace(/<path d="([^"]*)" fill="none"(?![^>]*stroke=)/g, `<path d="$1" fill="none" stroke="${C.rust}" stroke-width="1.4"`)}</g>`;

    // Croissance : la partie aérienne se dévoile de bas en haut (animation SVG, une seule fois)
    const dur = o.pousse ? (typeof o.pousse === "number" ? o.pousse : 3.2) : 0;
    const clip = dur ? `<clipPath id="croissance">
        <rect x="-60" y="${f(ys)}" width="${W + 120}" height="${f(T - ys + 60)}"/>
        <rect x="-60" y="${f(ys)}" width="${W + 120}" height="0">
          <animate attributeName="y" from="${f(ys)}" to="-60" dur="${dur}s" begin="0.2s" fill="freeze" calcMode="spline" keySplines=".35 0 .25 1" keyTimes="0;1"/>
          <animate attributeName="height" from="0" to="${f(ys + 60)}" dur="${dur}s" begin="0.2s" fill="freeze" calcMode="spline" keySplines=".35 0 .25 1" keyTimes="0;1"/>
        </rect>
      </clipPath>` : "";
    const vivant = `<g filter="url(#riso)">${plant}</g>` + misreg + `<g filter="url(#riso)">${top}</g>`;
    return defs.replace("</defs>", clip + "</defs>") +
      (o.ciel === false ? "" : `<rect x="0" y="0" width="${W}" height="${f(ys + 12)}" fill="url(#ciel)"/>`) +
      `<g filter="url(#riso)">${soil}</g>` +
      `<rect x="0" y="${f(ys)}" width="${W}" height="${f(soilBottom - ys)}" fill="url(#trame)" opacity=".13"/>` +
      (dur ? `<g clip-path="url(#croissance)">${vivant}</g>` : vivant);
  }

  global.Plante = { dessin, couleurs: C, rng };
  if (typeof module !== "undefined") module.exports = global.Plante;
})(typeof window !== "undefined" ? window : globalThis);
