module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:import/recommended', 'plugin:import/typescript'],
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports', 'jest'],
  env: {
    'jest/globals': true,
  },
  globals: {
    React: true,
    JSX: true,
    document: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: '^_'}],
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': ['error', {tsx: 'never', json: 'always'}],
    'import/no-extraneous-dependencies': ['error', {devDependencies: ['**/*.test.ts', '**/*.test.tsx']}],
    indent: 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'max-len': 'off',
    'no-restricted-exports': 'off',
    'object-curly-newline': 'off',
    'object-curly-spacing': 'off',
    'operator-linebreak': 'off',
    'react-hooks/exhaustive-deps': 'off',
    // 'unused-imports/no-unused-imports': 'error',
    'wrap-iife': 'off',

    'prettier/prettier': [
      'error',
      {
        printWidth: 110,
        bracketSpacing: false,
        arrowParens: 'always',
        singleQuote: true,
        bracketSameLine: true,
        trailingComma: 'all',
      },
    ],

    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'index', 'parent', 'sibling'],
        alphabetize: {order: 'asc', caseInsensitive: true},
        pathGroups: [{pattern: 'react', group: 'builtin'}],
        pathGroupsExcludedImportTypes: [],
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        'global-require': 'off',
        'no-underscore-dangle': 'off',
      },
    },
  ],
};
