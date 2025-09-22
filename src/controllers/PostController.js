const Post = require("../models/Post");
const { logError } = require("../utils/errorHandler");

class PostController {
  /**
   * Cria uma nova postagem a partir dos dados recebidos no corpo da requisição.
   * Rota: POST /posts
   */
  async create(req, res) {
    try {
      const postData = req.body;

      const post = new Post(postData);
      await post.save();

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(post));
    } catch (error) {
      logError(error, "PosController.create");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Não foi possível criar a postagem." }));
    }
  }

  /**
   * Retorna uma postagem pelo ID fornecido na URL.
   * Rota: GET /posts/:id
   */
  async getPost(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findById(id);

      if (!post) {
        res.writeHead(404, { "Content-Type:": "application/json" });
        return res.end(JSON.stringify({ error: "Postagem não encontrada." }));
      }

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(post));
    } catch (error) {
      logError(error, "PostController.getPost");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Postagem não encontrada." }));
    }
  }

  /**
   * Atualiza uma postagem pelo ID fornecido na URL.
   * Rota: PUT /posts/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const postData = req.body;

      if (!postData) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Update não encontrado." }));
      }

      const updatedPost = await Post.findByIdAndUpdate(id, postData);

      if (!updatedPost) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Postagem não atualizada." }));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedPost));
    } catch (error) {
      logError(error, "PostController.update");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: "Não foi possível atualizar a postagem." })
      );
    }
  }

  /**
   * Deleta uma postagem pelo ID fornecido na URL.
   * Rota: DELETE /posts/:id
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      const result = await Post.findByIdAndDelete(id);

      if (!result) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Postagem não encontrada." }));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Postagem excluída." }));
    } catch (error) {
      logError(error, "PostController.delete");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: "Não foi possível deletar a postagem." })
      );
    }
  }
}

module.exports = new PostController();
