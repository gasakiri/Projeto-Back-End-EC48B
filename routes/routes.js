const UserController = require("../src/controllers/UserController");
const PostController = require("../src/controllers/PostController");

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

  // --- ROTA NÃO ENCONTRADA ---
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
};
