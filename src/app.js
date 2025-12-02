const express = require("express");
const session = require("express-session");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares Essenciais ---

// 1. Para o servidor entender requisições com corpo em JSON
app.use(express.json());

// 2. Para configurar o sistema de sessões
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Não salva a sessão a cada requisição se ela não for modificada
    saveUninitialized: false, // Não cria sessões para usuários que não fizeram login
    cookie: {
      secure: false,
      httpOnly: true, // Impede que o cookie da sessão seja acessado por JavaScript no cliente
      maxAge: 1000 * 60 * 60 * 24, // Tempo de vida do cookie
    },
  })
);

// --- Registro das Rotas ---

// As rotas de autenticação ficarão sob o prefixo /auth
app.use("/auth", authRoutes);

app.use("/post", postRoutes);

// --- Rota de Teste ---
app.get("/", (req, res) => {
  res.json({ message: "Servidor da API de Micro-Blogging está no ar!" });
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
