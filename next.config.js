const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    skipWaiting: true,
    register: true,
  },
  future: {
    webpack5: true,
  },
});
