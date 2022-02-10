// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
// https://github.com/yannickcr/eslint-plugin-react

const OVERRIDE_ESLINT = {
  files: ["**/*.ts", "**/*.tsx"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "import"],
  overrides: [OVERRIDE_ESLINT],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "react/jsx-filename-extension": ["error", { extensions: [".ts", ".tsx"] }],
    "no-unused-vars": "off", // 사용하지 않는 변수 선언 금지
    "@typescript-eslint/no-implied-eval": "error", // eval 사용금지
    "no-duplicate-imports": "error", // 중복 Import 금지
    "@typescript-eslint/prefer-optional-chain": ["error"], // && 대신 OptionalChaining 표현식을 사용하는 것을 선호합니다.
    "react/react-in-jsx-scope": "off", // JSX를 사용할 때 누락된 React 방지
    // 'no-unsafe-assignment': 'off',
    // 'import/order': [
    //   'error',
    //   {
    //     groups: [
    //       'builtin', // Built-in types are first
    //       ['sibling', 'parent'], // Then sibling and parent types. They can be mingled together
    //       'index', // Then the index file
    //       'object',
    //       // Then the rest: internal and external type
    //     ],
    //     pathGroupsExcludedImportTypes: ['builtin'],
    //     alphabetize: {
    //       order: 'ignore',
    //       caseInsensitive: true,
    //     },
    //     'newlines-between': 'always',
    //   },
    // ],
  },
  ignorePatterns: ["node_modules/"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".d.ts"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx", ".d.ts"],
        moduleDirectory: ["node_modules", "src"],
      },
    },
  },
};
