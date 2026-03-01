module.exports = {
  root: true,
  ignorePatterns: ["node_modules/", ".netlify/", "docs/"],
  overrides: [
    {
      files: ["netlify/functions/**/*.js"],
      env: {
        node: true,
        es2022: true,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "script",
      },
      globals: {
        fetch: "readonly",
      },
      extends: ["eslint:recommended"],
      rules: {
        "no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
      },
    },
    {
      files: ["scripts/**/*.mjs"],
      env: {
        node: true,
        es2022: true,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        fetch: "readonly",
      },
      extends: ["eslint:recommended"],
      rules: {
        "no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
      },
    },
    {
      files: ["site/dashboard/assets/debug-tools.js"],
      env: {
        browser: true,
        es2022: true,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      extends: ["eslint:recommended"],
      rules: {
        "no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
      },
    },
  ],
};
