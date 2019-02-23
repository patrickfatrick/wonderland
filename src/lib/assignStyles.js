/**
 * usage:
 * class Component {
 *   get height() {
 *     return 0;
 *   }
 *   get styles() {
 *     return assignStyles.bind(this)("height")
 *   }
 * }
 */
export default function (...attrs) {
  return attrs.reduce((styles, attr) => {
    const value = this[attr];
    if (value !== null && typeof value !== 'undefined') {
      styles[attr] = value; // eslint-disable-line no-param-reassign
    }
    return styles;
  }, {});
}
