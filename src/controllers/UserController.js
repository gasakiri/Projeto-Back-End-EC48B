const User = require("../models/User");
const { logError } = require("../utils/errorHandler");

class UserController {
  /**
   * Lista todos os usuários cadastrados.
   * Rota: GET /users
   */
  async findAll(req, res) {
    try {
      const users = await User.find();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } catch (error) {
      logError(error, "UserController.findAll");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Erro ao listar usuários." }));
    }
  }

  /**
   * Cria um novo usuário a partir dos dados recebidos no corpo da requisição.
   * Rota: POST /users
   */
  async createUser(req, res) {
    try {
      const userData = req.body;

      const user = new User(userData);
      await user.save();

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } catch (error) {
      logError(error, "UserController.createUser");
      if (error.name === "ValidationError") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Dados inválidos: ${error.message}` }));
      } else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: `Erro ao criar usuário: ${error.message}` })
        );
      }
    }
  }

  /**
   * Busca um usuário pelo ID fornecido na URL.
   * Rota: GET /users/:id
   */
  async findUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Usuário não encontrado." }));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } catch (error) {
      logError(error, "UserController.findUserById");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: `Erro ao buscar usuário por ID: ${error.message}`,
        })
      );
    }
  }

  /**
   * Atualiza um usuário existente pelo ID.
   * Rota: PUT /users/:id
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Formato de ID inválido." }));
      }

      // { new: true } retorna o documento atualizado.
      // { runValidators: true } garante que as validações do schema sejam aplicadas na atualização.
      const updatedUser = await User.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Usuário não encontrado para atualização." })
        );
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedUser));
    } catch (error) {
      logError(error, "UserController.update");
      if (error.name === "ValidationError") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Dados inválidos: ${error.message}` }));
      } else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: `Erro ao atualizar usuário: ${error.message}`,
          })
        );
      }
    }
  }

  /**
   * Deleta um usuário pelo ID fornecido na URL.
   * Rota: DELETE /users/:id
   */
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await User.findByIdAndDelete(id);

      if (!result) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ error: "Usuário não encontrado para deleção." })
        );
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Usuário deletado com sucesso",
          user: result,
        })
      );
    } catch (error) {
      logError(error, "UserController.deleteUser");
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: `Erro ao deletar usuário: ${error.message}` })
      );
    }
  }
}

module.exports = new UserController();
