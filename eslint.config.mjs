// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    ignores: [
      // the node_modules and dist directories are ignored
      'node_modules',
      'dist',
    ],
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      prettier, // Use Prettier as an object
    },
    rules: {
      semi: ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'max-len': ['error', { code: 100 }],
      'no-console': 'warn',
      indent: ['warn', 2],
      eqeqeq: 'error',
      curly: 'error',
      camelcase: ['error', { properties: 'always' }],
      'prettier/prettier': ['error'], // Add Prettier as a rule
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
