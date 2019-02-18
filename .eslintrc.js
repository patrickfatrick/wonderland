module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
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
    ]
  },
}