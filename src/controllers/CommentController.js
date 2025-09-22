const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { logError } = require("../utils/errorHandler");

class CommentController {
  /**
   * Cria um novo comentário a partir dos dados recebidos no corpo da requisição.
   * Comentário é vinculado a postagems existentes
   * Rota: POST /comments
   */
  async create(req, res) {
    try {
      const { content, authorId, postId: bodyPostId } = req.body;
      const postId = req.params?.postId || bodyPostId;

      const post = await Post.findById(postId);
      if (!post) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Postagem não encontrada" }));
      }

      const comment = new Comment({ content, authorId, postId });
      await comment.save();

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(comment));
    } catch (error) {
      logError(error, "CommentController.create");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: "Não foi possível criar o comentário." })
      );
    }
  }

  /**
   * Retorna comentários de um post pelo ID da postagem e comentário
   * Rota: GET /posts/:postId/:commentId
   */
  async getCommentById(req, res) {
    try {
      const { postId, commentId } = req.params;

      const post = await Post.findById(postId);
      if (!post) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Postagem não encontrada." }));
      }

      const comment = await Comment.findOne({
        _id: commentId,
        postId,
      }).populate("authorId");
      if (!comment) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Comentário não encontrado." }));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(comment));
    } catch (error) {
      logError(error, "CommentController.getCommentById");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: "Não foi possível encontrar comentários." })
      );
    }
  }

  /**
   * Retorna comentários de um post.
   * Rota: GET /posts/:id/comments
   */
  async getCommentsByPost(req, res) {
    try {
      const { id } = req.params;
      const comments = await Comment.find({ postId: id }).populate("authorId");

      if (comments.length === 0) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify([]));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(comments));
    } catch (error) {
      logError(error, "CommentController.getCommentsByPost");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: "Não foi possível encontrar comentários." })
      );
    }
  }

  /**
   * Atualiza comentários de um post pelo ID da postagem e comentário.
   * Rota: PUT /posts/:postId/:commentId
   */
  async update(req, res) {
    try {
      const { postId, commentId } = req.params;
      const commentData = req.body;

      if (!commentData || Object.keys(commentData).length === 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Dados inválidos para atualização." })
        );
      }

      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, postId },
        commentData,
        { new: true }
      );

      if (!updatedComment) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Comentário não atualizado." }));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedComment));
    } catch (error) {
      logError(error, "CommentController.update");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: "Não foi possível atualizar o comentário." })
      );
    }
  }

  /**
   * Deleta um comentário pelo ID fornecido na URL.
   * Rota: DELETE /posts/:postId/:commentId
   */
  async delete(req, res) {
    try {
      const { postId, commentId } = req.params;

      const result = await Comment.findOneAndDelete({ _id: commentId, postId });
      if (!result) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Comentário não encontrado." }));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Comentário excluído." }));
    } catch (error) {
      logError(error, "CommentController.delete");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: "Não foi possível deletar o comentário." })
      );
    }
  }
}

module.exports = new CommentController();
