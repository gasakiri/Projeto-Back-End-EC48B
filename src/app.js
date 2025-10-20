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

    // --- DELEÇÃO (executado ao final para limpar os dados de teste) ---
    console.log("\n--- Deletando dados de teste ---");

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
