const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/micro-blogging-db";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
