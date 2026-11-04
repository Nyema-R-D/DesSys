import react from '@vitejs/plugin-react';
import { keycloakify } from 'keycloakify/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    keycloakify({
      themeName: 'nyema',
      accountThemeImplementation: 'none',
      // Keycloak 26 et suivants (Edge : 26.8) : une seule archive.
      keycloakVersionTargets: {
        '22-to-25': false,
        'all-other-versions': 'nyema-keycloak-theme.jar',
      },
    }),
  ],
});
