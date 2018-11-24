const BASE_RULES = {
  'global-require': 'off',
  'import/no-dynamic-require': 'off',
  'import/prefer-default-export': 'off', // donnot require export default
  'max-len': 'off',
  'no-const-assign': 'warn',
  'no-this-before-super': 'warn',
  'no-undef': 'warn',
  'no-unreachable': 'warn',
  'no-unused-vars': 'off',
  'constructor-super': 'warn',
  'valid-typeof': 'warn',
  'no-else-return': 'warn',
  'jsx-a11y/href-no-hash': 'off',
  'class-methods-use-this': 'off',
  'vue/no-side-effects-in-computed-properties': 'warn',
  'no-bitwise': 'off',
  'no-continue': 'off',
};

const DEV_RULES = Object.assign({
  'no-debugger': 'off',
}, BASE_RULES);

const rules = require('os').platform() === 'darwin' ? DEV_RULES : BASE_RULES;

module.exports = {
  globals: {
    WEB_CONFIG: true, // loads vars from config file
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
  plugins: ['vue'],
  extends: [
    'plugin:vue/essential',
  ],
  rules,
};
