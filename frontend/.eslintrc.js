module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: [
    "react-app",
    "prettier"
  ],
  plugins: [
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": "warn"
  }
};
