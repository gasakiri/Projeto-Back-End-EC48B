// Post.js
const connectDB = require("./db");
const { logError } = require("./errorHandler");
const { ObjectId } = require("mongodb");

class Post {
  constructor(content, authorId) {
    // --- Validação de Presença ---
    if (typeof content !== "string" || content.trim() === "") {
      throw new Error("O conteúdo da postagem é obrigatório.");
    }
    if (!authorId) {
      throw new Error("É necessária a identificação do autor.");
    }

    this.content = content.trim();
    this.authorId = new ObjectId(authorId);
  }

  async save() {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;
      const result = await db.collection("posts").insertOne({
        content: this.content,
        authorId: this.authorId,
      });
      return result;
    } catch (error) {
      logError(error, "Post.save");
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
      return await db.collection("posts").findOne({ _id: new ObjectId(id) });
    } catch (error) {
      logError(error, "Post.findById");
    } finally {
      if (client) await client.close();
    }
  }

  static async findByIdAndUpdate(id, updateData) {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;
      await db
        .collection("posts")
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
      return this.findById(id);
    } catch (error) {
      logError(error, "Post.findByIdAndUpdate");
    } finally {
      if (client) await client.close();
    }
  }

  static async findByIdAndDelete(id) {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;
      return await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      logError(error, "Post.findByIdAndDelete");
    } finally {
      if (client) await client.close();
    }
  }
}

module.exports = Post;
