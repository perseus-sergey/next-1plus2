import { defineConfig, globalIgnores } from 'eslint/config';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '**/*.test.tsx']),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooks,
      import: importPlugin,
      prettier,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: { ecmaFeatures: { jsx: true } },
    },

    rules: {
      ...nextPlugin.configs.recommended.rules,

      'prefer-template': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'comma-dangle': ['error', 'only-multiline'],

      'react/prop-types': 'off',
      'react/display-name': 'off',

      '@typescript-eslint/explicit-function-return-type': 'off',

      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      'import/extensions': 'off',
      'import/prefer-default-export': 'off',

      'import/no-anonymous-default-export': [2, { allowArrowFunction: true }],

      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-var-requires': 'off',

      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
