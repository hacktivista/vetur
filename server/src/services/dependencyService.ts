import * as path from 'path';

const enum State {
  Loaded,
  Unloaded
}

interface UnloadedDependency {
  name: string;
  state: State.Unloaded;
}

interface LoadedDependency<T> {
  name: string;
  state: State.Loaded;
  version: string;
  bundled: boolean;
  module: T;
}

type RuntimeDependency<T> = LoadedDependency<T> | UnloadedDependency;

type T_PrettyHtml = typeof import('@starptech/prettyhtml');
type T_ESLint = typeof import('eslint');
type T_ESLintPluginVue = typeof import('eslint-plugin-vue');
type T_JSBeautify = typeof import('eslint-plugin-vue');
type T_Prettier = typeof import('prettier');
// type T_PrettierEslint = typeof import('prettier-eslint');
type T_StylusSupremacy = typeof import('stylus-supremacy');
type T_TypeScript = typeof import('typescript');

interface VLSDependencies {
  prettyhtml: RuntimeDependency<T_PrettyHtml>;
  eslint: RuntimeDependency<T_ESLint>;
  eslintPluginVue: RuntimeDependency<T_ESLintPluginVue>;
  jsbeautify: RuntimeDependency<T_JSBeautify>;
  prettier: RuntimeDependency<T_Prettier>;
  // prettierEslint: RuntimeDependency<T_PrettierEslint>;
  stylusSupremacy: RuntimeDependency<T_StylusSupremacy>;
  typescript: RuntimeDependency<T_TypeScript>;
}

export class DependencyService {
  private dependencies: VLSDependencies = {
    prettyhtml: { name: 'prettyhtml', state: State.Unloaded },
    eslint: { name: 'eslint', state: State.Unloaded },
    eslintPluginVue: { name: 'eslint-plugin-vue', state: State.Unloaded },
    jsbeautify: { name: 'js-beautify', state: State.Unloaded },
    prettier: { name: 'prettier', state: State.Unloaded },
    // prettierEslint: { name: 'prettier-eslint', state: State.Unloaded },
    stylusSupremacy: { name: 'stylus-supremacy', state: State.Unloaded },
    typescript: { name: 'typescript', state: State.Unloaded }
  };

  constructor() {}

  async init(workspacePath: string) {
    const workspaceTSPath = path.resolve(workspacePath, 'node_modules/typescript');
    const tsModule = await import(workspaceTSPath);

    this.dependencies.typescript = {
      name: 'typecript',
      state: State.Loaded,
      version: '1.0.0',
      bundled: true,
      module: tsModule
    };
  }

  getDependency(d: keyof VLSDependencies) {
    if (!this.dependencies[d]) {
      return undefined;
    }

    return this.dependencies[d];
  }
}
