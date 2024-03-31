module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // plugins: ['@typescript-eslint', 'vue'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/electron',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    curly: ['error'],
    //   "import/no-unresolved": "off",
    //   "import/order": [
    //     "error",
    //     {
    //       "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
    //       "pathGroups": [
    //         {
    //           "pattern": "react",
    //           "group": "external",
    //           "position": "before"
    //         }
    //       ],
    //       "pathGroupsExcludedImportTypes": ["react"]
    //     }
    //   ]
  },
};
