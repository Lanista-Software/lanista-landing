// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    rules: {
      // Daha önceki ayarlarını buraya taşıyoruz
      'node/prefer-global/process': 'off',
      'ts/consistent-type-definitions': 'off',
      'import/first': 'off',
    },
    ignores: ['**/pergel/**', '**/**.md', '**/**.json'], // Ignore kuralları
  }),
  {
    files: ['**/*.vue'],
    rules: {
      'vue/html-self-closing': 'off', // Vue kuralları
      'tailwindcss/classnames-order': 'warn', // Tailwind kuralları
      'tailwindcss/enforces-negative-arbitrary-values': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/migration-from-tailwind-2': 'off',
      'tailwindcss/no-arbitrary-value': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
    },
  },
)
