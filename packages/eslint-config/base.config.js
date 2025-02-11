import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

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
      ignores: ["node_modules", "dist", ".next"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        rules: {
            "indent": ["error", 4],
            "semi": ["error", "always"],
            "no-console": "warn",
            "no-unused-vars": "off",
            "no-empty-pattern": "warn",
            "quotes": ["error", "double"],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "^_" }],
            "@typescript-eslint/no-empty-object-type": "warn",
        }
    },
]