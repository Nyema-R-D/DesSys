import { resetDeprecationWarnings, warnDeprecated } from './deprecation';

describe('warnDeprecated', () => {
  afterEach(() => {
    resetDeprecationWarnings();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('avertit une seule fois par API, avec remplacement et version de retrait', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    warnDeprecated('Button variant="ghost"', {
      replacement: 'variant="secondary"',
      removal: 'v2.0.0',
    });
    warnDeprecated('Button variant="ghost"', {
      replacement: 'variant="secondary"',
      removal: 'v2.0.0',
    });
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]![0]).toContain(
      'sera retiré en v2.0.0. Utilisez « variant="secondary" ».',
    );
  });

  it('reste silencieux en production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    warnDeprecated('X', { removal: 'v2.0.0' });
    expect(warn).not.toHaveBeenCalled();
  });
});
