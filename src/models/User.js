const connectDB = require("../config/db");
const { logError } = require("../config/errorHandler");
const { ObjectId } = require("mongodb");

class User {
  static async create(userData) {
    let client;
    try {
      // Validação de Presença e Formato
      if (
        typeof userData.username !== "string" ||
        userData.username.trim() === ""
      ) {
        throw new Error("O nome de usuário é obrigatório.");
      }
      if (typeof userData.email !== "string" || userData.email.trim() === "") {
        throw new Error("O e-mail é obrigatório.");
      }
      if (
        typeof userData.password !== "string" ||
        userData.password.trim() === ""
      ) {
        throw new Error("A senha é obrigatória.");
      }

      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;

      const username = userData.username.trim();
      const email = userData.email.trim().toLowerCase();
      const password = userData.password;

      // Validação de Unicidade
      const existingUser = await db.collection("users").findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        throw new Error("Nome de usuário ou e-mail já cadastrado.");
      }

      // Insere no banco
      const result = await db.collection("users").insertOne({
        username,
        email,
        password,
      });

      // Retorna o usuário criado
      return await db.collection("users").findOne({ _id: result.insertedId });
    } catch (error) {
      logError(error, "User.create");
      throw error;
    } finally {
      if (client) await client.close();
    }
  }

  static async findById(id) {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });

      return user;
    } catch (error) {
      logError(error, "User.findById");
      throw error;
    } finally {
      if (client) await client.close();
    }
  }

  static async findByIdAndUpdate(id, updateData) {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;
      const result = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

      if (result.modifiedCount > 0) {
        return await db.collection("users").findOne({ _id: new ObjectId(id) });
      }
      return null;
    } catch (error) {
      logError(error, "User.findByIdAndUpdate");
      throw error;
    } finally {
      if (client) await client.close();
    }
  }

  static async findByIdAndDelete(id) {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;
      const result = await db
        .collection("users")
        .deleteOne({ _id: new ObjectId(id) });

      return result;
    } catch (error) {
      logError(error, "User.findByIdAndDelete");
      throw error;
    } finally {
      if (client) await client.close();
    }
  }
  static async findByEmail(email) {
    let client;
    try {
      // Normaliza o email para minúsculas para garantir a busca correta
      const normalizedEmail = email.trim().toLowerCase();
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;

      const user = await db
        .collection("users")
        .findOne({ email: normalizedEmail });

      return user;
    } catch (error) {
      logError(error, "User.findByEmail");
      throw error;
    } finally {
      if (client) await client.close();
    }
  }
}

module.exports = User;
