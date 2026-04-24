const path = require('path');

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    path: '/admin',
    build: {
      dir: path.resolve(__dirname, '..', 'dist', 'build'),
    },
  },
});
