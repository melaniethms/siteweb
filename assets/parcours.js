/* Melania fabricatrix — parcours de la graine aux graines.
   Tout le contenu est dans SCENES : on peut modifier les textes ici sans toucher au reste.
   Chaque étape a son adresse (#racines, #fleurs, …). */

const SCENES = {
  racines: {
    h: 0.0, label: "Racines",
    kicker: "Sous terre · les racines",
    title: "D'où elle vient",
    body: [
      "<p>Des racines alsaciennes, tenaces. Puis une formation en design de produit et en ingénierie, entre Lyon et Paris, et des apprentissages qui continuent.</p>",
      `<ul class="timeline">
        <li><span class="when">2012</span><span><b>BTS Design de produit</b>, Lyon</span></li>
        <li><span class="when">2014</span><span><b>DSAA Créateur concepteur</b>, design de produit, Lyon · mention bien</span></li>
        <li><span class="when">2015</span><span><b>Master de recherche Innovation, Conception, Ingénierie</b>, Arts et Métiers, Paris · mention bien. Stage de designer-chercheuse chez Toyota Motor Europe.</span></li>
        <li><span class="when">2022</span><span><b>Certificat « Thinking and Creating with Code »</b>, EPFL Extension School, avec l'association ada:flow</span></li>
        <li><span class="when">2025 – 2026</span><span><b>Gestion d'association</b>, formation GAS 370°</span></li>
        <li><span class="when">Depuis 2026</span><span><b>Artisane vannière en formation</b> avec Tilia, botanique de terrain comprise</span></li>
      </ul>`
    ],
    choices: [{ label: "Je suis les rhizomes", to: "rhizomes", primary: true }]
  },

  rhizomes: {
    h: 0.07, label: "Rhizomes",
    kicker: "Sous terre · les rhizomes",
    title: "Un réseau qui s'étend",
    body: [
      "<p>Depuis 2016, dans l'Arc jurassien, chaque lieu traversé est devenu un nœud du réseau.</p>",
      `<ul class="timeline">
        <li><span class="when">2016 – 2022</span><span><b>FabLab de la HE-Arc</b>, Neuchâtel&nbsp;: coordination, formations, mission Interreg « Communauté du Savoir »</span></li>
        <li><span class="when">Depuis 2018</span><span><b>FabLab La Chaux-de-Fonds</b>, co-présidente depuis 2025&nbsp;: premier fablab suisse à orientation low-tech assumée</span></li>
        <li><span class="when">2023 – 2025</span><span><b>SATW</b>, Académie suisse des sciences techniques&nbsp;: promotion de la relève en Suisse romande</span></li>
        <li><span class="when">Depuis 2025</span><span><b>Girls* on Ice Switzerland</b>, programme manager</span></li>
        <li><span class="when">Et aussi</span><span>HEP-BEJUNE, TestLab Delémont, Low-Tech Lab Lausanne, Club 44, Université de Neuchâtel…</span></li>
      </ul>`
    ],
    asides: [{
      label: "Pourquoi des rhizomes ?",
      title: "Rien ne pousse seul",
      text: "Un rhizome pousse à l'horizontale et fait naître de nouvelles pousses à chaque nœud. Autour, le mycélium relie les racines entre elles et fait circuler ce qui manque à chacune. C'est une bonne image pour un travail fait de partenariats."
    }],
    choices: [{ label: "Je remonte vers la lumière", to: "graine", primary: true }]
  },

  graine: {
    h: 0.15, label: "Graine",
    kicker: "Herbier de terrain · Melania fabricatrix",
    title: "Mélanie Thomas",
    body: [
      "<p class=\"lead\">Entre design, low-tech et communs&nbsp;: je fabrique, je forme, je fédère et je documente.</p>",
      "<p>Une pratique de terrain, entre conception et recherche, pour des manières plus sobres de concevoir et de faire ensemble.</p>",
      "<p>Ce site se parcourt comme une plante pousse&nbsp;: sous terre d'abord, puis la tige, les feuilles, les fleurs et enfin les graines. Vous pouvez aussi aller droit aux projets ou au carnet.</p>"
    ],
    choices: [
      { label: "Je descends aux racines", to: "racines", primary: true },
      { label: "Je monte le long de la tige", to: "tige" },
      { label: "Je vais droit aux projets", to: "fleurs" }
    ]
  },

  tige: {
    h: 0.36, label: "Tige",
    kicker: "La tige",
    title: "Une posture de praticienne-chercheuse",
    body: [
      "<p>Je me vois comme une chercheuse de terrain plutôt qu'une universitaire&nbsp;: je conçois, je fabrique, je teste avec les gens, puis je documente ce qui marche.</p>",
      "<p>Mes terrains&nbsp;: les <em>low-tech</em> et la sobriété, les tiers-lieux et les communs, le design et le handicap, la transmission des sciences.</p>",
      `<ul class="timeline">
        <li><span class="when">2026</span><span>Co-organisatrice d'une session sur les low-tech à la <b>Sustainability Science Conference</b>, UNIL</span></li>
        <li><span class="when">Intervention</span><span>Présentation conjointe avec <b>Simon Vuille</b> (UniNE) sur les low-tech et la désirabilité</span></li>
        <li><span class="when">2016 – 2018</span><span>Colloques franco-suisses de la <b>Communauté du Savoir</b> (Interreg)</span></li>
      </ul>`
    ],
    choices: [{ label: "Je monte vers les feuilles", to: "feuilles", primary: true }]
  },

  feuilles: {
    h: 0.56, label: "Feuilles", wide: true,
    kicker: "Les feuilles",
    title: "Quatre verbes",
    body: [
      "<p>Quatre folioles sur chaque feuille, quatre façons de travailler qui se nourrissent les unes les autres.</p>",
      `<div class="grid">
        <div class="tile leaf"><h3>Je fabrique</h3><p>Design de produit et fabrication numérique&nbsp;: œuvres interactives pour le musée Sensorium à Berne, fourchettes totems de la Semaine du goût, le jeu <i>Yapasphoto</i>.</p></div>
        <div class="tile leaf"><h3>Je forme</h3><p>Médiation et formations en fablab pour tous les publics depuis 2016, formations pour enseignant·es avec la HEP-BEJUNE, cours FreeCAD pas à pas en préparation.</p></div>
        <div class="tile leaf"><h3>Je fédère</h3><p>Low-Tech Festilab, FabLab La Chaux-de-Fonds, Girls* on Ice, Swiss TecLadies&nbsp;: des projets qui tiennent parce que beaucoup de gens les portent.</p></div>
        <div class="tile leaf"><h3>Je documente</h3><p>Un carnet sur ce site, des notes de recherche, du sketchnoting, et une rubrique «&nbsp;De notre production&nbsp;» pour le magazine 1000METRES.</p></div>
      </div>`
    ],
    choices: [{ label: "Je regarde les fleurs", to: "fleurs", primary: true }]
  },

  fleurs: {
    h: 0.76, label: "Fleurs", wide: true,
    kicker: "Les fleurs",
    title: "Projets en fleur",
    body: [
      `<div class="grid">
        <div class="tile flower"><h3>Low-Tech Festilab</h3><span class="meta">Depuis 2024 · cofondatrice</span><p>Premier festival low-tech de Suisse&nbsp;: plus de 730 participant·es en 2025. En juin 2027, une résidence Visiophare avec le DIY Festival.</p></div>
        <div class="tile flower"><h3>FabLab La Chaux-de-Fonds</h3><span class="meta">Depuis 2018 · co-présidente</span><p>Un lieu ouvert pour donner aux habitant·es des Montagnes neuchâteloises une culture technique qui rend autonome.</p></div>
        <div class="tile flower"><h3>Girls* on Ice Switzerland</h3><span class="meta">Depuis 2025 · programme manager</span><p>Expéditions scientifiques en glacier pour jeunes filles, ateliers et excursions pour les écoles.</p></div>
        <div class="tile flower"><h3>Swiss TecLadies, GO4IT, TecDays</h3><span class="meta">2023 – 2025 · SATW</span><p>Programmes de promotion des sciences techniques auprès des jeunes en Suisse romande.</p></div>
        <div class="tile flower"><h3>Musée Sensorium</h3><span class="meta">Designer indépendante</span><p>Œuvres interactives pour un musée des sens à Berne, dont une Joconde en bas-relief.</p></div>
        <div class="tile flower"><h3>Semaine du goût</h3><span class="meta">Ville de La Chaux-de-Fonds</span><p>Signalétique en fourchettes totems, usinées en HPL blanc au FabLab.</p></div>
        <div class="tile flower"><h3><i>Yapasphoto</i></h3><span class="meta">Pour transN</span><p>Conception, graphisme et illustration d'un jeu.</p></div>
        <div class="tile flower"><h3>8 mètres sous la mousse</h3><span class="meta">2026 · prototype</span><p>Une station de médiation sur les couches de la tourbière des Ponts-de-Martel. <a href="https://melaniethms.github.io/Tourbe/">Descendre dans la tourbe</a></p></div>
      </div>`
    ],
    choices: [{ label: "Je récolte les graines", to: "carnet", primary: true }]
  },

  carnet: {
    h: 0.9, label: "Graines",
    kicker: "Les graines",
    title: "Le carnet",
    body: [
      "<p>Les graines, ce sont les textes&nbsp;: notes de terrain, lectures, retours d'expérience. Elles voyagent plus loin que la plante.</p>",
      "__POSTS__"
    ],
    choices: [
      { label: "Ouvrir tout le carnet", href: "__CARNET__", primary: true },
      { label: "Je cherche son contact", to: "etiquette" }
    ]
  },

  etiquette: {
    h: 1.0, label: "Étiquette",
    kicker: "Étiquette d'herbier",
    title: "Pour la contacter",
    body: [
      `<div class="label">
        <div class="t"><span class="latin">Melania fabricatrix</span> Thomas</div>
        <div>La Chaux-de-Fonds (NE), env. 1000 m</div>
        <div>Tiers-lieux, fablabs, salles de classe</div>
        <div><a href="mailto:melanie.thomas.design@gmail.com">melanie.thomas.design@gmail.com</a></div>
        <div><a href="https://www.linkedin.com/in/melaniethomasdesign/">LinkedIn</a></div>
        <div><a href="https://melaniethms.github.io/Tourbe/fiche.html">Planche d'herbier complète</a></div>
        <div>leg. M. Thomas</div>
      </div>`
    ],
    choices: [
      { label: "Je revois la plante depuis la graine", to: "graine", primary: true },
      { label: "Je lis le carnet", href: "__CARNET__" }
    ]
  }
};

const ORDER = ["racines", "rhizomes", "graine", "tige", "feuilles", "fleurs", "carnet", "etiquette"];
const START = "graine";
const SOIL = 0.18; // hauteur relative de la surface du sol

/* ---------- Données du carnet ---------- */
const CARNET = (window.SITE && window.SITE.carnet) || "carnet/";
let POSTS = [];
try { POSTS = JSON.parse(document.getElementById("posts-data").textContent); } catch (e) { POSTS = []; }

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function renderPosts() {
  if (!POSTS.length) return '<p class="empty">Les premières graines germent : le carnet arrive bientôt.</p>';
  return '<ul class="posts">' + POSTS.map((p) =>
    `<li><span class="meta">${esc(p.date)}${p.rubrique ? " · " + esc(p.rubrique) : ""}</span><h3><a href="${esc(p.url)}">${esc(p.title)}</a></h3>${p.resume ? `<p>${esc(p.resume)}</p>` : ""}</li>`
  ).join("") + "</ul>";
}

/* ---------- Couleurs selon la hauteur ---------- */
const PALETTE = [            // papier teinté : rouille sous terre, sauge à l'air libre
  [0.00, [120, 58, 32]],
  [0.12, [170, 92, 58]],
  [0.18, [224, 176, 146]],
  [0.24, [214, 222, 202]],
  [0.60, [232, 236, 224]],
  [1.00, [246, 241, 231]]
];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
function colorAt(h) {
  for (let i = 1; i < PALETTE.length; i++) {
    if (h <= PALETTE[i][0]) return mix(PALETTE[i - 1][1], PALETTE[i][1], (h - PALETTE[i - 1][0]) / (PALETTE[i][0] - PALETTE[i - 1][0]));
  }
  return PALETTE[PALETTE.length - 1][1];
}

/* ---------- La plante, dessinée en SVG ---------- */
const svg = document.getElementById("plant-svg");
let H = window.innerHeight;
const W = 1000;
const COLUMN = () => H * 3.4;
const PAD = () => H * 0.6;
const TOTAL = () => COLUMN() + PAD() * 2;
const yAt = (h) => TOTAL() - PAD() - h * COLUMN();

function rand(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

function drawPlant() {
  H = window.innerHeight;
  const T = TOTAL();
  svg.setAttribute("viewBox", `0 0 ${W} ${T}`);
  svg.style.height = `${T}px`;
  const r = rand(7);
  const ys = yAt(SOIL);
  const cx = 500;
  let o = "";

  // Sol en strates
  const bands = 14;
  for (let i = 0; i <= bands; i++) {
    const f = i / bands;
    const y = ys + (T - ys) * f;
    const [a, b, c] = colorAt(SOIL * (1 - f));
    let d = `M0 ${y}`;
    for (let x = 0; x <= W; x += 50) d += ` L${x} ${y + (r() - 0.5) * 10}`;
    d += ` L${W} ${T} L0 ${T} Z`;
    o += `<path d="${d}" fill="rgb(${a},${b},${c})"/>`;
  }

  // Soilpunk : mycélium qui court dans la terre, et débris de compost
  o += '<g fill="none" stroke="#f6f1e7" stroke-linecap="round" opacity=".55">';
  for (let i = 0; i < 16; i++) {
    let x = r() * W, y = ys + 30 + r() * (T - ys - 60);
    let ang = r() * Math.PI * 2;
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
    for (let k = 0; k < 14; k++) {
      ang += (r() - 0.5) * 1.1;
      x += Math.cos(ang) * 22; y += Math.sin(ang) * 14;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
      if (r() < 0.3) {
        const a2 = ang + (r() < 0.5 ? 1 : -1) * (0.6 + r() * 0.8);
        o += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l${(Math.cos(a2) * 26).toFixed(1)} ${(Math.sin(a2) * 18).toFixed(1)} l${((r() - 0.5) * 16).toFixed(1)} ${((r() - 0.5) * 12).toFixed(1)}" stroke-width=".9"/>`;
      }
    }
    o += `<path d="${d}" stroke-width="1.3"/>`;
  }
  o += "</g>";
  for (let i = 0; i < 60; i++) {
    const x = r() * W, y = ys + 20 + r() * (T - ys - 40);
    const c = ["#141414", "#5d6b4f", "#f6f1e7"][i % 3];
    if (i % 4 === 0) o += `<rect x="${x}" y="${y}" width="${4 + r() * 8}" height="${2 + r() * 3}" fill="${c}" opacity=".5" transform="rotate(${r() * 180} ${x} ${y})"/>`;
    else o += `<circle cx="${x}" cy="${y}" r="${1 + r() * 2.5}" fill="${c}" opacity=".45"/>`;
  }

  const soil = o;
  o = "";

  // Racines : chevelu sous la tige
  o += '<g fill="none" stroke="rgba(244,239,226,.75)" stroke-linecap="round">';
  for (let i = 0; i < 9; i++) {
    const dx = (i - 4) * 38 + (r() - 0.5) * 20;
    const depth = yAt(0.02 + r() * 0.06);
    o += `<path d="M${cx} ${ys} C${cx + dx * 0.4} ${ys + 60} ${cx + dx} ${(ys + depth) / 2} ${cx + dx * 1.3} ${depth}" stroke-width="${2.5 - Math.abs(i - 4) * 0.2}"/>`;
  }
  o += "</g>";

  // Rhizomes : réseau horizontal avec nœuds
  const yR = yAt(0.08);
  const nodes = [];
  for (let i = 0; i < 9; i++) nodes.push([60 + i * 110 + (r() - 0.5) * 40, yR + (r() - 0.5) * 70]);
  o += '<g fill="none" stroke="#f4efe2" stroke-width="3" stroke-linecap="round" opacity=".9">';
  for (let i = 0; i < nodes.length - 1; i++) {
    const [x1, y1] = nodes[i], [x2, y2] = nodes[i + 1];
    o += `<path d="M${x1} ${y1} C${x1 + 40} ${y1 + 30} ${x2 - 40} ${y2 - 30} ${x2} ${y2}"/>`;
    o += `<path d="M${x1} ${y1} l${(r() - 0.5) * 30} ${-20 - r() * 30}" stroke-width="2"/>`;
  }
  o += `<path d="M${cx} ${ys} C${cx} ${ys + 40} ${nodes[4][0]} ${nodes[4][1] - 40} ${nodes[4][0]} ${nodes[4][1]}"/>`;
  o += "</g>";
  nodes.forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y}" r="7" fill="#f4efe2"/>`; });

  // Mousse de surface
  for (let x = 0; x < W; x += 10) {
    const h = 8 + r() * 14;
    o += `<line x1="${x}" y1="${ys + 3}" x2="${x + (r() - 0.5) * 6}" y2="${ys - h}" stroke="${r() > 0.6 ? "#b5522b" : "#8c9c7a"}" stroke-width="3.5" stroke-linecap="round"/>`;
  }

  // Graine posée au pied de la tige
  o += `<ellipse cx="${cx - 34}" cy="${ys - 8}" rx="14" ry="9" fill="#b5522b" stroke="#141414" stroke-width="2" transform="rotate(-18 ${cx - 34} ${ys - 8})"/>`;

  // Tige
  const yTop = yAt(0.93);
  const pts = [];
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push([cx + Math.sin(t * 5.2) * 26, ys + (yTop - ys) * t]);
  }
  let stem = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    stem += ` C${x0} ${(y0 + y1) / 2} ${x1} ${(y0 + y1) / 2} ${x1} ${y1}`;
  }
  o += `<path d="${stem}" fill="none" stroke="#5d6b4f" stroke-width="9" stroke-linecap="round"/>`;
  const stemX = (y) => cx + Math.sin(((y - ys) / (yTop - ys)) * 5.2) * 26;

  // Feuilles composées (quatre folioles) le long de la tige
  for (let i = 0; i < 9; i++) {
    const h = 0.3 + i * 0.055;
    const y = yAt(h);
    const side = i % 2 ? 1 : -1;
    const x = stemX(y);
    const len = 130 + r() * 50;
    o += `<g transform="translate(${x} ${y}) scale(${side} 1) rotate(${-20 - r() * 15})">`;
    o += `<path d="M0 0 L${len} 0" stroke="#5d6b4f" stroke-width="4"/>`;
    for (let k = 1; k <= 4; k++) {
      const px = (len * k) / 4.4;
      const s = 0.6 + k * 0.12;
      o += `<path d="M${px} 0 c${18 * s} ${-34 * s} ${58 * s} ${-36 * s} ${70 * s} ${-28 * s} c${-12 * s} ${20 * s} ${-44 * s} ${32 * s} ${-70 * s} ${28 * s}Z" fill="#8c9c7a" stroke="#5d6b4f" stroke-width="1.5"/>`;
      o += `<path d="M${px} 0 c${18 * s} ${-34 * s} ${58 * s} ${-36 * s} ${70 * s} ${-28 * s} c${-12 * s} ${20 * s} ${-44 * s} ${32 * s} ${-70 * s} ${28 * s}Z" fill="#8c9c7a" stroke="#5d6b4f" stroke-width="1.5" transform="scale(1 -1)"/>`;
    }
    o += "</g>";
  }

  // Rameaux fleuris
  const flowers = [];
  for (let i = 0; i < 6; i++) {
    const h = 0.7 + i * 0.03;
    const y = yAt(h);
    const side = i % 2 ? 1 : -1;
    const x = stemX(y);
    const fx = x + side * (150 + r() * 220);
    const fy = y - 40 - r() * 80;
    o += `<path d="M${x} ${y} C${x + side * 60} ${y - 10} ${fx - side * 60} ${fy + 50} ${fx} ${fy}" fill="none" stroke="#5d6b4f" stroke-width="4"/>`;
    flowers.push([fx, fy, i]);
  }
  flowers.forEach(([fx, fy, i]) => {
    if (i % 2) {
      // fleur-atelier
      o += `<g transform="translate(${fx} ${fy})">`;
      for (let k = 0; k < 6; k++) o += `<ellipse rx="13" ry="32" fill="#b5522b" transform="rotate(${k * 60}) translate(0 -26)"/>`;
      o += `<polygon points="0,-17 14.7,-8.5 14.7,8.5 0,17 -14.7,8.5 -14.7,-8.5" fill="#f6f1e7" stroke="#141414" stroke-width="3"/><circle r="6" fill="#141414"/></g>`;
    } else {
      // fleur tressée
      o += `<g transform="translate(${fx} ${fy})"><circle r="42" fill="#efdcc4" stroke="#94401f" stroke-width="3"/>`;
      o += `<g fill="none" stroke="#94401f" stroke-width="2.4"><circle r="31"/><circle r="20"/><circle r="9"/><path d="M0 -42V42M-42 0H42M-30 -30L30 30M30 -30L-30 30"/></g>`;
      o += `<g fill="#5d6b4f"><circle cy="-48" r="6"/><circle cx="48" r="6"/><circle cy="48" r="6"/><circle cx="-48" r="6"/></g></g>`;
    }
  });

  // Inflorescence cotonneuse au sommet
  const tx = stemX(yTop);
  o += `<g transform="translate(${tx} ${yTop})" fill="#ffffff" stroke="#c9c2b0" stroke-width="1.5">`;
  [[-16, -8, 20], [16, -12, 20], [0, -30, 20], [-22, -36, 15], [22, -40, 15], [0, 6, 15]].forEach(([x, y, rr]) => { o += `<circle cx="${x}" cy="${y}" r="${rr}"/>`; });
  o += "</g>";

  // Graines qui s'envolent (dont quelques-unes en forme de QR)
  for (let i = 0; i < 26; i++) {
    const gx = tx + 40 + r() * 460;
    const gy = yTop - 40 - r() * (H * 0.55);
    if (i % 5 === 0) {
      o += `<rect x="${gx}" y="${gy}" width="16" height="16" fill="none" stroke="#141414" stroke-width="2.4"/><rect x="${gx + 5}" y="${gy + 5}" width="6" height="6" fill="#141414"/>`;
    } else {
      o += `<circle cx="${gx}" cy="${gy}" r="${3 + r() * 3}" fill="#141414"/><path d="M${gx} ${gy} l${-8 - r() * 8} ${-12 - r() * 8}" stroke="#fff" stroke-width="2"/>`;
    }
  }
  // Rendu riso : grain d'encre, trame de points sur la terre, second passage d'encre décalé
  const defs = `<defs>
    <filter id="riso" x="-2%" y="-2%" width="104%" height="104%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="4" result="bruit"/>
      <feColorMatrix in="bruit" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="alpha"/>
      <feComponentTransfer in="alpha" result="masque"><feFuncA type="discrete" tableValues="0 1 1 1 1 1 1 1"/></feComponentTransfer>
      <feComposite in="SourceGraphic" in2="masque" operator="in"/>
    </filter>
    <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f6f1e7"/><stop offset=".55" stop-color="#eceee3"/><stop offset="1" stop-color="#dfe5d4"/>
    </linearGradient>
    <pattern id="trame" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <circle cx="5" cy="5" r="2" fill="#141414"/>
    </pattern>
  </defs>`;
  svg.innerHTML = defs +
    `<rect x="0" y="0" width="${W}" height="${ys + 12}" fill="url(#ciel)"/>` +
    `<g filter="url(#riso)">${soil}</g>` +
    `<rect x="0" y="${ys}" width="${W}" height="${T - ys}" fill="url(#trame)" opacity=".13"/>` +
    `<g filter="url(#riso)">${o}</g>` +
    `<g class="misreg" transform="translate(5 4)">${o}</g>`;
}

/* ---------- Affichage d'une étape ---------- */
const $ = (id) => document.getElementById(id);

function buildStages() {
  const ol = $("stages");
  ol.innerHTML = ORDER.map((id) => `<li data-id="${id}"><button type="button" data-go="${id}">${SCENES[id].label}</button></li>`).join("");
}

function show(id, { focus = true } = {}) {
  const s = SCENES[id] || SCENES[START];
  const [a, b, c] = colorAt(s.h);
  document.documentElement.style.setProperty("--bg", `rgb(${a},${b},${c})`);
  svg.style.transform = `translateY(${-(yAt(s.h) - H * 0.5)}px)`;

  document.querySelectorAll("#stages li").forEach((li) => li.classList.toggle("on", li.dataset.id === id));
  const onBtn = document.querySelector("#stages li.on");
  if (onBtn && onBtn.scrollIntoView && window.matchMedia("(max-width: 720px)").matches) onBtn.scrollIntoView({ inline: "center", block: "nearest" });

  const card = $("card");
  card.classList.toggle("wide", !!s.wide);
  $("kicker").textContent = s.kicker;
  $("title").textContent = s.title;
  $("body").innerHTML = s.body.map((p) => (p === "__POSTS__" ? renderPosts() : p)).join("");
  const aside = $("aside");
  aside.hidden = true;
  aside.innerHTML = "";

  const nav = $("choices");
  nav.innerHTML = "";
  const items = [];
  (s.asides || []).forEach((x) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.textContent = x.label;
    btn.addEventListener("click", () => {
      aside.innerHTML = `<b>${x.title}</b>${x.text}`;
      aside.hidden = false;
      const next = btn.nextElementSibling;
      if (next && next.classList.contains("or")) next.remove();
      btn.remove();
    });
    items.push(btn);
  });
  s.choices.forEach((ch) => {
    let el;
    if (ch.href) {
      el = document.createElement("a");
      el.href = ch.href === "__CARNET__" ? CARNET : ch.href;
    } else {
      el = document.createElement("button");
      el.type = "button";
      el.addEventListener("click", () => go(ch.to));
    }
    el.className = "choice" + (ch.primary ? " primary" : "");
    el.textContent = ch.label;
    items.push(el);
  });
  items.forEach((el, i) => {
    if (i > 0) {
      const or = document.createElement("span");
      or.className = "or";
      or.textContent = "ou";
      nav.appendChild(or);
    }
    nav.appendChild(el);
  });

  card.classList.remove("enter");
  void card.offsetWidth;
  card.classList.add("enter");
  if (focus) card.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.title = id === START ? "Mélanie Thomas — designer, low-tech et communs" : `${s.title} · Mélanie Thomas`;
}

function current() { const id = location.hash.slice(1); return SCENES[id] ? id : START; }
function go(id) { if (location.hash === `#${id}`) show(id); else location.hash = id; }

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-go]");
  if (!t) return;
  e.preventDefault();
  go(t.dataset.go);
});
window.addEventListener("hashchange", () => show(current()));
let rt;
window.addEventListener("resize", () => {
  clearTimeout(rt);
  rt = setTimeout(() => {
    if (Math.abs(window.innerHeight - H) > 120) drawPlant();
    show(current(), { focus: false });
  }, 200);
});

buildStages();
drawPlant();
// Premier affichage : on place la plante directement, sans animation
svg.style.transition = "none";
show(current(), { focus: false });
requestAnimationFrame(() => requestAnimationFrame(() => { svg.style.transition = ""; }));
