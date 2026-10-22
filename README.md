# Mélanie Thomas — *Melania fabricatrix*

Site personnel (portfolio et carnet) à parcourir comme une plante pousse : racines, rhizomes, graine, tige, feuilles, fleurs, graines et étiquette d'herbier.

En ligne : https://melaniethms.github.io/siteweb/

## Écrire un article dans le carnet

1. Sur GitHub, ouvrir le dossier `_posts`, puis **Add file → Create new file**.
2. Nommer le fichier `AAAA-MM-JJ-titre-court.md` (la date est celle de publication).
3. Copier le contenu de `MODELE-ARTICLE.md`, remplir le titre, la rubrique et le résumé, écrire en Markdown.
4. **Commit changes** : l'article est en ligne une à deux minutes plus tard, dans le carnet et sur la page d'accueil (3 derniers articles).

Rubriques : Low-tech & sobriété · Faire & tiers-lieux · Design, soin & handicap · Sciences & transmission (modifiables dans `_config.yml`).

Pour une image : la déposer dans `assets/images/` et l'insérer avec `![description]({{ site.baseurl }}/assets/images/nom.jpg)`.

Depuis Obsidian : un article écrit en Markdown peut être copié tel quel, en ajoutant l'en-tête du modèle.

## Modifier le parcours

Tous les textes du parcours sont dans `assets/parcours.js`, objet `SCENES`, une entrée par étape (`racines`, `rhizomes`, `graine`, `tige`, `feuilles`, `fleurs`, `carnet`, `etiquette`).

## Technique

- Construit par GitHub Pages (Jekyll), sans thème ni extension.
- Aucune dépendance externe, aucune police téléchargée, aucun traceur.
- La plante est dessinée en SVG par `assets/parcours.js`.
