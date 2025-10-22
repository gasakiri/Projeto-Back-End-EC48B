const connectDB = require("./db");
const { logError } = require("./errorHandler");
const { ObjectId } = require("mongodb");

class User {
  constructor(username, email, password) {
    // --- Validação de Presença e Formato (required, trim) ---
    if (typeof username !== "string" || username.trim() === "") {
      throw new Error("O nome de usuário é obrigatório.");
    }
    if (typeof email !== "string" || email.trim() === "") {
      throw new Error("O e-mail é obrigatório.");
    }
    if (typeof password !== "string" || password.trim() === "") {
      throw new Error("A senha é obrigatória.");
    }

    // Limpa e atribui os dados
    this.username = username.trim();
    this.email = email.trim().toLowerCase();
    this.password = password;
  }

  async save() {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;

      // --- Validação de Unicidade (unique) ---
      const existingUser = await db.collection("users").findOne({
        $or: [{ username: this.username }, { email: this.email }],
      });

      if (existingUser) {
        throw new Error("Nome de usuário ou e-mail já cadastrado.");
      }

      // Se passou na validação, insere no banco
      const result = await db.collection("users").insertOne({
        username: this.username,
        email: this.email,
        password: this.password,
      });
      return result;
    } catch (error) {
      logError(error, "User.save");
      throw error;
    } finally {
      if (client) await client.close();
    }
  }

  // Métodos estáticos para operar na coleção
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
      // Retorna o usuário atualizado
      if (result.modifiedCount > 0) {
        return this.findById(id);
      }
      return null;
    } catch (error) {
      logError(error, "User.findByIdAndUpdate");
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
    } finally {
      if (client) await client.close();
    }
  }
}

module.exports = User;
