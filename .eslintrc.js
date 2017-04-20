module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  rules: {
    'no-unused-vars': [2, {'argsIgnorePattern': '.*'}],
    'class-methods-use-this': 0,
    'global-require': 0,
    'no-plusplus': 0
  },
  globals: {
    chrome: false,
    $: false,
    window: false,
    browser: false,
    fetch: true
  },
};