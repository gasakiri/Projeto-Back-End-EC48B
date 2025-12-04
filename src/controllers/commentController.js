const Comment = require("../models/Comment");
const { logError } = require("../config/errorHandler");
const { ObjectId } = require("mongodb");

const createComment = async (req, res) => {
  try {
    const content = req.body.content;
    const postId = req.params.id;

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "É necessário estar logado" });
    }

    if (!content) {
      return res
        .status(400)
        .json({ message: "Conteúdo do comentário é obrigatório" });
    }

    const commentData = {
      content: content,
      postId: postId,
      authorId: user.id,
    };

    const result = await Comment.create(commentData);
    res.status(201).json({
      message: "Comentário criado com sucesso",
      id: result._id,
      content: result.content,
      authorId: result.authorId,
    });
  } catch (error) {
    logError(error, "commentController.createComment");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

const getComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    if (!commentId) {
      return res
        .status(400)
        .json({ message: "O ID do comentário é obrigatório." });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado" });
    }

    res.status(200).json({ comment });
  } catch (error) {
    logError(error, "commentController.getComment");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.findAll(postId);
    if (!comments) {
      return res.status(404).json({ message: "Não há comentários" });
    }

    res.status(200).json({ comments: comments });
  } catch (error) {
    logError(error, "commentController.createComment");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

const updateComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const commentData = req.body;

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "É necessário estar logado" });
    }

    if (!postId || !commentId) {
      return res.status(400).json({
        message: "O ID da postagem e do comentário são obrigatórios.",
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado" });
    }

    if (!comment.authorId.equals(new ObjectId(user.id))) {
      return res.status(403).json({
        message: "Você não tem permissão para editar este comentário",
      });
    }

    if (!commentData.content || commentData.content.trim() === "") {
      return res
        .status(400)
        .json({ message: "O conteúdo não pode ser vazio." });
    }

    const updateData = { content: commentData.content.trim() };
    const result = await Comment.findByIdAndUpdate(commentId, updateData);

    if (!result) {
      return res
        .status(500)
        .json({ message: "Não foi possível atualizar o comentário" });
    }

    res.status(200).json({
      message: "Comentário atualizado com sucesso",
      comment: {
        id: result._id,
        content: result.content,
        authorId: result.authorId,
      },
    });
  } catch (error) {
    logError(error, "commentController.updateComment");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "É necessário estar logado" });
    }

    if (!commentId) {
      return res.status(400).json({
        message: "O ID do comentário é obrigatório.",
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comentário não encontrado" });
    }

    if (!comment.authorId.equals(new ObjectId(user.id))) {
      return res.status(403).json({
        message: "Você não tem permissão para excluir este comentário",
      });
    }

    const result = await Comment.findByIdAndDelete(commentId);

    if (!result) {
      return res
        .status(500)
        .json({ message: "Não foi possível excluir o comentário" });
    }

    res.status(200).json({ message: "Comentário excluído com sucesso" });
  } catch (error) {
    logError(error, "commentController.deleteComment");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

module.exports = {
  createComment,
  getComment,
  getAllComments,
  updateComment,
  deleteComment,
};
