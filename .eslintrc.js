module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  rules: {
    "no-unused-vars": ["error", {"argsIgnorePattern": ".*"}],
    "class-methods-use-this": "off",
    "global-require": "off"
  },
  "globals": {
    "chrome": false,
    "$": false,
    "window": false,
  }
};