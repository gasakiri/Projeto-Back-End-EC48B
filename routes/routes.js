const UserController = require("../src/controllers/UserController");
const PostController = require("../src/controllers/PostController");
const CommentController = require("../src/controllers/CommentController");

module.exports = async (req, res) => {
  const { url, method } = req;
  const urlParts = url.split("/").filter(Boolean);

  res.setHeader("Content-Type", "application/json");

  // --- ROTAS DE USUÁRIOS ---

  // Rota: GET /users -> Listar todos os usuários
  if (url === "/users" && method === "GET") {
    return UserController.findAll(req, res);
  }

  // Rota: GET /users/:id -> Buscar um usuário por ID
  if (url.startsWith("/users/") && urlParts.length === 2 && method === "GET") {
    req.params = { id: urlParts[1] };
    return UserController.findUserById(req, res);
  }

  // Rota: POST /users -> Criar um usuário
  if (url === "/users" && method === "POST") {
    return UserController.createUser(req, res);
  }

  // Rota: PUT /users/:id -> Atualizar um usuário
  if (url.startsWith("/users/") && urlParts.length === 2 && method === "PUT") {
    req.params = { id: urlParts[1] };
    return UserController.update(req, res);
  }

  // Rota: DELETE /users/:id -> Deletar um usuário
  if (
    url.startsWith("/users/") &&
    urlParts.length === 2 &&
    method === "DELETE"
  ) {
    req.params = { id: urlParts[1] };
    return UserController.deleteUser(req, res);
  }

  // --- ROTAS DE POSTAGENS ---

  // Rota: GET /posts -> Buscar uma postagem por ID
  if (url.startsWith("/posts/") && urlParts.length === 2 && method === "GET") {
    req.params = { id: urlParts[1] };
    return PostController.getPost(req, res);
  }

  // Rota: POST /posts -> Criar uma postagem
  if (url === "/posts" && method === "POST") {
    return PostController.create(req, res);
  }

  // Rota: PUT /posts/:id -> Atualizar uma postagem
  if (url.startsWith("/posts/") && urlParts.length === 2 && method === "PUT") {
    req.params = { id: urlParts[1] };
    return PostController.update(req, res);
  }

  // Rota: DELETE /posts/:id -> Deletar uma postagem
  if (
    url.startsWith("/posts/") &&
    urlParts.length === 2 &&
    method === "DELETE"
  ) {
    req.params = { id: urlParts[1] };
    return PostController.delete(req, res);
  }

  // --- ROTAS DE COMENTÁRIOS ---

  // Rota: GET /posts/:postId/comments -> Buscar comentários em uma postagem
  if (
    url.startsWith("/posts/") &&
    url.endsWith("/comments") &&
    urlParts.length === 3 &&
    method === "GET"
  ) {
    req.params = { id: urlParts[1] };
    return CommentController.getCommentsByPost(req, res);
  }

  // Rota: POST /posts/:postId/comments -> Criar um comentário
  if (
    url.startsWith("/posts/") &&
    url.endsWith("/comments") &&
    urlParts.length === 3 &&
    method === "POST"
  ) {
    req.params = { postId: urlParts[1] };
    return CommentController.create(req, res);
  }

  // Rota: GET /posts/:postId/coments/:commentId -> Buscar um comentário por ID
  if (
    urlParts[0] === "posts" &&
    urlParts[2] === "comments" &&
    urlParts.length === 4 &&
    method === "GET"
  ) {
    req.params = { postId: urlParts[1], commentId: urlParts[3] };
    return CommentController.getCommentById(req, res);
  }

  // Rota: PUT /posts/:postId/comments/:commentId -> Atualizar um comentário
  if (
    urlParts[0] === "posts" &&
    urlParts[2] === "comments" &&
    urlParts.length === 4 &&
    method === "PUT"
  ) {
    req.params = { postId: urlParts[1], commentId: urlParts[3] };
    return CommentController.update(req, res);
  }

  // Rota: DELETE /posts/:postId/comments/:commentId -> Deletar um comentário
  if (
    urlParts[0] === "posts" &&
    urlParts[2] === "comments" &&
    urlParts.length === 4 &&
    method === "DELETE"
  ) {
    req.params = { postId: urlParts[1], commentId: urlParts[3] };
    return CommentController.delete(req, res);
  }

  // --- ROTA NÃO ENCONTRADA ---
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
};
