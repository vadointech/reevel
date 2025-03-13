import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import stylistic from '@stylistic/eslint-plugin'

export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2021,
            },
        }
    },
    {
      ignores: ["node_modules", "dist", ".next", "public"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        plugins: {
            "@stylistic": stylistic
        },
        rules: {
            "no-console": "warn",
            "no-unused-vars": "off",
            "no-empty-pattern": "warn",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_" }],
            "@typescript-eslint/no-empty-object-type": "warn",

            // Stylistic rules
            "@stylistic/indent": ["error", 4],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/comma-dangle": ["error", "always-multiline"],
            "@stylistic/space-before-function-paren": ["error", "never"]
        }
    },
]