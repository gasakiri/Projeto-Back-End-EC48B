const fs = require("fs");
const path = require("path");

// Cria o caminho para o diretório de logs
const logDir = path.join(__dirname, "../logs");

// Cria o caminho completo para o arquivo de log
const logFilePath = path.join(logDir, "error.log");

console.log("Tentando escrever o log em:", logFilePath);

// Verifica se o diretório de logs existe e, se não, o cria
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Função para registrar mensagens de erro em um arquivo de log.
 * @param {Error} error - O objeto de erro a ser registrado.
 * @param {string} context - O contexto/local onde o erro ocorreu (ex: 'UserController.createUser').
 */
const logError = (error, context) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [Contexto: ${context}]\n  Erro: ${error.message}\n  Stack: ${error.stack}\n\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      // Se falhar gravar no arquivo, escreva no console (não lançar)
      console.error("Falha ao gravar log de erro:", err);
    }
  });
};

module.exports = { logError };
