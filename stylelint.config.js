module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [/^lost-?/],
    }],
    'property-no-unknown': [true, {
      ignoreProperties: [/^lost-/],
    }],
  },
};
