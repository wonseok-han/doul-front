// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
// https://github.com/yannickcr/eslint-plugin-react

const OVERRIDE_ESLINT = {
  files: ['**/*.ts', '**/*.tsx'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [OVERRIDE_ESLINT],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
    'no-unused-vars': 'error', // 사용하지 않는 변수 선언 금지
    '@typescript-eslint/no-implied-eval': 'error', // eval 사용금지
    'no-duplicate-imports': 'error', // 중복 Import 금지
    'no-extra-parens': 'error', // 불필요한 괄호 금지
    '@typescript-eslint/prefer-optional-chain': ['error'], // && 대신 OptionalChaining 표현식을 사용하는 것을 선호합니다.
    '@typescript-eslint/no-for-in-array': ['off'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx', '.d.ts'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
