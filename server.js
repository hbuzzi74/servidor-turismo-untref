const express = require("express");
const { connectToMongoDB, disconnectFromMongoDB } = require("./src/mongodb");
const cors = require("cors");
// const { disconnect } = require("process");
const app = express();
process.loadEnvFile();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Realizar el intercambio de información en formato JSON

// Encabezado y acceso al middelware
app.use((req, res, next) => {
  req.header("Content-Type", "application/json; charset=utf-8");
  next();
});

// Ruta de inicio
app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API de Destinos!");
});

// Inicializar el listener
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

// Obtener todos los destinos de la base de datos
app.get("/destinos", async (req, res) => {
  console.log("La URL recibida es: " + req.url);

  try {
    // Conexión a la base de datos
    const client = await connectToMongoDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    const db = await client.db("destinos"); // Acceder a la base de datos de destinos
    const destinos = await db.collection("destinos").find().toArray(); // Obtener todo el contenido de la base
    destinos.length === 0
      ? res.status(404).send("No hay destinos en la base de datos")
      : res.status(200).json(destinos);
  } catch (error) {
    res
      .status(500)
      .send("Error al obtener los destinos de la base de datos: " + error);
  } finally {
    await disconnectFromMongoDB();
  }
});
