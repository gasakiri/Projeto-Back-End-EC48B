// app.js

const connectDB = require("./db");
const { logError } = require("./errorHandler");
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const mongoose = require("mongoose");

/**
 * Função principal que executa os testes de CRUD.
 */
const runTests = async () => {
  try {
    // 1. Conecta ao banco de dados
    await connectDB();
    console.log("--- INICIANDO TESTES DE CRUD ---");

    // --- TESTES DE USUÁRIO ---
    // --- TESTE DE LOG DE ERRO ---
    console.log("\n--- Gerando um erro de validação para teste ---");
    try {
      // Tentativa de criar um usuário sem o campo 'email', que é obrigatório.
      // Isso forçará um erro de validação do Mongoose.
      console.log("Tentando criar um usuário com dados inválidos...");
      await User.create({
        username: "user_sem_email",
        password: "password123",
      });
    } catch (error) {
      console.error(
        "ERRO CAPTURADO! Verifique o arquivo 'logs/error.log' para detalhes."
      );
      logError(error, "app.js.flow.createUser.invalid");
    }

    // --- TESTES DE POSTAGEM ---
    // --- TESTE DE LOG DE ERRO ---
    console.log("\n--- Gerando um erro de validação para teste ---");
    try {
      // Tentativa de criar uma postagem sem passar a identificação do usuário
      // Isso forçará um erro de validação do Mongoose.
      console.log("Tentando criar uma postagem com dados inválidos...");
      await Post.create({
        content: "Hello World!"
      });
    } catch (error) {
      console.error(
        "ERRO CAPTURADO! Verifique o arquivo 'logs/error.log' para detalhes."
      );
      logError(error, "app.js.flow.createPost.invalid");
    }

    // --- TESTES DE COMENTÁRIO ---
    // --- TESTE DE LOG DE ERRO ---
    console.log("\n--- Gerando um erro de validação para teste ---");
    try {
      // Tentativa de criar um comentário sem passar a identificação do usuário
      // Isso forçará um erro de validação do Mongoose.
      console.log("Tentando criar um comentário com dados inválidos...");
      await Comment.create({
        content: "Ótima postagem!",
        postId: "68f92edd7c46578f30cdfc7c"
      });
    } catch (error) {
      console.error(
        "ERRO CAPTURADO! Verifique o arquivo 'logs/error.log' para detalhes."
      );
      logError(error, "app.js.flow.createComment.invalid");
    }

    console.log("\n--- CRUD de Usuário ---");

    // Criar
    const newUser = await User.create({
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@example.com`,
      password: "password123",
    });
    console.log("Usuário Criado:", newUser);

    // Ler
    const foundUser = await User.findById(newUser._id);
    console.log("Usuário Encontrado:", foundUser);

    // Atualizar
    const updatedUser = await User.findByIdAndUpdate(
      newUser._id,
      { username: "updated_username" },
      { new: true } // Retorna o documento atualizado
    );
    console.log("Usuário Atualizado:", updatedUser);

    console.log("\n--- CRUD de Postagem ---");

    // Criar
    const newPost = await Post.create({
      content: "Ótima postagem!",
      authorId: newUser._id,
    });
    console.log("Postagem Criada:", newPost);

    // Ler
    const foundPost = await Post.findById(newPost._id);
    console.log("Postagem Encontrada:", foundPost);

    // Atualizar
    const updatePost = await Post.findByIdAndUpdate(
      newPost._id,
      { content: "updated_post" },
      { new: true }
    );
    console.log("Postagem Atualizada:", updatePost);

    console.log("\n--- CRUD de Comentário ---");

    // Criar
    const newComment = await Comment.create({
      content: "Obrigado pela postagem!",
      authorId: newUser._id,
      postId: newPost._id,
    });
    console.log("Comentário Criado:", newComment);

    // Ler
    const foundComment = await Comment.findById(newComment._id);
    console.log("Comentário Encontrado:", foundComment);

    // Atualizar
    const updateComment = await Comment.findByIdAndUpdate(
      newComment._id,
      { content: "updated_comment" },
      { new: true }
    );
    console.log("Comentário Atualizado:", updateComment);

    // --- DELEÇÃO (executado ao final para limpar os dados de teste) ---
    console.log("\n--- Deletando dados de teste ---");

    // Deletar Comentário
    await Comment.findByIdAndDelete(newComment._id);
    console.log("Comentário deletado.");
    // Deletar Postagem
    await Post.findByIdAndDelete(newPost._id);
    console.log("Postagem deletada.");
    // Deletar Usuário
    await User.findByIdAndDelete(newUser._id);
    console.log("Usuário deletado.");
  } catch (error) {
    // Usa o handler de erro para registrar qualquer falha durante os testes
    logError(error, "runTests");
    console.error(
      "Um erro ocorreu durante os testes. Verifique o arquivo de log."
    );
  } finally {
    // 5. Fecha a conexão com o banco de dados ao final dos testes
    await mongoose.connection.close();
    console.log("\n--- TESTES FINALIZADOS ---");
    console.log("Conexão com o MongoDB fechada.");
  }
};

// Executa a função de testes
runTests();
