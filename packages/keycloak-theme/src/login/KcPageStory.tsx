import { createGetKcContextMock } from 'keycloakify/login/KcContext';
import type { DeepPartial } from 'keycloakify/tools/DeepPartial';
import { kcEnvDefaults, themeNames } from '../kc.gen';
import type { KcContext, KcContextExtension, KcContextExtensionPerPage } from './KcContext';
import KcPage from './KcPage';

const kcContextExtension: KcContextExtension = {
  themeName: themeNames[0]!,
  properties: { ...kcEnvDefaults },
};
const kcContextExtensionPerPage: KcContextExtensionPerPage = {};

/** Contextes Keycloak simulés, pour le développement (`pnpm dev`) et les tests. */
export const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension,
  kcContextExtensionPerPage,
  overrides: { realm: { displayName: 'Edge' }, locale: { currentLanguageTag: 'fr' } },
  overridesPerPage: {},
});

export function KcPageMock<PageId extends KcContext['pageId']>({
  pageId,
  overrides,
}: {
  pageId: PageId;
  overrides?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
}) {
  return <KcPage kcContext={getKcContextMock({ pageId, overrides })} />;
}
