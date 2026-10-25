// Conventional Commits. Le type pilote le versionnage (release-please) :
// feat → patch tant que < 1.0, fix → patch, feat! / BREAKING CHANGE → mineure tant que < 1.0.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      1,
      'always',
      ['tokens', 'react', 'config', 'reference', 'ci', 'docs', 'wiki', 'deps', 'release', 'repo'],
    ],
    'subject-case': [0],
    'body-max-line-length': [0],
  },
};
