module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'docs', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'ci', release: 'patch' },
          { type: 'chore', release: 'patch' },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
        presetConfig: {
          types: [
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'chore', hidden: true, section: 'Other' },
            { type: 'docs', section: 'Documentation' },
            { type: 'style', section: 'Style' },
            { type: 'refactor', section: 'Other' },
            { type: 'perf', section: 'Other' },
            { type: 'test', section: 'Other' },
            { type: 'ci', section: 'CI/CD' },
          ],
        },
      },
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist/packages/style-lib',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: ['dist/packages/style-lib/*.tgz'],
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
      },
    ],
  ],
};
