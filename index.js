const Fastify = require("fastify");
require("dotenv").config();
const firstRoute = require("./routes/index.js");
const dbConnector = require("./db/connection.js");
const auth = require("./plugins/auth.js");

const fastify = Fastify({
  logger: true,
});

fastify.register(dbConnector);
fastify.register(auth);
fastify.register(firstRoute, { prefix: "/auth" });

fastify.listen(
  { port: parseInt(process.env.PORT) || 3000 },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // Server is now listening on ${address}
  }
);
