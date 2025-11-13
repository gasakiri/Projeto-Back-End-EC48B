const Post = require("../models/Post");
const { logError } = require("../config/errorHandler");

const createPost = async (req, res) => {
  try {
    const postContent = req.body;

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "É necessário estar logado" });
    }

    if (!postContent) {
      return res
        .status(400)
        .json({ message: "Conteúdo da postagem é obrigatório" });
    }

    const postData = {
      content: postContent.content.trim(),
      authorId: user.id,
    };

    const result = await Post.create(postData);
    res.status(201).json({
      message: "Postagem criada com sucesso",
      post: {
        id: result._id,
        content: result.content,
        authorId: result.authorId,
      },
    });
  } catch (error) {
    logError(error, "postController.createPost");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res
        .status(404)
        .json({ message: "Deve ser passada a identificação da postagem" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    res.status(200).json({ post });
  } catch (error) {
    logError(error, "postController.getPost");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postContent = req.body;

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "É necessário estar logado" });
    }

    if (!postId) {
      return res
        .status(400)
        .json({ message: "Deve ser passada a identificação da postagem" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    if (post.authorId.toString() !== user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para editar esta postagem" });
    }

    const updateData = { content: postContent.content.trim() };

    const result = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

    if (!result) {
      return res
        .status(500)
        .json({ message: "Não foi possível atualizar a postagem" });
    }

    res.status(200).json({
      message: "Postagem atualizada com sucesso",
      post: {
        id: result._id,
        content: result.content,
        authorId: result.authorId,
      },
    });
  } catch (error) {
    logError(error, "postController.updatePost");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.status(200).json({ posts });
  } catch (error) {
    logError(error, "postController.getAllPosts");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "É necessário estar logado" });
    }

    if (!postId) {
      return res
        .status(400)
        .json({ message: "Deve ser passada a identificação da postagem" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    if (post.authorId.toString() !== user.id.toString()) {
      return res.status(403).json({
        message: "Você não tem permissão para excluir esta postagem",
      });
    }

    const result = await Post.findByIdAndDelete(postId);

    if (!result) {
      return res
        .status(500)
        .json({ message: "Não foi possível excluir a postagem" });
    }

    res.status(200).json({ message: "Postagem excluída com sucesso" });
  } catch (error) {
    logError(error, "postController.deletePost");
    res.status(500).json({ message: "Ocorreu um erro interno no servidor" });
  }
};

module.exports = {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
};
