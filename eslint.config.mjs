// @ts-check
import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    rules: {
      // Daha önceki ayarlarını buraya taşıyoruz
      'node/prefer-global/process': 'off',
      'ts/consistent-type-definitions': 'off',
      'import/first': 'off',
    },
    // `dist` is a symlink to .output/public — without these, ESLint walks into
    // the generated bundle and dies looking for a config next to it.
    ignores: [
      '**/pergel/**',
      '**/**.md',
      '**/**.json',
      'dist',
      '.output',
      '.contentrain/client',
    ], // Ignore kuralları
  }),
  {
    files: ['**/*.vue'],
    plugins: { tailwindcss: tailwind },
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
