const fastifyPlugin = require("fastify-plugin");
const fastifyMongo = require("@fastify/mongodb");
const mongoose = require("mongoose");

async function dbConnector(fastify, options) {
  await mongoose.connect("mongodb://localhost:27017/test_database");

  fastify.register(fastifyMongo, {
    url: "mongodb://localhost:27017/test_database",
  });
}

module.exports = fastifyPlugin(dbConnector);
