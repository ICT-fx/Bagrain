# Site vitrine BAGRAIN®

One-page bilingue FR/EN pour le lancement de BAGRAIN — le sac à dos à capuche
intégrée. Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP +
ScrollTrigger · Lenis. Polices auto-hébergées via `next/font`.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm start          # sert le build
```

## Où changer quoi

| Quoi | Où |
| --- | --- |
| **Dates / nom / hall / stand du salon** | [lib/site-config.ts](lib/site-config.ts) — passer `event.confirmed` à `true` une fois les dates réelles saisies. Tant que c'est `false`, la page affiche « dates à confirmer », le bouton « Ajouter au calendrier » est masqué et `/api/calendar` répond 404 : personne ne peut enregistrer un rendez-vous inventé |
| **Email de contact** (bouton RDV, mailto) | `contactEmail` dans [lib/site-config.ts](lib/site-config.ts) |
| **URL de production** (SEO, sitemap, hreflang) | `url` dans [lib/site-config.ts](lib/site-config.ts) |
| **LinkedIn / Instagram** | `socials` dans [lib/site-config.ts](lib/site-config.ts) (vide = masqué) |
| **Tous les textes FR / EN** | [lib/i18n.ts](lib/i18n.ts) — aucun texte n'est écrit dans les composants |
| **Mentions légales** (SIREN, siège…) | blocs `legal` dans [lib/i18n.ts](lib/i18n.ts) — les champs à compléter sont entre [crochets] |
| **Couleurs, typo, easings** | `@theme` dans [app/globals.css](app/globals.css) |

## Collecte d'emails (Resend)

Les deux formulaires passent par [Resend](https://resend.com) (voir
[lib/resend.ts](lib/resend.ts)) :

- **Liste de lancement** (`/api/subscribe`) : l'adresse est ajoutée aux
  *Contacts* Resend, d'où partira l'email de lancement (*Broadcasts*). Pas
  de notification par email : la liste se consulte dans Resend.
- **Contact pro** (`/api/contact`) : le message arrive par email à l'équipe ;
  « Répondre » écrit directement au visiteur.

Une seule variable, à définir dans Vercel (Settings → Environment Variables) :

```bash
RESEND_API_KEY=re_…   # clé « Full access » (les contacts l'exigent)
```

Sans elle (développement local), les soumissions sont seulement journalisées.

Expéditeur et destinataire sont dans `mail` de [lib/site-config.ts](lib/site-config.ts).
Sans domaine vérifié dans Resend, l'expéditeur reste `onboarding@resend.dev`
et Resend n'écrit qu'à l'adresse du compte. Le domaine est indispensable pour
envoyer l'email de lancement à la liste.

## Les visuels produit

Les rendus haute définition livrés par le bureau d'études sont à la racine du
dépôt (`Sac face avant.png`, `Image Capuche dépliée.png`,
`Image technique.  .png`, `Image stand.png`). Ils ne sont **pas** servis tels
quels : un script les prépare pour le web.

```bash
pip install numpy scipy scikit-image opencv-python Pillow   # une fois
brew install webp                                            # pour cwebp
python3 scripts/visuels.py --profil
```

[scripts/visuels.py](scripts/visuels.py) écrit les quatre fichiers de
`public/img/` et, avec `--profil`, réimprime les tableaux de constantes à
recopier dans le code. **À relancer à chaque nouvelle livraison de rendus.**

| Fichier produit | Traitement |
| --- | --- |
| `sac-face-avant.webp` | détouré (fond transparent) — hero |
| `capuche-depliee.webp` | détouré — section « Le sac » |
| `schema-technique-hd.webp` | recadrage haute définition de la planche sans annotations, sur son fond studio — section « Anatomie » |
| `stand-salon.webp` | conversion simple — section « Salon » |

Deux constantes dépendent de ces fichiers et sont à recopier si les rendus
changent :

- `BAG_TOP_EDGE` / `BAG_IMAGE` dans [lib/bag-silhouette.ts](lib/bag-silhouette.ts) —
  la ligne de crête du sac du hero. C'est elle qui arrête la pluie : la zone
  sèche épouse la capuche et rien n'est dessiné derrière le produit.
- `HOTSPOT_POS` dans [components/Anatomy.tsx](components/Anatomy.tsx) —
  positions en % des points chauds sur la planche désannotée.

La planche technique est la seule à ne pas être détourée : la face avant du
sac y est aussi sombre que son ombre portée, aucun seuil ne les sépare
proprement. Elle est donc posée sur un panneau blanc, dans une section déjà
claire.

**Définition du sac du hero.** Le rendu livré mesure 1122 × 1402 px mais le sac
n'en occupe que 654 px de large : c'est tout ce que `sac-face-avant.webp`
contient. Le hero l'affiche jusqu'à 472 px CSS, soit 944 px sur un écran
retina — l'image y est donc étirée d'environ 1,4×. Aucun traitement ne
rattrape ça ; seul un rendu source plus grand le ferait (voir la liste des
assets). L'image est servie en `quality={90}` (déclaré dans
[next.config.ts](next.config.ts)) : à 75, la seconde compression de Next
ajoutait des bandes visibles sur les grands aplats sombres de la coque.

## Visuels encore placeholder

- **Séquence de déploiement de la capuche** (le moment fort du site) :
  [components/HoodSequence.tsx](components/HoodSequence.tsx) crossfade
  aujourd'hui 4 rendus SVG ([components/svg/BagFigure.tsx](components/svg/BagFigure.tsx)).
  Dès que la séquence de 40–60 images WebP (1200 px de large) existe :
  la déposer dans `public/sequence/0001.webp…`, précharger après le premier
  rendu et peindre l'index `Math.round(progress × (n−1))` dans un `<canvas>`
  à la place des 4 `<BagFigure>` — la `ScrollTrigger` et son `onUpdate`
  existent déjà, seul le rendu change.
- **Séquence « problème »** : [components/ProblemFilm.tsx](components/ProblemFilm.tsx)
  joue `public/video/capuche-film.mp4` à droite du titre — elle remplace le
  triptyque de pictogrammes placeholder qui occupait la section. C'est un
  rendu génératif (le filigrane « Veo » de la source disparaît au recadrage
  4/5) : à remplacer par des prises de vue réelles quand elles existeront.

  Le fichier est réencodé depuis les 443 images 30 fps de
  `image sac animation capuche/` (hors dépôt, 103 Mo). Le raccord de boucle
  est un fondu enchaîné de 9 images entre la fin et le début : la première
  entrée est amputée de ces 9 images et sert de fin à la seconde, donc la
  reprise tombe pile sur l'image suivante.

  ```bash
  # les images sont d'abord renumérotées f00001…f00443 dans l'ordre du tri
  ffmpeg -framerate 30 -start_number 10 -i f%05d.webp \
         -framerate 30 -start_number 1 -t 0.3 -i f%05d.webp \
    -filter_complex "[0:v]crop=864:1080:528:0,setsar=1[a];\
                     [1:v]crop=864:1080:528:0,setsar=1[b];\
                     [a][b]xfade=transition=fade:duration=0.3:offset=14.166667,format=yuv420p[v]" \
    -map "[v]" -an -c:v libx264 -preset slow -crf 33 -profile:v high \
    -level 4.0 -g 60 -movflags +faststart public/video/capuche-film.mp4
  ```

  Le poster (`public/img/capuche-film-poster.webp`) est exactement la
  première image du fichier : c'est ce qui permet de ne rien télécharger
  avant que la section n'entre à l'écran sans qu'on voie le cadre sauter.

  La lecture démarre quand 40 % du cadre est visible et repart de la
  première image à chaque fois qu'on revient sur la section — la séquence a
  un ordre (gros plans → rue sous la pluie → capuche qui se déploie), la
  prendre en cours de route n'aurait pas de sens. La pause ne survient qu'une
  fois le cadre quasiment sorti de l'écran : ces deux seuils distincts
  évitent de relancer sans arrêt quand on oscille sur le bord.
- **Portraits équipe** : les 5 portraits sont en place
  ([public/img/team/](public/img/team/)), recadrés en 3:4 autour du visage et
  passés en noir et blanc dans [components/Team.tsx](components/Team.tsx) —
  les sources venaient chacune d'une lumière différente. Elles restent petites
  (144 à 360 px de large) : des versions HD au même cadrage seraient à
  substituer telles quelles, le composant n'a pas besoin d'être touché
  (mapping `PORTRAITS`, un nom → un fichier).
- **Image OG** : générée au build ([app/opengraph-image.tsx](app/opengraph-image.tsx)) ;
  remplacer par un rendu produit 1200×630 sur fond `#070E2A` quand disponible.
- **Logo vectoriel** : le logo est redessiné en SVG dans
  [components/ui/Logo.tsx](components/ui/Logo.tsx) — à confronter au fichier
  SVG officiel de la marque.

## Assets encore à fournir (récapitulatif)

1. Séquence de déploiement capuche, 40–60 images WebP 1200 px
2. Photos lifestyle en conditions réelles (métro, vélo, déjeuner) — la
   séquence de la section « problème » tient le rôle en attendant, mais c'est
   un rendu génératif, pas une prise de vue
3. Dates / hall / numéro de stand du salon
4. Rendu « face avant » plus grand pour le hero — le sac n'y fait que 654 px de
   large et le hero l'affiche à 944 px sur retina. Viser 1400 px de sac
   (≈ 2400 px de rendu), puis relancer `scripts/visuels.py --profil` et
   recopier `BAG_TOP_EDGE` / `BAG_IMAGE`
5. Portraits équipe en haute définition (les 5 actuels sont en place mais font
   144 à 360 px de large ; recadrage 3:4 autour du visage à conserver)
6. Logo SVG vectoriel officiel
7. Rendu OG 1200×630
8. ⚠️ Vérifier le temps de déploiement réel avant publication — le site
   affiche « ≈ 5 s » (compteur de la section « Comment ça marche »)

## Garde-fous éditoriaux (décidés avec le brief)

- Aucun prix affiché (les 265 € / 99 € du deck sont incohérents) — le site
  capte des emails pour le lancement 2026.
- Aucune donnée financière (levées, CA, prévisionnel) ni chiffre de marché.
- Partenaires financiers et conseils exclus de la vitrine ; seuls OCCO,
  L'École de Design Nantes Atlantique, SPK Group et RVDB apparaissent.
- « **Brevet déposé** / patent pending », jamais « breveté ».
- « **Aucun produit comparable identifié à ce jour** », jamais « aucun
  concurrent » en absolu.

## Performance — état des lieux honnête

**Budget JS : ≈ 257 ko gzip** au premier chargement, dont ~160 ko de
socle React 19 + Next App Router et ~48 ko de GSAP + ScrollTrigger +
Lenis. L'objectif « < 200 ko » du brief n'est pas atteignable avec cette
stack sans sacrifier le SSR : le socle et les librairies d'animation
imposées pèsent déjà ~208 ko à eux seuls. Pistes si le budget devient
contraignant : remplacer Lenis + ScrollTrigger par
`animation-timeline: scroll()` natif (−48 ko, support à vérifier), ou
sortir la page du mode client. Le code applicatif reste léger (~45 ko,
i18n comprise) et les sections sous le pli sont code-splittées.

**Le LCP ne dépend pas de ce budget.** La séquence d'entrée du hero est
en CSS pur (`.enter` / `.enter-lines` dans `globals.css`) : le titre, le
sous-titre et les CTA sont peints dès l'arrivée du HTML, sans attendre
l'hydratation. Les révélations au scroll des sections suivantes, elles,
sont pilotées en JS mais scopées sous `html.js` — sans JavaScript, tout
le contenu reste lisible.

## Référencement de la version anglaise

Le sélecteur FR/EN est **entièrement côté client** (localStorage) : il
n'existe pas d'URL servant une version anglaise rendue au serveur. Les
`hreflang` ont donc été retirés — les déclarer aurait envoyé un signal
faux aux moteurs. Le titre d'onglet et la meta description suivent bien
la langue choisie, mais les partages sociaux (Open Graph) restent en
français. Pour indexer réellement l'anglais, il faudra de vraies routes
`/en` avec `generateMetadata` et un `<html lang>` dynamique.

## Choix techniques notables

- **Pas de Framer Motion** : GSAP + Lenis couvrent tout (scrub, reveals,
  micro-interactions) — une lib d'animation de moins dans le budget JS.
- **Pas de curseur personnalisé** : le brief le donnait optionnel ; entre le
  curseur et la zone sèche du hero, on garde la zone sèche (principe Chanel).
- `prefers-reduced-motion` : pluie remplacée par une image SVG fixe, scroll
  natif, séquence « 4 gestes » rendue en liste verticale, marquee gelé.
- **La zone sèche du hero n'est pas un dôme dessiné** : chaque goutte est
  testée contre la ligne de crête du sac détouré (`BAG_TOP_EDGE`) et
  éclabousse là où elle le touche. Rien n'est peint derrière le produit —
  l'abri, c'est le sac. La parallaxe souris décale le sac de ±8 px : le
  décalage est partagé avec le canvas par une `ref` plutôt que re-mesuré à
  chaque frame, ce qui forcerait un recalcul de style en plein rAF.
