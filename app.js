const http = require("http");
const connectDB = require("./src/database/db");
const routes = require("./routes/routes");
const { logError } = require("./src/utils/errorHandler");

const PORT = 3000;

const startServer = async () => {
  // Conecta ao banco de dados antes de iniciar o servidor
  await connectDB();

  const server = http.createServer(async (req, res) => {
    // Configuração de CORS para permitir requisições de outras origens
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // Resposta para requisições pre-flight (OPTIONS) do CORS
    if (req.method === "OPTIONS") {
      res.writeHead(204); // No Content
      res.end();
      return;
    }

    // Body Parser: Processa o corpo (body) de requisições POST e PUT
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        if (body) {
          req.body = JSON.parse(body);
        } else {
          req.body = {};
        }
        routes(req, res);
      } catch (error) {
        logError(error, "app.js.bodyParser");
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Corpo da requisição inválido (malformed JSON).",
          })
        );
      }
    });
  });

  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

startServer();
