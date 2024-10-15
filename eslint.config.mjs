// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    ignores: [
      // the node_modules and dist directories are ignored
      'node_modules',
      'dist'
    ]
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { parser: tsParser, globals: globals.browser } },
  {
    plugins: {
      prettier // Use Prettier as an object
    },
    rules: {
      'keyword-spacing': ['error', { before: true, after: true }],
      eqeqeq: 'error',
      'prettier/prettier': ['error']
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
