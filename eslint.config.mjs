import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import unicorn from 'eslint-plugin-unicorn';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  // File naming: kebab-case 
  {
    plugins: { unicorn },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [
            // Next.js special files must stay as-is
            /^(page|layout|route|middleware|not-found|error|loading|template|default)\.(ts|tsx)$/,
            // Config files
            /\.(config|test|spec)\.(js|ts|mjs|cjs)$/,
          ],
        },
      ],
    },
  },

  // React
  {
    rules: {
      // Self-closing tags 
      'react/self-closing-comp': ['warn', { component: true, html: false }],

      // target="_blank" 
      'react/jsx-no-target-blank': 'error',

      // Array index
      'react/no-array-index-key': 'warn',

      // Boolean
      'react/jsx-boolean-value': ['warn', 'never'],

      // Braces
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

      // Hooks 
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General 
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'no-implicit-coercion': ['warn', { boolean: false }],

      // TS
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
    },
  },
]);

export default eslintConfig;
