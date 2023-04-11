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
          { type: 'test', release: 'patch' },
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
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    'semantic-release-license',
    /**
     * - udpates the version in package.json in the built application
     * - leaves the tarball in dist/packages (so github can pick it up)
     * - publishes to NPM
     */
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist/packages/style-lib',
        tarballDir: 'dist/packages',
      },
    ],
    // update the package.json in the sub-directory packages/style-lib
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'packages/style-lib',
        npmPublish: false,
      },
    ],
    // update the root package.json version
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [{ path: 'dist/**/*.tgz', label: 'Package Tarball' }],
      },
    ],

    [
      '@semantic-release/git',
      {
        assets: [
          'package.json',
          'CHANGELOG.md',
          'LICENSE',
          'packages/style-lib/package.json',
          'yarn.lock',
        ],
      },
    ],
  ],
};
