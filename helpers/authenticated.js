const auth = (server) => ({
  onRequest: (req, reply) => {
    server.authenticate(req, reply);
  },
});

module.exports = auth;
