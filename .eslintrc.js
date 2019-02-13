module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-mixed-spaces-and-tabs': [0,false],
    'no-tabs':'on',
    'eol-last':0,
    'space-before-function-paren': 0,
    'no-else-return': ['error', { allowElseIf: true }],
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    semi: 'off',
    'prefer-const': 'error',
    'no-var': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
