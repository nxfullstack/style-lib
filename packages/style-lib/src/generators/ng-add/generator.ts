import {
  addProjectConfiguration,
  ensurePackage,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  ProjectConfiguration,
  readProjectConfiguration,
  TargetConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { NgAddGeneratorSchema } from './schema';
import * as path from 'path';

interface NormalizedSchema extends NgAddGeneratorSchema {
  angularProjectConfig: ProjectConfiguration;
  styleProjectConfig: ProjectConfiguration;
}

function normalizeSchema(
  tree: Tree,
  options: NgAddGeneratorSchema
): NormalizedSchema {
  const ngConfig = readProjectConfiguration(tree, options.angularApplication);
  const styleConfig = readProjectConfiguration(tree, options.styleLibrary);

  return {
    ...options,
    angularProjectConfig: ngConfig,
    styleProjectConfig: styleConfig,
  };
}

function updateAppConfig(tree: Tree, options: NormalizedSchema) {
  const styleSourceRoot = options.styleProjectConfig.sourceRoot;
  const ngBuildTarget: TargetConfiguration =
    options.angularProjectConfig.targets?.['build'];
  if (!ngBuildTarget) {
    throw new Error(
      `No build target found for application ${options.angularApplication}`
    );
  }
  const existingOpts = { ...ngBuildTarget.options };

  const updatedConfig = {
    ...options.angularProjectConfig,
    targets: {
      ...options.angularProjectConfig.targets,
      build: {
        ...ngBuildTarget,
        options: {
          ...existingOpts,
          styles: [
            ...existingOpts.styles,
            `${options.angularProjectConfig.sourceRoot}/app/lib.scss`,
          ],
          stylePreprocessorOptions: {
            includePaths: [styleSourceRoot],
          },
        },
      },
    },
  };

  updateProjectConfiguration(tree, options.angularApplication, updatedConfig);
}

// async function updateMainStyles(tree: Tree, options: NormalizedSchema) {
//   const stylesFile = `${options.angularProjectConfig.sourceRoot}/styles.scss`;
//   const content = fs.readFileSync(stylesFile).toString().split('\n');
//   content.splice(0, 0, `@use 'main';`);
//   const newContent = content.join('\n');

//   fs.writeFile(stylesFile, newContent, (err) => {
//     if (err) return err;
//   });
// }

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.styleLibrary),
    offsetFromRoot: offsetFromRoot(options.angularProjectConfig.root),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.angularProjectConfig.root,
    templateOptions
  );
}

/**
 * Integrates a local style library with an Angular application.
 *
 * The specified application's `project.json` file is updated so that it's build target options include `stylePreprocessorOptions` that point to the style library. It also adds a secondary stylesheet which imports the style library;
 *
 * @category Generators
 *
 * @name ng-add
 *
 * @example
 *
 * $ nx g @nx-fullstack/style-lib:ng-add \
 *   --angularApplication my-app \
 *   --styleLibrary my-style-lib
 *
 * @param tree
 * @param options
 */
export default async function (tree: Tree, options: NgAddGeneratorSchema) {
  const normalizedOptions = normalizeSchema(tree, options);
  updateAppConfig(tree, normalizedOptions);
  // updateMainStyles(tree, normalizedOptions);
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
