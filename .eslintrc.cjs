module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    // eslint 的规则
    "eslint:recommended",
    // vue 的规则
    "plugin:vue/vue3-essential",
    // vue ts 的规则
    "@vue/eslint-config-typescript"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
}
