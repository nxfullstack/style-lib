---
slug: /style-lib/generators
---

# Generators

### `init`

Creates a style library in an Nx workspace

```shell
$ npm i -D @nx-fullstack/style-lib

$ nx g @nx-fullstack/style-lib:init my-style-lib
```

---

### `ng-add`

Integrates a local style library with an Angular application.

The specified application's `project.json` file is updated so that it's build target options include `stylePreprocessorOptions` that point to the style library. It also adds a secondary stylesheet which imports the style library;

```shell
$ npm i -D @nx-fullstack/style-lib

$ nx g @nx-fullstack/style-lib:ng-add \
  --angularApplication my-app \
  --styleLibrary my-style-lib
```
