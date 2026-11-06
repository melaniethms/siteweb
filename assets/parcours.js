/* Melania fabricatrix — parcours de la graine aux graines.
   Les listes (formations, réseau, interventions, verbes, projets) et l'accroche viennent du dossier _data,
   modifiable depuis Pages CMS. Les autres textes du parcours sont dans SCENES ci-dessous.
   Chaque étape a son adresse (#racines, #fleurs, …). */

const SCENES = {
  racines: {
    h: 0.0, label: "Racines",
    kicker: "Sous terre · les racines",
    title: "D'où elle vient",
    body: [
      "<p>Des racines alsaciennes, tenaces. Puis une formation en design de produit et en ingénierie, entre Lyon et Paris, et des apprentissages qui continuent.</p>",
      "__RACINES__"
    ],
    choices: [{ label: "Je suis les rhizomes", to: "rhizomes", primary: true }]
  },

  rhizomes: {
    h: 0.07, label: "Rhizomes",
    kicker: "Sous terre · les rhizomes",
    title: "Un réseau qui s'étend",
    body: [
      "<p>Depuis 2016, dans l'Arc jurassien, chaque lieu traversé est devenu un nœud du réseau.</p>",
      "__RESEAU__"
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
      "__ACCUEIL__",
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
      "__INTERVENTIONS__"
    ],
    choices: [{ label: "Je monte vers les feuilles", to: "feuilles", primary: true }]
  },

  feuilles: {
    h: 0.56, label: "Feuilles", wide: true,
    kicker: "Les feuilles",
    title: "Quatre verbes",
    body: [
      "<p>Quatre folioles sur chaque feuille, quatre façons de travailler qui se nourrissent les unes les autres.</p>",
      "__VERBES__"
    ],
    choices: [{ label: "Je regarde les fleurs", to: "fleurs", primary: true }]
  },

  fleurs: {
    h: 0.76, label: "Fleurs", wide: true,
    kicker: "Les fleurs",
    title: "Projets en fleur",
    body: [
      "__PROJETS__"
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
let DATA = {};
try { DATA = JSON.parse(document.getElementById("site-data").textContent) || {}; } catch (e) { DATA = {}; }

// Mise en forme légère : **gras** et *italique*
function md(t) {
  return esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
}
function renderTimeline(list) {
  if (!Array.isArray(list) || !list.length) return "";
  return '<ul class="timeline">' + list.map((x) => {
    const t = x.titre ? `<b>${md(x.titre)}</b>` : "";
    const d = x.detail ? (t ? ", " : "") + md(x.detail) : "";
    return `<li><span class="when">${esc(x.quand)}</span><span>${t}${d}</span></li>`;
  }).join("") + "</ul>";
}
function renderTiles(list, kind) {
  if (!Array.isArray(list) || !list.length) return "";
  return '<div class="grid">' + list.map((x) => {
    const meta = x.meta ? `<span class="meta">${esc(x.meta)}</span>` : "";
    const link = x.lien ? ` <a href="${esc(x.lien)}">${esc(x.lien_texte || "Voir")}</a>` : "";
    return `<div class="tile ${kind}"><h3>${md(x.titre)}</h3>${meta}<p>${md(x.texte)}${link}</p></div>`;
  }).join("") + "</div>";
}
function renderAccueil(a) {
  if (!a) return "";
  return (a.accroche ? `<p class="lead">${md(a.accroche)}</p>` : "") + (a.sous_ligne ? `<p>${md(a.sous_ligne)}</p>` : "");
}
const BLOCKS = {
  __POSTS__: () => renderPosts(),
  __ACCUEIL__: () => renderAccueil(DATA.accueil),
  __RACINES__: () => renderTimeline(DATA.racines),
  __RESEAU__: () => renderTimeline(DATA.reseau),
  __INTERVENTIONS__: () => renderTimeline(DATA.interventions),
  __VERBES__: () => renderTiles(DATA.verbes, "leaf"),
  __PROJETS__: () => renderTiles(DATA.projets, "flower")
};

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
  const ys = yAt(SOIL);
  svg.innerHTML = window.Plante.dessin({
    largeur: W, hauteur: T, sol: ys, sommet: yAt(0.93), fondSol: T,
    couleurSol: (t) => { const [a, b, c] = colorAt(SOIL * (1 - t)); return `rgb(${a},${b},${c})`; },
    yRhizome: yAt(0.08), racine: (yAt(0.02) - ys) * 0.42,
    feuilles: 10, feuille: 230, portee: 280, fleur: 38, aigrette: 52,
    envol: 460, hautEnvol: H * 0.55, graine: 11
  });
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
  $("body").innerHTML = s.body.map((p) => (BLOCKS[p] ? BLOCKS[p]() : p)).join("");
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
