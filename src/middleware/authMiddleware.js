const requireAuth = (req, res, next) => {
  // Verifica se a sessão contém a informação do usuário
  if (req.session && req.session.user) {
    // Se o usuário está logado, permite que a requisição continue para o próximo passo (o controller)
    return next();
  } else {
    // Se não está logado, bloqueia a requisição e retorna um erro
    return res.status(401).json({
      message: "Acesso não autorizado. Por favor, faça login para continuar.",
    });
  }
};

module.exports = {
  requireAuth,
};
