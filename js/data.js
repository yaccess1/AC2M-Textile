/*
  Données du catalogue ac2m Textile
  ---------------------------------
  products : un objet par modèle.
    sku, model, sub (sous-titre), type (hoodie | crew | capri | zip | tee | polo),
    fabric (jersey | double | fleece | terry), gsm, comp, sizes ("S à 3XL"), pt (fabriqué au Portugal),
    feat (détails), colors : [code, nom, couleur hex].

  Champs optionnels pour vos vraies images (voir README) :
    photos  : { "default": "assets/photos/bondi.jpg", "134": "assets/photos/bondi-marine.jpg" }
    mockups : { "134": { "front": "assets/maquettes/bondi-marine-face.png", "back": "assets/maquettes/bondi-marine-dos.png" } }
    zones   : { "face": { "cx": 300, "top": 214 }, "pg": { "cx": 374, "top": 214 }, "md": { "a": [148,214], "b": [100,548] } }

  placements : emplacements et techniques de marquage (repris de la fiche Bondi).
    techs : [nom, famille, format, largeur mm, hauteur mm, nb couleurs max (0 = quadri), nom fournisseur]
*/
window.AC2M_DATA = {
  "products": [
    {
      "sku": "ASW001",
      "model": "Bondi U",
      "sub": "Sweat à capuche unisexe",
      "type": "hoodie",
      "fabric": "fleece",
      "gsm": 300,
      "comp": "85 % coton bio peigné, 15 % polyester recyclé",
      "sizes": "S à 3XL",
      "pt": false,
      "feat": [
        "Capuche doublée deux panneaux, cordons plats assortis réglables",
        "Poche kangourou aux coins renforcés",
        "Bord-côtes 1x1 aux poignets et à la taille, résistants à la déformation",
        "Ruban chevron renforcé à l’intérieur du col",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "129",
          "Vert foncé",
          "#068740"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "164",
          "Bleu pastel",
          "#90acc3"
        ],
        [
          "119",
          "Vert clair",
          "#c6efde"
        ],
        [
          "123",
          "Gris clair",
          "#cccccc"
        ],
        [
          "159",
          "Vert pastel",
          "#d0e6d3"
        ],
        [
          "131",
          "Beige",
          "#ddc9af"
        ],
        [
          "102",
          "Rose",
          "#e695aa"
        ]
      ]
    },
    {
      "sku": "ASW002",
      "model": "Bondi W",
      "sub": "Sweat à capuche femme",
      "type": "hoodie",
      "fabric": "fleece",
      "gsm": 300,
      "comp": "85 % coton bio peigné, 15 % polyester recyclé",
      "sizes": "S à 3XL",
      "pt": false,
      "feat": [
        "Capuche doublée deux panneaux, cordons plats assortis",
        "Poche kangourou aux coins renforcés",
        "Bord-côtes 1x1 aux poignets et à la taille, résistants à la déformation",
        "Ruban chevron renforcé à l’intérieur du col",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "129",
          "Vert foncé",
          "#068740"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "164",
          "Bleu pastel",
          "#90acc3"
        ],
        [
          "119",
          "Vert clair",
          "#c0e000"
        ],
        [
          "123",
          "Gris clair",
          "#cccccc"
        ],
        [
          "159",
          "Vert pastel",
          "#d0e6d3"
        ],
        [
          "131",
          "Beige",
          "#ddc9af"
        ],
        [
          "102",
          "Rose",
          "#e695aa"
        ]
      ]
    },
    {
      "sku": "ASW007",
      "model": "Tulum",
      "sub": "Sweat à capuche unisexe",
      "type": "hoodie",
      "fabric": "fleece",
      "gsm": 340,
      "comp": "40 % coton bio, 25 % coton recyclé, 35 % polyester recyclé",
      "sizes": "XS à 3XL",
      "pt": true,
      "feat": [
        "Capuche doublée deux panneaux, cordons plats assortis réglables",
        "Poche kangourou aux coins renforcés",
        "Bord-côtes 2x2 aux poignets et à la taille",
        "Ruban renforcé à l’intérieur du col, double surpiqûre aux emmanchures",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "143",
          "Anthracite",
          "#4e515a"
        ],
        [
          "149",
          "Vert armée",
          "#4f8227"
        ],
        [
          "115",
          "Bordeaux",
          "#801710"
        ],
        [
          "111",
          "Marron clair",
          "#ac8c5f"
        ],
        [
          "163",
          "Gris chiné",
          "#c5c5c5"
        ],
        [
          "153",
          "Gris chiné clair",
          "#e4e3df"
        ],
        [
          "116",
          "Blanc cassé",
          "#f6f4e5"
        ]
      ]
    },
    {
      "sku": "ASW010",
      "model": "Ericeira",
      "sub": "Sweat à capuche oversize",
      "type": "hoodie",
      "fabric": "fleece",
      "gsm": 340,
      "comp": "40 % coton bio, 25 % coton recyclé, 35 % polyester recyclé",
      "sizes": "XS à XXL",
      "pt": true,
      "feat": [
        "Capuche doublée deux panneaux",
        "Poche kangourou aux coins renforcés",
        "Ruban chevron renforcé à l’intérieur du col",
        "Coupe oversize",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "143",
          "Anthracite",
          "#4e515a"
        ],
        [
          "115",
          "Bordeaux",
          "#801710"
        ],
        [
          "111",
          "Marron clair",
          "#ac8c5f"
        ],
        [
          "153",
          "Gris chiné clair",
          "#e4e3df"
        ],
        [
          "116",
          "Blanc cassé",
          "#f6f4e5"
        ]
      ]
    },
    {
      "sku": "ASW003",
      "model": "Waikiki U",
      "sub": "Sweat col rond unisexe",
      "type": "crew",
      "fabric": "fleece",
      "gsm": 300,
      "comp": "85 % coton bio peigné, 15 % polyester recyclé",
      "sizes": "S à 3XL",
      "pt": false,
      "feat": [
        "Col, taille et poignets bord-côtes 1x1 indéformables",
        "Ruban chevron renforcé à l’intérieur du col",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "129",
          "Vert foncé",
          "#068740"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "164",
          "Bleu pastel",
          "#90acc3"
        ],
        [
          "119",
          "Vert clair",
          "#c6efde"
        ],
        [
          "123",
          "Gris clair",
          "#cccccc"
        ],
        [
          "159",
          "Vert pastel",
          "#d0e6d3"
        ],
        [
          "131",
          "Beige",
          "#ddc9af"
        ],
        [
          "102",
          "Rose",
          "#e695aa"
        ]
      ]
    },
    {
      "sku": "ASW004",
      "model": "Waikiki W",
      "sub": "Sweat col rond femme",
      "type": "crew",
      "fabric": "fleece",
      "gsm": 300,
      "comp": "85 % coton bio peigné, 15 % polyester recyclé",
      "sizes": "S à 3XL",
      "pt": false,
      "feat": [
        "Col, taille et poignets bord-côtes 1x1 indéformables",
        "Ruban chevron renforcé à l’intérieur du col",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "129",
          "Vert foncé",
          "#068740"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "164",
          "Bleu pastel",
          "#90acc3"
        ],
        [
          "119",
          "Vert clair",
          "#c6efde"
        ],
        [
          "123",
          "Gris clair",
          "#cccccc"
        ],
        [
          "159",
          "Vert pastel",
          "#d0e6d3"
        ],
        [
          "131",
          "Beige",
          "#ddc9af"
        ],
        [
          "102",
          "Rose",
          "#e695aa"
        ]
      ]
    },
    {
      "sku": "ASW006",
      "model": "Nazaré",
      "sub": "Sweat col rond unisexe",
      "type": "crew",
      "fabric": "fleece",
      "gsm": 340,
      "comp": "40 % coton bio, 25 % coton recyclé, 35 % polyester recyclé",
      "sizes": "XS à 3XL",
      "pt": true,
      "feat": [
        "Col, taille et poignets bord-côtes 2x2 indéformables",
        "Ruban chevron renforcé à l’intérieur du col",
        "Double surpiqûre aux emmanchures",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "143",
          "Anthracite",
          "#4e515a"
        ],
        [
          "149",
          "Vert armée",
          "#4f8227"
        ],
        [
          "115",
          "Bordeaux",
          "#801710"
        ],
        [
          "111",
          "Marron clair",
          "#ac8c5f"
        ],
        [
          "163",
          "Gris chiné",
          "#c5c5c5"
        ],
        [
          "153",
          "Gris chiné clair",
          "#e4e3df"
        ],
        [
          "116",
          "Blanc cassé",
          "#f6f4e5"
        ]
      ]
    },
    {
      "sku": "ASW008",
      "model": "Capri",
      "sub": "Sweat col rond unisexe, intérieur bouclette",
      "type": "capri",
      "fabric": "terry",
      "gsm": 300,
      "comp": "100 % coton bio",
      "sizes": "S à 3XL",
      "pt": false,
      "feat": [
        "Molleton bouclette à l’intérieur, doux et respirant",
        "Col, taille et poignets bord-côtes 1x1 indéformables",
        "Ruban chevron renforcé à l’intérieur du col",
        "Triangle décoratif sous le col",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "174",
          "Bleu pétrole",
          "#009071"
        ],
        [
          "129",
          "Vert foncé",
          "#068740"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "113",
          "Gris",
          "#999999"
        ],
        [
          "125",
          "Terracotta",
          "#b24b4f"
        ],
        [
          "141",
          "Taupe",
          "#beafaa"
        ],
        [
          "142",
          "Lilas",
          "#c0a4b3"
        ],
        [
          "128",
          "Orange",
          "#ef941b"
        ],
        [
          "108",
          "Jaune",
          "#f4e745"
        ]
      ]
    },
    {
      "sku": "ASW009",
      "model": "Whitehaven",
      "sub": "Sweat col rond oversize",
      "type": "crew",
      "fabric": "fleece",
      "gsm": 340,
      "comp": "40 % coton bio, 25 % coton recyclé, 35 % polyester recyclé",
      "sizes": "XS à XXL",
      "pt": true,
      "feat": [
        "Coupe oversize",
        "Ruban renforcé à l’intérieur du col",
        "Simple surpiqûre aux emmanchures",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "143",
          "Anthracite",
          "#4e515a"
        ],
        [
          "115",
          "Bordeaux",
          "#801710"
        ],
        [
          "111",
          "Marron clair",
          "#ac8c5f"
        ],
        [
          "153",
          "Gris chiné clair",
          "#e4e3df"
        ],
        [
          "116",
          "Blanc cassé",
          "#f6f4e5"
        ]
      ]
    },
    {
      "sku": "ASW005",
      "model": "Malibu",
      "sub": "Sweat col zippé 1/4",
      "type": "zip",
      "fabric": "fleece",
      "gsm": 340,
      "comp": "40 % coton bio, 25 % coton recyclé, 35 % polyester recyclé",
      "sizes": "XS à 3XL",
      "pt": true,
      "feat": [
        "Col montant zippé",
        "Bord-côtes 1x1 indéformables à la taille et aux poignets",
        "Double surpiqûre aux emmanchures, poignets et bas",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "149",
          "Vert armée",
          "#4f8227"
        ],
        [
          "115",
          "Bordeaux",
          "#801710"
        ],
        [
          "163",
          "Gris chiné",
          "#c5c5c5"
        ],
        [
          "116",
          "Blanc cassé",
          "#f6f4e5"
        ]
      ]
    },
    {
      "sku": "ATS006",
      "model": "Tamariz",
      "sub": "T-shirt léger unisexe",
      "type": "tee",
      "fabric": "jersey",
      "gsm": 140,
      "comp": "100 % coton bio",
      "sizes": "XS à 3XL",
      "pt": true,
      "feat": [
        "Col rond bord-côte 1x1 contre la déformation",
        "Double surpiqûre aux épaules et emmanchures",
        "Coutures latérales, coupe regular, toucher doux",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "143",
          "Anthracite",
          "#4e515a"
        ],
        [
          "149",
          "Vert armée",
          "#4f8227"
        ],
        [
          "115",
          "Bordeaux",
          "#801710"
        ],
        [
          "111",
          "Marron clair",
          "#ac8c5f"
        ],
        [
          "163",
          "Gris chiné",
          "#c5c5c5"
        ],
        [
          "112",
          "Rose clair",
          "#ecc7cd"
        ],
        [
          "116",
          "Blanc cassé",
          "#f6f4e5"
        ],
        [
          "106",
          "Blanc",
          "#ffffff"
        ]
      ]
    },
    {
      "sku": "ATS001",
      "model": "Copacabana U",
      "sub": "T-shirt unisexe",
      "type": "tee",
      "fabric": "jersey",
      "gsm": 165,
      "comp": "100 % coton bio peigné",
      "sizes": "S à 3XL",
      "pt": false,
      "feat": [
        "Col rond bord-côte 1x1 et ruban d’épaule à épaule renforcé",
        "Coutures latérales, coupe regular, toucher doux",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "129",
          "Vert foncé",
          "#068740"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "164",
          "Bleu pastel",
          "#90acc3"
        ],
        [
          "119",
          "Vert clair",
          "#c0e000"
        ],
        [
          "123",
          "Gris clair",
          "#cccccc"
        ],
        [
          "159",
          "Vert pastel",
          "#d0e6d3"
        ],
        [
          "131",
          "Beige",
          "#ddc9af"
        ],
        [
          "102",
          "Rose",
          "#e695aa"
        ],
        [
          "106",
          "Blanc",
          "#ffffff"
        ]
      ]
    },
    {
      "sku": "ATS002",
      "model": "Copacabana W",
      "sub": "T-shirt femme",
      "type": "tee",
      "fabric": "jersey",
      "gsm": 165,
      "comp": "100 % coton bio peigné",
      "sizes": "S à 3XL",
      "pt": false,
      "feat": [
        "Col rond bord-côte 1x1 et ruban d’épaule à épaule renforcé",
        "Coutures latérales, coupe regular, toucher doux",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "129",
          "Vert foncé",
          "#068740"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "164",
          "Bleu pastel",
          "#90acc3"
        ],
        [
          "119",
          "Vert clair",
          "#c0e000"
        ],
        [
          "123",
          "Gris clair",
          "#cccccc"
        ],
        [
          "159",
          "Vert pastel",
          "#d0e6d3"
        ],
        [
          "131",
          "Beige",
          "#ddc9af"
        ],
        [
          "102",
          "Rose",
          "#e695aa"
        ],
        [
          "106",
          "Blanc",
          "#ffffff"
        ]
      ]
    },
    {
      "sku": "ATS003",
      "model": "Maya",
      "sub": "T-shirt unisexe",
      "type": "tee",
      "fabric": "jersey",
      "gsm": 180,
      "comp": "100 % coton bio",
      "sizes": "XS à 3XL",
      "pt": true,
      "feat": [
        "Col rond bord-côte 1x1 contre la déformation",
        "Double surpiqûre aux épaules et emmanchures",
        "Coutures latérales, coupe regular, toucher doux",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "143",
          "Anthracite",
          "#4e515a"
        ],
        [
          "149",
          "Vert armée",
          "#4f8227"
        ],
        [
          "115",
          "Bordeaux",
          "#801710"
        ],
        [
          "111",
          "Marron clair",
          "#ac8c5f"
        ],
        [
          "163",
          "Gris chiné",
          "#c5c5c5"
        ],
        [
          "116",
          "Blanc cassé",
          "#f6f4e5"
        ],
        [
          "106",
          "Blanc",
          "#ffffff"
        ]
      ]
    },
    {
      "sku": "ATS004",
      "model": "Paloma",
      "sub": "T-shirt oversize, double jersey gratté",
      "type": "tee",
      "fabric": "double",
      "gsm": 240,
      "comp": "100 % coton bio",
      "sizes": "XS à XXL",
      "pt": true,
      "feat": [
        "Double jersey molletonné gratté",
        "Col rond bord-côte 1x1, double surpiqûre aux épaules, col et emmanchures",
        "Coutures latérales, toucher doux",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "143",
          "Anthracite",
          "#4e515a"
        ],
        [
          "111",
          "Marron clair",
          "#ac8c5f"
        ],
        [
          "163",
          "Gris chiné",
          "#c5c5c5"
        ],
        [
          "116",
          "Blanc cassé",
          "#f6f4e5"
        ],
        [
          "106",
          "Blanc",
          "#ffffff"
        ]
      ]
    },
    {
      "sku": "ATS005",
      "model": "Ipanema",
      "sub": "Polo manches courtes unisexe",
      "type": "polo",
      "fabric": "jersey",
      "gsm": 160,
      "comp": "100 % coton bio",
      "sizes": "S à 3XL",
      "pt": false,
      "feat": [
        "Patte de boutonnage 2 boutons et ruban de col renforcé",
        "Col et poignets dans le même tissu",
        "Coutures latérales avec fentes, toucher doux",
        "Sans étiquette de marque à l’encolure"
      ],
      "colors": [
        [
          "103",
          "Noir",
          "#000000"
        ],
        [
          "174",
          "Bleu pétrole",
          "#009071"
        ],
        [
          "129",
          "Vert foncé",
          "#068740"
        ],
        [
          "134",
          "Bleu marine",
          "#344f6a"
        ],
        [
          "113",
          "Gris",
          "#999999"
        ],
        [
          "125",
          "Terracotta",
          "#b24b4f"
        ],
        [
          "141",
          "Taupe",
          "#beafaa"
        ],
        [
          "142",
          "Lilas",
          "#c0a4b3"
        ],
        [
          "128",
          "Orange",
          "#ef941b"
        ],
        [
          "108",
          "Jaune",
          "#f4e745"
        ],
        [
          "106",
          "Blanc",
          "#ffffff"
        ]
      ]
    }
  ],
  "placements": {
    "pg": {
      "name": "Poitrine gauche",
      "techs": [
        [
          "Transfert numérique",
          "transfer",
          "XL",
          100,
          150,
          0,
          "Digital Transfer - XL"
        ],
        [
          "Flex",
          "flex",
          "XL",
          95,
          60,
          1,
          "Transfer Flex - XL"
        ],
        [
          "Transfert 3D",
          "t3d",
          "XL",
          95,
          60,
          2,
          "3D Transfer - XL"
        ],
        [
          "Broderie quadri",
          "embq",
          "XL",
          100,
          60,
          0,
          "Full Colour Embroidery - XL"
        ],
        [
          "Broderie",
          "emb",
          "XL",
          100,
          60,
          4,
          "Embroidery - XL"
        ],
        [
          "Écusson brodé",
          "patch",
          "XL",
          120,
          100,
          4,
          "Patch Embroidery - XL"
        ],
        [
          "Broderie point spécial",
          "emb",
          "XL",
          100,
          60,
          4,
          "Embroidery - Special Stitch - XL"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "XL",
          100,
          145,
          0,
          "DTG - XL"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "XL",
          100,
          145,
          0,
          "DTG 3D - XL"
        ],
        [
          "Flex spécial",
          "flex",
          "XL",
          95,
          60,
          1,
          "Transfer Flex Special - XL"
        ]
      ]
    },
    "face": {
      "name": "Face",
      "techs": [
        [
          "Impression textile",
          "print",
          "",
          300,
          260,
          3,
          "Textile Print"
        ],
        [
          "Transfert numérique",
          "transfer",
          "Std",
          210,
          150,
          0,
          "Digital Transfer - Std"
        ],
        [
          "Broderie",
          "emb",
          "Std",
          200,
          120,
          4,
          "Embroidery - Std"
        ],
        [
          "Transfert numérique",
          "transfer",
          "XL",
          300,
          260,
          0,
          "Digital Transfer - XL"
        ],
        [
          "Flex",
          "flex",
          "Std",
          150,
          100,
          1,
          "Transfer Flex - Std"
        ],
        [
          "Flex spécial",
          "flex",
          "Std",
          150,
          100,
          1,
          "Transfer Flex Special - Std"
        ],
        [
          "Transfert 3D",
          "t3d",
          "Std",
          140,
          95,
          2,
          "3D Transfer - Std"
        ],
        [
          "Broderie 3D",
          "emb3d",
          "Std",
          120,
          100,
          2,
          "Embroidery 3D -Std"
        ],
        [
          "Broderie point relief",
          "emb3d",
          "Std",
          100,
          100,
          4,
          "Embroidery - Raised Stitch - Std"
        ],
        [
          "Broderie point spécial",
          "emb",
          "Std",
          100,
          100,
          4,
          "Embroidery - Special Stitch - Std"
        ],
        [
          "Broderie fil coupé",
          "emb",
          "Std",
          100,
          100,
          4,
          "Embroidery - Cut Thread - Std"
        ],
        [
          "Broderie sequins",
          "sequins",
          "Std",
          100,
          100,
          1,
          "Embroidery - Sequins - Std"
        ],
        [
          "Écusson brodé",
          "patch",
          "Std",
          120,
          100,
          4,
          "Patch Embroidery - Std"
        ],
        [
          "Broderie quadri",
          "embq",
          "Std",
          200,
          120,
          0,
          "Full Colour Embroidery - Std"
        ],
        [
          "Broderie contour",
          "outline",
          "Std",
          120,
          100,
          1,
          "Embroidery - Outline - Std"
        ],
        [
          "Broderie découpe laser",
          "emb",
          "Std",
          100,
          100,
          4,
          "Embroidery - Laser Cut - Std"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "Std",
          145,
          100,
          0,
          "DTG- Std"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "Std",
          145,
          100,
          0,
          "DTG 3D - Std"
        ],
        [
          "Embossage",
          "emboss",
          "Std",
          150,
          100,
          0,
          "Embossing - Std"
        ],
        [
          "Strass",
          "strass",
          "Std",
          150,
          100,
          2,
          "Strass - Std"
        ],
        [
          "Doming textile",
          "doming",
          "Std",
          140,
          95,
          0,
          "Textile Doming - Std"
        ],
        [
          "Impression haute fréquence",
          "hf",
          "Std",
          150,
          100,
          0,
          "High Frequency Print - Std"
        ],
        [
          "Flex",
          "flex",
          "XL",
          240,
          260,
          1,
          "Transfer Flex - XL"
        ],
        [
          "Transfert 3D",
          "t3d",
          "XL",
          240,
          260,
          2,
          "3D Transfer - XL"
        ],
        [
          "Broderie quadri",
          "embq",
          "XL",
          250,
          250,
          0,
          "Full Colour Embroidery - XL"
        ],
        [
          "Broderie contour",
          "outline",
          "XL",
          160,
          150,
          1,
          "Embroidery - Outline - XL"
        ],
        [
          "Broderie découpe laser",
          "emb",
          "XL",
          250,
          250,
          4,
          "Embroidery - Laser Cut - XL"
        ],
        [
          "Broderie",
          "emb",
          "XL",
          250,
          250,
          4,
          "Embroidery - XL"
        ],
        [
          "Broderie 3D",
          "emb3d",
          "XL",
          160,
          150,
          2,
          "3D Embroidery - XL"
        ],
        [
          "Broderie point relief",
          "emb3d",
          "XL",
          250,
          250,
          4,
          "Embroidery - Raised Stitch - XL"
        ],
        [
          "Broderie point spécial",
          "emb",
          "XL",
          250,
          250,
          4,
          "Embroidery - Special Stitch - XL"
        ],
        [
          "Broderie fil coupé",
          "emb",
          "XL",
          250,
          250,
          4,
          "Embroidery - Cut Thread - XL"
        ],
        [
          "Broderie sequins",
          "sequins",
          "XL",
          250,
          250,
          1,
          "Embroidery - Sequins - XL"
        ],
        [
          "Écusson brodé",
          "patch",
          "XL",
          250,
          250,
          4,
          "Patch Embroidery - XL"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "XL",
          300,
          260,
          0,
          "DTG - XL"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "XL",
          300,
          260,
          0,
          "DTG 3D - XL"
        ],
        [
          "Embossage avec transfert",
          "embossT",
          "XL",
          200,
          150,
          0,
          "Embossing with Transfer - XL"
        ],
        [
          "Embossage",
          "emboss",
          "XL",
          200,
          150,
          0,
          "Embossing - XL"
        ],
        [
          "Impression haute fréquence",
          "hf",
          "XL",
          200,
          150,
          0,
          "High Frequency Print - XL"
        ],
        [
          "Strass",
          "strass",
          "XL",
          200,
          300,
          2,
          "Strass - XL"
        ],
        [
          "Doming textile",
          "doming",
          "XL",
          200,
          150,
          0,
          "Textile Doming - XL"
        ],
        [
          "Flex spécial",
          "flex",
          "XL",
          240,
          260,
          1,
          "Transfer Flex Special - XL"
        ],
        [
          "Embossage avec transfert",
          "embossT",
          "Std",
          150,
          100,
          0,
          "Embossing with Transfer - Std"
        ]
      ]
    },
    "dos": {
      "name": "Dos",
      "techs": [
        [
          "Impression textile",
          "print",
          "",
          300,
          300,
          3,
          "Textile Print"
        ],
        [
          "Transfert numérique",
          "transfer",
          "Std",
          210,
          150,
          0,
          "Digital Transfer - Std"
        ],
        [
          "Broderie",
          "emb",
          "Std",
          200,
          120,
          4,
          "Embroidery - Std"
        ],
        [
          "Transfert numérique",
          "transfer",
          "XL",
          300,
          400,
          0,
          "Digital Transfer - XL"
        ],
        [
          "Flex",
          "flex",
          "Std",
          150,
          100,
          1,
          "Transfer Flex - Std"
        ],
        [
          "Flex spécial",
          "flex",
          "Std",
          150,
          100,
          1,
          "Transfer Flex Special - Std"
        ],
        [
          "Transfert 3D",
          "t3d",
          "Std",
          140,
          95,
          2,
          "3D Transfer - Std"
        ],
        [
          "Broderie 3D",
          "emb3d",
          "Std",
          120,
          100,
          2,
          "Embroidery 3D -Std"
        ],
        [
          "Broderie point relief",
          "emb3d",
          "Std",
          100,
          100,
          4,
          "Embroidery - Raised Stitch - Std"
        ],
        [
          "Broderie point spécial",
          "emb",
          "Std",
          100,
          100,
          4,
          "Embroidery - Special Stitch - Std"
        ],
        [
          "Broderie fil coupé",
          "emb",
          "Std",
          100,
          100,
          4,
          "Embroidery - Cut Thread - Std"
        ],
        [
          "Broderie sequins",
          "sequins",
          "Std",
          100,
          100,
          1,
          "Embroidery - Sequins - Std"
        ],
        [
          "Écusson brodé",
          "patch",
          "Std",
          120,
          100,
          4,
          "Patch Embroidery - Std"
        ],
        [
          "Broderie quadri",
          "embq",
          "Std",
          200,
          120,
          0,
          "Full Colour Embroidery - Std"
        ],
        [
          "Broderie contour",
          "outline",
          "Std",
          120,
          100,
          1,
          "Embroidery - Outline - Std"
        ],
        [
          "Broderie découpe laser",
          "emb",
          "Std",
          100,
          100,
          4,
          "Embroidery - Laser Cut - Std"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "Std",
          145,
          100,
          0,
          "DTG- Std"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "Std",
          145,
          100,
          0,
          "DTG 3D - Std"
        ],
        [
          "Embossage",
          "emboss",
          "Std",
          150,
          100,
          0,
          "Embossing - Std"
        ],
        [
          "Strass",
          "strass",
          "Std",
          150,
          100,
          2,
          "Strass - Std"
        ],
        [
          "Doming textile",
          "doming",
          "Std",
          140,
          95,
          0,
          "Textile Doming - Std"
        ],
        [
          "Impression haute fréquence",
          "hf",
          "Std",
          150,
          100,
          0,
          "High Frequency Print - Std"
        ],
        [
          "Flex",
          "flex",
          "XL",
          240,
          400,
          1,
          "Transfer Flex - XL"
        ],
        [
          "Transfert 3D",
          "t3d",
          "XL",
          300,
          400,
          2,
          "3D Transfer - XL"
        ],
        [
          "Broderie quadri",
          "embq",
          "XL",
          250,
          250,
          0,
          "Full Colour Embroidery - XL"
        ],
        [
          "Broderie contour",
          "outline",
          "XL",
          160,
          150,
          1,
          "Embroidery - Outline - XL"
        ],
        [
          "Broderie découpe laser",
          "emb",
          "XL",
          250,
          250,
          4,
          "Embroidery - Laser Cut - XL"
        ],
        [
          "Broderie",
          "emb",
          "XL",
          250,
          250,
          4,
          "Embroidery - XL"
        ],
        [
          "Broderie 3D",
          "emb3d",
          "XL",
          160,
          150,
          2,
          "3D Embroidery - XL"
        ],
        [
          "Broderie point relief",
          "emb3d",
          "XL",
          250,
          250,
          4,
          "Embroidery - Raised Stitch - XL"
        ],
        [
          "Broderie point spécial",
          "emb",
          "XL",
          250,
          250,
          4,
          "Embroidery - Special Stitch - XL"
        ],
        [
          "Broderie fil coupé",
          "emb",
          "XL",
          250,
          250,
          4,
          "Embroidery - Cut Thread - XL"
        ],
        [
          "Broderie sequins",
          "sequins",
          "XL",
          250,
          250,
          1,
          "Embroidery - Sequins - XL"
        ],
        [
          "Écusson brodé",
          "patch",
          "XL",
          250,
          250,
          4,
          "Patch Embroidery - XL"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "XL",
          300,
          420,
          0,
          "DTG - XL"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "XL",
          300,
          420,
          0,
          "DTG 3D - XL"
        ],
        [
          "Embossage avec transfert",
          "embossT",
          "XL",
          200,
          150,
          0,
          "Embossing with Transfer - XL"
        ],
        [
          "Embossage",
          "emboss",
          "XL",
          200,
          150,
          0,
          "Embossing - XL"
        ],
        [
          "Impression haute fréquence",
          "hf",
          "XL",
          200,
          150,
          0,
          "High Frequency Print - XL"
        ],
        [
          "Strass",
          "strass",
          "XL",
          200,
          300,
          2,
          "Strass - XL"
        ],
        [
          "Doming textile",
          "doming",
          "XL",
          200,
          150,
          0,
          "Textile Doming - XL"
        ],
        [
          "Flex spécial",
          "flex",
          "XL",
          240,
          400,
          1,
          "Transfer Flex Special - XL"
        ],
        [
          "Embossage avec transfert",
          "embossT",
          "Std",
          150,
          100,
          0,
          "Embossing with Transfer - Std"
        ]
      ]
    },
    "md": {
      "name": "Manche droite",
      "techs": [
        [
          "Transfert numérique",
          "transfer",
          "Std",
          60,
          150,
          0,
          "Digital Transfer - Std"
        ],
        [
          "Transfert numérique",
          "transfer",
          "XL",
          60,
          450,
          0,
          "Digital Transfer - XL"
        ],
        [
          "Flex",
          "flex",
          "Std",
          60,
          150,
          1,
          "Transfer Flex - Std"
        ],
        [
          "Flex spécial",
          "flex",
          "Std",
          60,
          150,
          1,
          "Transfer Flex Special - Std"
        ],
        [
          "Transfert 3D",
          "t3d",
          "Std",
          60,
          150,
          2,
          "3D Transfer - Std"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "Std",
          60,
          150,
          0,
          "DTG- Std"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "",
          60,
          145,
          0,
          "DTG"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "Std",
          60,
          145,
          0,
          "DTG 3D - Std"
        ],
        [
          "Flex",
          "flex",
          "XL",
          60,
          450,
          1,
          "Transfer Flex - XL"
        ],
        [
          "Transfert 3D",
          "t3d",
          "XL",
          60,
          450,
          2,
          "3D Transfer - XL"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "XL",
          60,
          450,
          0,
          "DTG 3D - XL"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "XL",
          60,
          450,
          0,
          "DTG XL"
        ],
        [
          "Flex spécial",
          "flex",
          "XL",
          60,
          450,
          1,
          "Transfer Flex Special - XL"
        ]
      ]
    },
    "mg": {
      "name": "Manche gauche",
      "techs": [
        [
          "Transfert numérique",
          "transfer",
          "Std",
          60,
          150,
          0,
          "Digital Transfer - Std"
        ],
        [
          "Transfert numérique",
          "transfer",
          "XL",
          60,
          450,
          0,
          "Digital Transfer - XL"
        ],
        [
          "Flex",
          "flex",
          "Std",
          60,
          150,
          1,
          "Transfer Flex - Std"
        ],
        [
          "Flex spécial",
          "flex",
          "Std",
          60,
          150,
          1,
          "Transfer Flex Special - Std"
        ],
        [
          "Transfert 3D",
          "t3d",
          "Std",
          60,
          150,
          2,
          "3D Transfer - Std"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "Std",
          60,
          150,
          0,
          "DTG- Std"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "",
          60,
          145,
          0,
          "DTG"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "Std",
          60,
          145,
          0,
          "DTG 3D - Std"
        ],
        [
          "Flex",
          "flex",
          "XL",
          60,
          450,
          1,
          "Transfer Flex - XL"
        ],
        [
          "Transfert 3D",
          "t3d",
          "XL",
          60,
          450,
          2,
          "3D Transfer - XL"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "XL",
          60,
          450,
          0,
          "DTG 3D - XL"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "XL",
          60,
          450,
          0,
          "DTG XL"
        ],
        [
          "Flex spécial",
          "flex",
          "XL",
          60,
          450,
          1,
          "Transfer Flex Special - XL"
        ]
      ]
    },
    "pd": {
      "name": "Poitrine droite",
      "techs": [
        [
          "Transfert numérique",
          "transfer",
          "XL",
          100,
          150,
          0,
          "Digital Transfer - XL"
        ],
        [
          "Flex spécial",
          "flex",
          "Std",
          95,
          60,
          1,
          "Transfer Flex Special - Std"
        ],
        [
          "Transfert 3D",
          "t3d",
          "Std",
          95,
          60,
          2,
          "3D Transfer - Std"
        ],
        [
          "Flex",
          "flex",
          "XL",
          95,
          60,
          1,
          "Transfer Flex - XL"
        ],
        [
          "Transfert 3D",
          "t3d",
          "XL",
          95,
          60,
          2,
          "3D Transfer - XL"
        ],
        [
          "Broderie quadri",
          "embq",
          "XL",
          100,
          60,
          0,
          "Full Colour Embroidery - XL"
        ],
        [
          "Broderie",
          "emb",
          "XL",
          100,
          60,
          4,
          "Embroidery - XL"
        ],
        [
          "Écusson brodé",
          "patch",
          "XL",
          120,
          100,
          4,
          "Patch Embroidery - XL"
        ],
        [
          "Broderie point spécial",
          "emb",
          "XL",
          100,
          60,
          4,
          "Embroidery - Special Stitch - XL"
        ],
        [
          "Impression directe (DTG)",
          "dtg",
          "XL",
          100,
          145,
          0,
          "DTG - XL"
        ],
        [
          "Impression directe 3D",
          "dtg3d",
          "XL",
          100,
          145,
          0,
          "DTG 3D - XL"
        ],
        [
          "Flex spécial",
          "flex",
          "XL",
          95,
          60,
          1,
          "Transfer Flex Special - XL"
        ]
      ]
    }
  }
};
