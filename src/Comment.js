const connectDB = require("./db");
const { logError } = require("./errorHandler");
const { ObjectId } = require("mongodb");

class Comment {
  constructor(content, authorId, postId) {
    // --- Validação de Presença ---
    if (typeof content !== "string" || content.trim() === "") {
      throw new Error("O conteúdo do comentário é obrigatório.");
    }
    if (!authorId) {
      throw new Error("É necessária a identificação do autor.");
    }
    if (!postId) {
      throw new Error("É necessária a identificação da postagem.");
    }

    this.content = content.trim();
    this.authorId = new ObjectId(authorId);
    this.postId = new ObjectId(postId);
  }

  async save() {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;
      const result = await db.collection("comments").insertOne({
        content: this.content,
        authorId: this.authorId,
        postId: this.postId,
      });
      return result;
    } catch (error) {
      logError(error, "Comment.save");
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
      return await db.collection("comments").findOne({ _id: new ObjectId(id) });
    } catch (error) {
      logError(error, "Comment.findById");
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
        .collection("comments")
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
      return this.findById(id);
    } catch (error) {
      logError(error, "Comment.findByIdAndUpdate");
    } finally {
      if (client) await client.close();
    }
  }

  static async findByIdAndDelete(id) {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;
      return await db
        .collection("comments")
        .deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      logError(error, "Comment.findByIdAndDelete");
    } finally {
      if (client) await client.close();
    }
  }
}

module.exports = Comment;
