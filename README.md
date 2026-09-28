# ac2m Textile : site catalogue et personnalisation

Site statique (HTML, CSS, JavaScript) sans outil de compilation. Il se déploie tel quel sur GitHub Pages.

## Structure

```
index.html              Page unique : accueil, collection, grammage, fiche produit
css/style.css           Styles (couleurs de la charte ac2m en haut du fichier, dans :root)
js/data.js              Catalogue : produits, coloris, emplacements et techniques de marquage
js/app.js               Loupe, catalogue, configurateur et rendus de marquage
assets/logo-ecusson.jpg       Monogramme brodé (en-tête, pied de page, favicon)
assets/logo-monogramme.png    Monogramme détouré, visuel d'exemple du configurateur
assets/photos/          Vos photos produits (cartes de la collection)
assets/maquettes/       Vos photos détourées pour l'aperçu de personnalisation
```

## Tester en local

Le configurateur lit les pixels des logos. Les navigateurs l'interdisent quand la page est ouverte en double-cliquant sur le fichier (`file://`). Lancez un petit serveur dans le dossier du projet :

```bash
python3 -m http.server 8000
# puis ouvrez http://localhost:8000
```

Vous pouvez aussi utiliser l'extension « Live Server » de VS Code.

## Déployer sur GitHub Pages

1. Créez un dépôt sur GitHub, par exemple `ac2m-textile`.
2. Envoyez-y le contenu de ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Site ac2m Textile"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/ac2m-textile.git
   git push -u origin main
   ```
3. Sur GitHub, ouvrez **Settings > Pages**. Dans « Build and deployment », choisissez **Deploy from a branch**, puis la branche `main` et le dossier `/ (root)`, et enregistrez.
4. Après une à deux minutes, le site est en ligne à l'adresse `https://VOTRE-COMPTE.github.io/ac2m-textile/`.

Pour un nom de domaine à vous, par exemple `textile.ac2m-communication.fr`, renseignez-le dans **Settings > Pages > Custom domain**, puis créez chez votre hébergeur DNS un enregistrement CNAME qui pointe vers `VOTRE-COMPTE.github.io`.

## Ajouter vos vraies images

Tous ces champs sont optionnels. Sans eux, le site affiche les illustrations vectorielles, recolorées selon le coloris.

### 1. Photos des cartes de la collection

Déposez les photos dans `assets/photos/`, puis ajoutez un champ `photos` au produit dans `js/data.js`. La clé est le code couleur, ou `default` pour une photo commune à tous les coloris :

```js
{
  "sku": "ASW001",
  "photos": {
    "default": "assets/photos/bondi.jpg",
    "134": "assets/photos/bondi-bleu-marine.jpg",
    "103": "assets/photos/bondi-noir.jpg"
  },
  ...
}
```

Pour les photos, un format portrait 4:4,6 (par exemple 920 × 1060 px) en JPG ou WEBP, d'environ 200 Ko, donne de bons résultats.

### 2. Photos dans l'aperçu de personnalisation

L'aperçu travaille sur un cadre de **600 × 720 unités**. Pour qu'une photo remplace l'illustration :

- utilisez une photo à plat, face ou dos, **détourée sur fond transparent (PNG)** ;
- mettez-la au format 600 × 720, ou toute taille de même proportion (1200 × 1440 par exemple) ;
- centrez le vêtement, dans le même cadrage pour tous les coloris.

```js
"mockups": {
  "134": { "front": "assets/maquettes/bondi-marine-face.png", "back": "assets/maquettes/bondi-marine-dos.png" },
  "default": { "front": "assets/maquettes/bondi-face.png", "back": "assets/maquettes/bondi-dos.png" }
}
```

Les rendus de marquage (broderie, flex, relief…) s'appliquent par-dessus la photo.

### 3. Caler les zones de marquage sur vos photos

Ouvrez le site avec `?calage` à la fin de l'adresse, par exemple `http://localhost:8000/?calage`. En bas à droite de l'aperçu, les coordonnées du curseur s'affichent dans le cadre 600 × 720.

Relevez les points qui vous intéressent, puis ajoutez un champ `zones` au produit :

```js
"zones": {
  "face": { "cx": 300, "top": 220 },   // centre horizontal et haut de la zone
  "dos":  { "cx": 300, "top": 185 },
  "pg":   { "cx": 372, "top": 216 },   // poitrine gauche
  "pd":   { "cx": 228, "top": 216 },   // poitrine droite
  "md":   { "a": [148, 214], "b": [100, 548] }  // manche droite : épaule (a) vers poignet (b)
}
```

La manche gauche reprend automatiquement la manche droite en miroir.

Les dimensions des zones (en mm) viennent des techniques. L'échelle est de 0,6 unité par millimètre, réglable avec la constante `S` en haut de `js/app.js`.

## Modifier le catalogue

- **Produits et coloris :** tableau `products` dans `js/data.js`. La couleur hex d'un coloris sert aux pastilles et à l'illustration.
- **Techniques de marquage :** objet `placements`. Chaque technique est une ligne `[nom, famille, format, largeur mm, hauteur mm, couleurs max (0 = quadri), nom fournisseur]`. La famille (`emb`, `flex`, `transfer`, `print`, `dtg`, `t3d`, `emb3d`, `outline`, `patch`, `sequins`, `strass`, `doming`, `emboss`, `embossT`, `hf`, `dtg3d`, `embq`) détermine le rendu visuel.
- **Données de marquage par modèle :** aujourd'hui, tous les produits utilisent les emplacements de la fiche Bondi. Le site affiche la mention « à confirmer » sur les autres modèles. Quand vous aurez la fiche d'un modèle, ajoutez-lui un champ `placements` de même structure, par exemple `"placements": { "face": { "name": "Face", "techs": [ ... ] } }`. Le produit utilise alors ses propres techniques, et la mention disparaît. Les emplacements absents de ce champ restent repris de la fiche Bondi.
- **Couleurs de la charte :** variables en haut de `css/style.css` (`--kaki`, `--brun`, `--ink`…).

## À savoir

- **Polices :** les polices Fraunces (titres) et Montserrat (textes, police de la charte ac2m) sont chargées depuis Google Fonts.
- **Données fournisseur :** les références et noms de modèles viennent du catalogue fournisseur (Aodaci). Pensez à les renommer si vous ne souhaitez pas les afficher publiquement.
- **Prix, stocks et envoi du devis :** le site n'affiche ni prix ni stock, tout est sur devis. Le bouton « Copier le récapitulatif » copie la demande dans le presse-papiers. Pour recevoir les demandes directement, vous pourrez brancher un service de formulaire (Formspree, Netlify Forms…) ou un lien `mailto:` vers votre adresse.
