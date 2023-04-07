import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { applicationGenerator } from '@nrwl/angular/generators';
import { callRule } from '@nrwl/workspace/testing';
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
});
