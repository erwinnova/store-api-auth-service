const { register, login } = require("../controllers/userController");
const auth = require("../helpers/authenticated");

async function routes(fastify, options) {
  fastify.post("/register", register);
  fastify.post("/login", login);
}

module.exports = routes;
