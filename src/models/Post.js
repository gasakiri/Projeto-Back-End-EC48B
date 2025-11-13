const connectDB = require("../config/db");
const { logError } = require("../config/errorHandler");
const { ObjectId } = require("mongodb");

class Post {
  static async create(postData) {
    let client;
    try {
      // Validação de Presença
      if (
        typeof postData.content !== "string" ||
        postData.content.trim() === ""
      ) {
        throw new Error("O conteúdo da postagem é obrigatório.");
      }
      if (!postData.authorId) {
        throw new Error("É necessária a identificação do autor.");
      }

      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;

      const result = await db.collection("posts").insertOne({
        content: postData.content.trim(),
        authorId: new ObjectId(postData.authorId),
      });

      return await db.collection("posts").findOne({ _id: result.insertedId });
    } catch (error) {
      logError(error, "Post.create");
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
      const post = await db
        .collection("posts")
        .findOne({ _id: new ObjectId(id) });

      return post;
    } catch (error) {
      logError(error, "Post.findById");
      throw error;
    } finally {
      if (client) await client.close();
    }
  }

  static async findAll() {
    let client;
    try {
      const { db, client: connectedClient } = await connectDB();
      client = connectedClient;
      const posts = await db.collection("posts").find({}).toArray();

      return posts;
    } catch (error) {
      logError(error, "Post.findAll");
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
        .collection("posts")
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

      return await db.collection("posts").findOne({ _id: new ObjectId(id) });
    } catch (error) {
      logError(error, "Post.findByIdAndUpdate");
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
        .collection("posts")
        .deleteOne({ _id: new ObjectId(id) });

      return result;
    } catch (error) {
      logError(error, "Post.findByIdAndDelete");
      throw error;
    } finally {
      if (client) await client.close();
    }
  }
}

module.exports = Post;
