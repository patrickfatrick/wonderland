module.exports = {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-order"],
  rules: {
    "at-rule-no-unknown": [true, {
      ignoreAtRules: [/^lost-?/],
    }],
    "property-no-unknown": [true, {
      ignoreProperties: [/^lost-/],
    }],
    "order/properties-alphabetical-order": true,
  },
};
