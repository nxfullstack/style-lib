import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/angular/generators';
import generator from './generator';
import { NgAddGeneratorSchema } from './schema';
import initGenerator from '../init/generator';

describe('ng-add generator', () => {
  let appTree: Tree;
  const options: NgAddGeneratorSchema = {
    angularApplication: 'client',
    styleLibrary: 'style',
  };

  beforeAll(async () => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });

    await applicationGenerator(appTree, {
      name: 'client',
    });
    await initGenerator(appTree, { name: 'style' });
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'style');
    expect(config).toBeDefined();
  });

  it('should have added a new stylesheet to the application', async () => {
    const config = readProjectConfiguration(appTree, 'client');
    expect(config.targets.build.options.styles.length).toBeGreaterThan(1);
    expect(
      config.targets.build.options.stylePreprocessorOptions.includePaths.length
    ).toBeGreaterThanOrEqual(1);
    expect(appTree.exists(`apps/client/src/lib.scss`)).toBeTruthy();
  });
});
