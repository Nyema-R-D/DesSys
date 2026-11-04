# Thème Keycloak

Les outils NYEMA qui connectent leurs utilisateurs par Keycloak (la console d'Edge en premier) les envoient sur la page de connexion de Keycloak. Le thème `nyema` lui donne l'apparence du système : logo, tokens, champs, boutons et messages des composants, thèmes anthracite et papier.

Source : `packages/keycloak-theme` ([Keycloakify](https://www.keycloakify.dev/)). Livré en archive JAR, pas sur GitHub Packages.

## Installer

1. Télécharger `nyema-keycloak-theme-vX.Y.Z.jar` dans les fichiers de la [release](https://github.com/Nyema-R-D/DesSys/releases). Il vise Keycloak 26 et suivants.
2. Vérifier l'archive : `gh attestation verify nyema-keycloak-theme-vX.Y.Z.jar --repo Nyema-R-D/DesSys`.
3. La placer dans `/opt/keycloak/providers/` (en Docker : un volume en lecture seule), puis redémarrer Keycloak.
4. Choisir le thème pour le domaine : `"loginTheme": "nyema"` dans le fichier d'import, ou Console d'administration → _Realm settings_ → _Themes_ → _Login theme_.

```yaml
# compose.yml
keycloak:
  image: quay.io/keycloak/keycloak:26.8.1
  volumes:
    - ./keycloak/nyema-keycloak-theme.jar:/opt/keycloak/providers/nyema-keycloak-theme.jar:ro
```

## Ce que fait le thème

- **Toutes les pages** de Keycloak (connexion, code à usage unique, clé d'accès, actions requises, erreurs, déconnexion…) passent par le même gabarit : `Logo`, sélecteur de langue (`LanguageSwitch`) si le domaine en propose plusieurs, nom du domaine en label mono latérite, titre, message de Keycloak en `Alert`.
- **Champs et boutons** : les classes de Keycloak sont remplacées par celles du design system (`ny-field`, `ny-button`…), sans CSS PatternFly.
- **Thème** : anthracite, papier quand le système de l'utilisateur est en mode clair.
- **Polices** servies par le thème : aucune requête externe.
- **Accessibilité** : les `tabindex` positifs des pages de Keycloak sont retirés (ordre de tabulation du document) ; chaque page est auditée par axe-core.
- **Langues** : messages français et anglais de Keycloak. Le bamanankan viendra après relecture par un locuteur natif.

## Développer

```bash
pnpm --filter @nyema-r-d/keycloak-theme dev        # page simulée : http://localhost:5173/?page=login-otp.ftl
pnpm --filter @nyema-r-d/keycloak-theme test       # pages principales + axe
pnpm --filter @nyema-r-d/keycloak-theme build:jar  # archive dans dist_keycloak/ (Maven requis)
```

La CI construit l'archive, la charge dans Keycloak 26.8.1 (version d'Edge) et vérifie que la page de connexion utilise le thème. La release la joint, attestée, aux fichiers publiés.
