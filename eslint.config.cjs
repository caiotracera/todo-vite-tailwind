/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@rocketseat/eslint-config/react',
    'plugin:tailwindcss/recommended',
    'plugin:eslint-plugin-tailwindcss',
    'simple-import-sort',
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
