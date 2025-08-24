module.exports = {
  env: {
    node: true,
    jest: true,
  },
  globals: {
    jest: true,
    global: true,
    require: true,
  },
  rules: {
    // Désactive les avertissements pour require() en CommonJS
    'import/no-commonjs': 'off',
    'global-require': 'off',
  },
};