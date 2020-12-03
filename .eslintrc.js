module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: false,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    SwaggerEditor: false,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    linebreak-style: 0,
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
  },
};
