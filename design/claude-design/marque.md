# NYEMA — Design system

> **Statut** : marque validée par les fondateurs le 25/10/2026 (#20). Texte d'origine conservé ci-dessous ; la recherche d'antériorité juridique (dossier §8) relève d'une démarche distincte.

Source : `uploads/NYEMA_Dossier_Technique_Strategique.pdf` (dossier de cadrage, 25/10/2026). NYEMA = marque mère d'un portefeuille de produits numériques pour le Mali et l'Afrique (AI, ID, GOV, OFFLINE, TRUST, DATA, COMMERCE OS, CIVIC, AGRO, EDU, OPEN AFRICA, ENERGY, CORE, SOVEREIGN AI, DEV AFRICA). Priorité n°1 : le site officiel.

## Index
- `Design System.dc.html` — référence visuelle complète (marque, couleur, type, grille, composants, ton).
- `Site NYEMA.dc.html` — page d'accueil du site officiel.
- `styles.css` → `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`.
- `assets/` — symbole NYEMA (sombre, clair, mono noir, mono blanc).

## Marque
Symbole : un N géométrique sur grille 48, dont l'angle supérieur droit est détaché en un carré latérite — le « nœud ». Il représente le point de données, le capteur, la connexion qui revient. Logotype : NYEMA en Archivo 700, chasse étendue (118 %), interlettrage +0,04em. Zone de protection = 1 module (largeur d'une barre). Taille minimale : 16 px (symbole), 72 px (logo complet). Version provisoire : à valider par les fondateurs et après recherche de marque (cf. dossier §8).

## Content fundamentals
- Français, vouvoiement, phrases déclaratives et factuelles. Pas d'emoji.
- Ne jamais annoncer comme disponible un produit en idée. Chaque produit porte un statut : Recherche, Prototype, Pilote, Disponible.
- Aucun client, partenaire, chiffre, adresse ou domaine inventé.
- Pas de clichés visuels ou verbaux sur l'Afrique. On parle de réalités opérationnelles : réseau instable, mobile, hors ligne, langues locales.
- Labels techniques en mono majuscules (« 02 — OFFRES »), titres en phrase normale avec point final.

## Visual foundations
- Fond anthracite (#0E0F0E) pour le site, papier (#F2F0EA) pour les documents. Une seule couleur d'accent : latérite #E2602E. Couleurs de statut réservées aux badges.
- Type : Archivo (variable, axe de chasse) pour tout ; JetBrains Mono pour labels, codes produits, métadonnées.
- Système graphique : grille de modules carrés, filets 1 px, le carré-nœud du logo réutilisé comme puce, indicateur et motif animé (grille de signaux).
- Angles vifs (radius 0, 2 px max). Pas d'ombres portées ; la profondeur vient des filets et des aplats ink-900.
- Hover : fond ink-900 + apparition de l'accent. Press : translation 1 px. Transitions 140–240 ms, ease-out, jamais de rebond.
- Imagerie : produits réels et schémas d'architecture. Pas de photos de stock.
- Accessibilité : contrastes AA minimum, focus visible (contour latérite 2 px), navigation clavier.

## Iconography
Pas de set d'icônes propriétaire. Le système utilise le carré-nœud, les flèches typographiques (→ ↗) et les signes + / −. Si un set est requis plus tard : Lucide (trait 1,5 px) depuis CDN.
