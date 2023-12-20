/**
 * Resolves style imports `styles.xyz` to `xyz`
 */
module.exports = new Proxy(
  {},
  {
    get(target, name) {
      return new Proxy(
        {},
        {
          get(target, name) {
            return String(name);
          },
        },
      );
    },
  },
);
