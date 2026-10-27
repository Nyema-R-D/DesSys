# %%TITLE%% — consignes pour Claude

- Outil NYEMA en %%FRAMEWORK%%, sur le design system `@nyema-r-d/*` v%%DS_VERSION%%. Avant de conclure : `pnpm check`.
- Interface : composants et tokens du design system uniquement (catalogue : https://github.com/Nyema-R-D/DesSys/wiki/Composants). Ne pas recréer un composant existant ; un manque se signale par une issue sur Nyema-R-D/DesSys.
- Styles : variables CSS des tokens (`var(--space-4)`, `var(--text-primary)`…), jamais de couleur en dur.
- Marque : un seul accent (latérite), couleurs de statut réservées aux badges, angles vifs, pas d'ombre, pas d'emoji dans l'UI.
- Commits et titres de PR : Conventional Commits en français.
- Bamanankan : à faire relire par un locuteur natif ; ne pas l'inventer avec assurance.
