const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "micro-blogging-db";

const connectDB = async () => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    return { db, client }; // Retorna o db e o client
  } catch (error) {
    console.error("Erro fatal ao conectar com o MongoDB:", error.message);
    throw error;
  }
};

module.exports = connectDB;
