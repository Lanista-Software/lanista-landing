// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  astro: true,
  typescript: true,
  rules: {
    'node/prefer-global/process': 'off',
    'ts/consistent-type-definitions': 'off',
  },
  ignores: [
    '**/*.md',
    '**/*.json',
    'dist',
    '.astro',
    '.contentrain/client',
  ],
})
