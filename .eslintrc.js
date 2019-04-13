module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  plugins: [
    'react-hooks'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    babelOptions: {
      configFile: "./.babelrc.js"
    }
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '*.config.*',
        ]
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'quotes': ['error', 'double']
  },
}