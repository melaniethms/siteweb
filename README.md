# Mélanie Thomas — *Melania fabricatrix*

Site personnel (portfolio et carnet) à parcourir comme une plante pousse : racines, rhizomes, graine, tige, feuilles, fleurs, graines et étiquette d'herbier.

En ligne : https://melalab.ch

## Modifier le site avec Pages CMS (le plus simple)

1. Aller sur https://app.pagescms.org et se connecter avec GitHub.
2. Choisir le dépôt `melaniethms/siteweb`, branche `main`.
3. Dans le menu :
   - **Carnet (articles)** : écrire, modifier ou supprimer un article, avec un éditeur de texte et l'ajout d'images.
   - **Parcours · …** : modifier l'accroche, les formations, le réseau, les interventions, les quatre verbes et les projets (ajouter, retirer, réordonner).
4. **Save** : la modification est enregistrée dans le dépôt, et le site est à jour une à deux minutes plus tard.

La configuration du CMS est dans `.pages.yml`. Les contenus du parcours sont dans le dossier `_data`.

## Écrire un article à la main (sans CMS)

1. Sur GitHub, ouvrir le dossier `_posts`, puis **Add file → Create new file**.
2. Nommer le fichier `AAAA-MM-JJ-titre-court.md` (la date est celle de publication).
3. Copier le contenu de `MODELE-ARTICLE.md`, remplir le titre, la rubrique et le résumé, écrire en Markdown.
4. **Commit changes** : l'article est en ligne une à deux minutes plus tard, dans le carnet et sur la page d'accueil (3 derniers articles).

Rubriques : Low-tech & sobriété · Faire & tiers-lieux · Design, soin & handicap · Sciences & transmission (modifiables dans `_config.yml`).

Pour une image : la déposer dans `assets/images/` et l'insérer avec `![description]({{ site.baseurl }}/assets/images/nom.jpg)`.

Depuis Obsidian : un article écrit en Markdown peut être copié tel quel, en ajoutant l'en-tête du modèle.

## Modifier le parcours

Les listes du parcours (formations, réseau, interventions, verbes, projets) et l'accroche sont dans `_data/*.yml`, modifiables dans Pages CMS. Les autres textes (titres des étapes, boutons, contact) sont dans `assets/parcours.js`, objet `SCENES`.

## Technique

- Construit par GitHub Pages (Jekyll), sans thème ni extension.
- Aucune dépendance externe, aucun traceur. Les polices sont hébergées dans `assets/fonts` : Special Elite (titres, licence Apache 2.0) et Courier Prime (texte, licence SIL OFL 1.1).
- Direction artistique « riso soilpunk » : encre noire, vert sauge `#8c9c7a`, orange rouille `#b5522b`, grain d'impression, trame de points et second passage d'encre décalé sur les illustrations (variables en haut de `assets/style.css`).
- La plante est dessinée en SVG par `assets/parcours.js`.
