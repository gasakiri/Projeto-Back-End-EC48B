const User = require("../models/User");
const { logError } = require("../config/errorHandler");

// Função para lidar com o Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Critério de Avaliação: Verificação de preenchimento de campos obrigatórios
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "E-mail e senha são obrigatórios." });
    }

    // Busca o usuário no banco de dados (vamos criar este método a seguir)
    const user = await User.findByEmail(email);

    // Validação do usuário e senha
    if (!user || user.password !== password) {
      // Comparação direta
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Se as credenciais estiverem corretas, cria a sessão
    // Armazenamos apenas o ID e o username para não expor dados sensíveis como a senha
    req.session.user = {
      id: user._id,
      username: user.username,
    };

    // Responde com sucesso
    res
      .status(200)
      .json({ message: "Login bem-sucedido!", user: req.session.user });
  } catch (error) {
    logError(error, "authController.login");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
};

// Função para lidar com o Logout
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro: Não foi possível fazer logout." });
    }

    // Limpa o cookie no navegador do cliente
    res.clearCookie("connect.sid");

    return res.status(200).json({ message: "Logout realizado com sucesso." });
  });
};

module.exports = {
  login,
  logout,
};
