const connectDB = require("./db");
const { logError } = require("./errorHandler");
const { ObjectId } = require("mongodb");

class Comment {
  static async create(commentData) {
    let client;
    try {
      // Validação de Presença
      if (typeof commentData.content !== "string" || commentData.content.trim() === "") {
        throw new Error("O conteúdo do comentário é obrigatório.");
      }
      if (!commentData.authorId) {
        throw new Error("É necessária a identificação do autor.");
      }
      if (!commentData.postId) {
        throw new Error("É necessária a identificação da postagem.");
      }

      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;

      const result = await db.collection("comments").insertOne({
        content: commentData.content.trim(),
        authorId: new ObjectId(commentData.authorId),
        postId: new ObjectId(commentData.postId),
      });

      return await db.collection("comments").findOne({ _id: result.insertedId });
    } catch (error) {
      logError(error, "Comment.create");
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
      const comment = await db.collection("comments").findOne({ _id: new ObjectId(id) });
      
      return comment;
    } catch (error) {
      logError(error, "Comment.findById");
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
        .collection("comments")
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
      
      return await db.collection("comments").findOne({ _id: new ObjectId(id) });
    } catch (error) {
      logError(error, "Comment.findByIdAndUpdate");
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
        .collection("comments")
        .deleteOne({ _id: new ObjectId(id) });
      
      return result;
    } catch (error) {
      logError(error, "Comment.findByIdAndDelete");
      throw error;
    } finally {
      if (client) await client.close();
    }
  }
}

module.exports = Comment;