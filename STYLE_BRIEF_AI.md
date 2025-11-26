## Brief de style – « La Graine et La Gazelle » (réutilisable par IA)

Objectif: permettre à une IA (ex. Cursor) de recréer ou de refondre un site en reprenant l’ADN visuel, l’UX et les micro‑interactions de ce projet, tout en adaptant automatiquement la palette aux couleurs d’un nouveau logo. Ne pas copier les couleurs d’origine; dériver une nouvelle palette cohérente depuis le logo fourni.

---

### 1) Essence de marque
- **Ambiance**: artisanal, chaleureux, authentique, moderne sans ostentation.
- **Valeurs**: simplicité, générosité, qualité, confiance.
- **Tonalité**: positive, claire, accessible, orientée service.

---

### 2) Grille et layout
- **Largeur max contenu**: 1200 px (pages), 960 px pour sections denses.
- **Gouttières**: 16 px (mobile), 24 px (tablette), 32 px (desktop).
- **Sections**: blocs respirants, fond clair; header sticky; footer compact.
- **Hiérarchie**: titres courts, sous‑titres utiles, paragraphes concis.

---

### 3) Typographie
- Police sans‑serif moderne (ex. Geist ou Inter). Alternatives libres acceptées.
- Échelle typographique (mobile/desktop):
  - Affichage: 32/40 → 48/56
  - H1: 28/36 → 40/48
  - H2: 22/28 → 28/36
  - H3: 18/24 → 22/28
  - Corps: 16/24
  - Petit: 14/20
- Poids: titres 700–800, intertitres 600–700, corps 400–500.

---

### 4) Couleurs (dérivées du logo)
Ne pas réutiliser la palette existante. Extraire automatiquement depuis le **logo fourni**:
- **Primaire**: teinte dominante du logo.
- **Secondaire**: teinte complémentaire/analogue du logo.
- **Accent**: teinte vive issue du logo (utilisation parcimonieuse).
- **Neutres**: échelle gris chaud (texte/fonds/bordures) avec contraste AA.

Règles d’états:
- Hover: assombrir/éclaircir le primaire de 8–12%.
- Focus: anneau focus 2 px (secondaire, 50–60% opacité) + outline accessible.
- Active: légère contraction (scale 0.98–0.99) + ombre réduite.

Tokens CSS/Tailwind à produire (exemples):
- Couleurs: `--color-primary`, `--color-secondary`, `--color-accent`, `--color-text`, `--color-bg`, `--color-border`.
- Rayons: `--radius-sm: 6px`, `--radius-md: 10px`, `--radius-full: 9999px`.
- Ombres: `--shadow-sm`, `--shadow-md`, `--shadow-lg` (subtiles, diffuses).
- Espacement: échelle 4/8/12/16/20/24/32/40.

Si Tailwind, mapper aussi un thème:
- `brand-primary`, `brand-secondary`, `brand-text`, `brand-background`.

---

### 5) Iconographie & imagerie
- Icônes outline simples (24 px base). Épaisseur 2 px.
- Images: légères, optimisées, formats modernes. Coins légèrement arrondis.
- Carrousel décoratif: images SVG/PNG répétées, ambiance orientale stylisée.

---

### 6) Composants UI (spécifications fonctionnelles)
1) Header sticky
   - Logo à gauche (clic → page d’accueil/menu).
   - À droite: bouton Menu (hamburger mobile), bouton Panier compact.
   - Ombre légère après 4 px de scroll. Fond blanc.

2) Dropdown Menu
   - Mobile: bouton hamburger; Desktop: libellé « Menu ».
   - Liens d’ancrage vers sections du menu. Se ferme au clic/Escape/clic extérieur.

3) Boutons
   - Primaire: fond primaire, texte blanc, bordure 2 px primaire.
   - Secondaire: fond blanc, texte primaire, bordure 2 px primaire.
   - États cohérents hover/focus/active (voir Couleurs).

4) Cart badge (Panier compact)
   - Pastille quantité en surimpression (coin du pictogramme).
   - Affiche total et, si présent, petite pastille « −X,XX € » (remise).
   - Sur mobile, cacher le libellé « Panier » pour gagner de la place.

5) Cards d’items (MenuItemCard)
   - Titre fort à gauche, prix en haut‑droite, description sous titre.
   - Compteur quantité centré (mobile) / aligné à droite (desktop).

6) Compteur quantité
   - Boutons ±: bordure 2 px primaire, texte lisible; au hover, inversion de couleurs ET légère **amplification du symbole** (+/−) pour éviter « blanc sur blanc ».
   - Quantité au centre, non éditable.

7) Carrousel décoratif
   - Défilement auto continu (requestAnimationFrame), vitesse douce.
   - Flèches droite/gauche (desktop), swipe horizontal (mobile).
   - Zoom « lightbox » au survol après 3 s (desktop) et au clic (mobile/desktop); pause du défilement pendant la lightbox, reprise à la fermeture.
   - Aucune saccade: piste répétée (x≥4) et recadrage transparent.

8) Toasts
   - Style pill bordure 2 px primaire, fond primaire, texte blanc.
   - Mobile: top‑center; Desktop: bottom‑right. Entrée/sortie `opacity/translate` 300 ms.

9) Formulaires
   - Champs avec bordure gris clair, rayon md, focus ring secondaire.
   - Autocomplétion d’adresse (API gouv) avec liste déroulante accessible.

10) Pages e‑commerce
   - Panier: lignes modifiables, totaux, badges de remises, CTA « Valider mon panier ».
   - Commande: formulaire coordonnées + adresse structurée; CTA « Passer au paiement » avec garde si panier vide (toast au lieu de désactiver silencieusement).
   - Confirmation: message de succès, panier vidé.

11) Footer
   - Mentions: droits, lien « by techinfotuto », liens légaux.

---

### 7) Mouvements & durées
- Transitions: 150–300 ms `ease-out` (hover, toasts, zoom léger).
- Lightbox: fade + scale doux (100–200 ms). Pas d’animations agressives.

---

### 8) Accessibilité
- Contraste AA minimum pour texte et composants interactifs.
- Focus visible partout. Taille cible tap ≥ 40×40 px.
- Contenu lisible à 320 px de large; éviter le texte minuscule.

---

### 9) SEO & partage
- Métadonnées Open Graph complètes, `og:image` ≥ 1200×630.
- Prévoir paramètre `fb:app_id` si app dispo (sinon non bloquant).

---

### 10) Performances
- Images optimisées; chargement paresseux; éviter gros scripts bloquants.
- Réutiliser composants; pas de recalculs inutiles.

---

### 11) Non‑négociables (à respecter lors d’une refonte IA)
- Continuité UX: header sticky, panier visible, feedback immédiat.
- Défilement carrousel réellement continu (sans saut perceptible).
- États hover/focus/active systématiques et cohérents.
- Remises visibles là où pertinentes (badge discret mais clair).

---

### 12) Garde‑fous palette (si nouveau logo)
Procédure automatique (suggestion):
1. Extraire 3–5 couleurs dominantes du logo (méthode k‑means).
2. Sélectionner la dominante comme `primary`; une analogue/complémentaire en `secondary`; celle la plus vive en `accent`.
3. Générer une échelle de tons (HSL) ±10–30% pour hovers/actives.
4. Construire neutres indépendants (gris chauds) garantissant contraste AA.

---

### 13) Prompt réutilisable pour IA (modèle)

Copiez/collez, puis remplacez les crochets par vos infos.

```
Tu es un designer‑développeur. Refonds un site existant au style ci‑dessous en adaptant la PALETTE au logo fourni, sans réutiliser les couleurs originales.

Contexte:
- Nom de marque: [BRAND_NAME]
- Logo: [LOGO_URL]
- Site à refondre (référence structure/contenus): [TARGET_SITE_URL]

Contraintes de style (à suivre fidèlement):
1) Essence: artisanal, chaleureux, moderne, accessible.
2) Grille: max‑width 1200 px; gouttières 16/24/32 (mobile/tab/desk).
3) Typo: sans‑serif moderne; échelle 32→48 (display), 28→40 (H1), 22→28 (H2), 18→22 (H3), corps 16, petit 14.
4) Couleurs: dérive `primary`, `secondary`, `accent` du logo; neutres gris chauds; AA. Hover ±8–12%, focus ring 2 px secondary 50–60%.
5) Composants clés: header sticky (logo, menu/hamburger, panier compact), cards produits (prix en haut‑droite, compteur au bas), compteur ± avec symbole qui s’amplifie au hover, toasts (mobile top‑center, desktop bottom‑right), carrousel décoratif auto continu + flèches + swipe + lightbox après 3s de survol.
6) Pages: menu, panier, commande (adresse auto‑complétée), confirmation, légales.
7) Accessibilité: focus visible, cibles 40×40, contraste AA.
8) SEO/OG: og:image ≥ 1200×630, metadata complètes.

Livrables:
- Composants réutilisables, styles en tokens (voir ci‑dessous), pages assemblées.
- Palette dérivée du logo + mapping tokens.

Tokens (exiger ces noms):
- Couleurs: --color-primary, --color-secondary, --color-accent, --color-text, --color-bg, --color-border
- Rayons: --radius-sm=6px, --radius-md=10px, --radius-full=9999px
- Ombres: --shadow-sm/md/lg (subtiles)
- Spacing: 4/8/12/16/20/24/32/40
- (Tailwind) brand-primary, brand-secondary, brand-text, brand-background

Rappels non‑négociables:
- Carrousel réellement continu, zoom lightbox (pause/reprise), symboles ± qui grossissent au hover, toasts positionnés selon device.
- N’emploie pas la palette d’origine; dérive‑la du logo donné.
```

---

### 14) Check‑list d’acceptation
- [ ] Palette correctement dérivée du logo; contrastes AA OK.
- [ ] Header sticky + panier compact + menu/hamburger.
- [ ] Cartes produits conformes (prix/compteur).
- [ ] Compteur ± avec effets lisibles au hover.
- [ ] Carrousel continu + flèches + swipe + lightbox 3 s.
- [ ] Toasts placements/animations OK.
- [ ] Pages panier/commande/confirmation/légales présentes.
- [ ] Focus visibles; tailles cibles suffisantes.
- [ ] OG/SEO complets (image ≥ 1200×630).


