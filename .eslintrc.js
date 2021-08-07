module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'no-console': 0,
    'global-require': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'no-use-before-define': 0,
    'no-unused-vars': 1,
    'react/display-name': 0,
  },
};
