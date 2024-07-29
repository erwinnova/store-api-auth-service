const fastifyJwt = require("@fastify/jwt");
const fastifyPlugin = require("fastify-plugin");

const authPlugin = (server, undefined, done) => {
  server.register(fastifyJwt, { secret: process.env.JWT_SECRET });

  server.decorate("authenticate", async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (error) {
      reply.send(error);
    }
  });

  done();
};

module.exports = fastifyPlugin(authPlugin);
