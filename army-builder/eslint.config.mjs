import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ESLint recommended rules
  js.configs.recommended,

  // Next.js rules
  ...compat.extends(`next/core-web-vitals`),

  // Stylistic rules
  stylistic.configs.customize({
    indent: 2,
    quotes: `backtick`, // Prefers template literals (backticks)
    semi: true,
    jsx: true,
  }),

  // Custom configuration for all files
  {
    files: [`**/*.js`, `**/*.jsx`, `**/*.ts`, `**/*.tsx`],
    ignores: [`eslint.config.mjs`], // Exclude config file from strict rules
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Enforce template literals over string concatenation
      [`prefer-template`]: `error`,

      // No unused variables
      [`no-unused-vars`]: [`error`, {
        argsIgnorePattern: `^_`,
        varsIgnorePattern: `^_`,
      }],

      // Line length limit
      [`@stylistic/max-len`]: [`error`, {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      }],

      // Consistent quote usage - prefer template literals
      [`@stylistic/quotes`]: [`error`, `backtick`, {
        allowTemplateLiterals: `always`,
        avoidEscape: true,
      }],

      // Other useful rules
      [`no-console`]: [`warn`, { allow: [`warn`, `error`] }],
      [`no-debugger`]: `error`,
      [`no-duplicate-imports`]: `error`,
      [`prefer-const`]: `error`,
    },
  },

  // Special configuration for test files
  {
    files: [`**/__tests__/**/*.js`, `**/*.test.js`, `**/*.spec.js`],
    languageOptions: {
      globals: {
        // Jest globals
        describe: `readonly`,
        test: `readonly`,
        it: `readonly`,
        expect: `readonly`,
        beforeEach: `readonly`,
        afterEach: `readonly`,
        beforeAll: `readonly`,
        afterAll: `readonly`,
        jest: `readonly`,
      },
    },
  },
];

export default eslintConfig;
