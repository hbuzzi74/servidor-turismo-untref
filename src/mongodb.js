const { MongoClient } = require("mongodb");

// process.loadEnvFile("./.env");

const dotenv = require("dotenv");
dotenv.config();

const MONGODB_CONNECTION_STRING =
  process.env.URL_PREFIX +
  process.env.USERNAME +
  ":" +
  process.env.PASS +
  process.env.URL_SUFFIX;

const client = new MongoClient(MONGODB_CONNECTION_STRING);

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
    return client;
  } catch (error) {
    console.error("Error al conectar a MongoDB: ", error);
    return null;
  }
};

const disconnectFromMongoDB = async () => {
  try {
    await client.close();
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al desconectar de MongoDB: ", error);
  }
};

module.exports = { connectToMongoDB, disconnectFromMongoDB };
