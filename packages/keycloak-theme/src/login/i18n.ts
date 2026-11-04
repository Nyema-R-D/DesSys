import { i18nBuilder } from 'keycloakify/login';
import type { ThemeName } from '../kc.gen';

/**
 * Messages de Keycloak (français, anglais…), sans surcharge pour l'instant. Le bamanankan ne
 * s'ajoutera qu'après relecture par un locuteur natif.
 * @see https://docs.keycloakify.dev/features/i18n
 */
// ofTypeI18n ne sert qu'à dériver le type I18n.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { useI18n, ofTypeI18n } = i18nBuilder.withThemeName<ThemeName>().build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
