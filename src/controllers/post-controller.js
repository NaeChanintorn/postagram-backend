const {
  createPostService,
  findAllPost,
  editPostService,
  getPostByPostId,
  deletePostService,
} = require("../services/post-service");
const { uploadImage } = require("../services/upload-service");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

// ------------------ Post ------------------

exports.createPost = catchError(async (req, res, next) => {
  const { id } = req.user;

  const data = { posterId: +id, caption: req.body.caption };

  if (!req.file) {
    createError("Image is required");
  }

  if (req.file) {
    data.image = await uploadImage(req.file.path);
  }

  const post = await createPostService(data);
  console.log(post);
  res.status(200).json({ post });
});

exports.getAllPosts = catchError(async (req, res, next) => {
  const posts = await findAllPost(req.user.id);

  res.status(200).json({ posts });
});

// edit post => caption
exports.editPostByPostId = catchError(async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;
  const { caption } = req.body;

  const post = await getPostByPostId(postId);

  if (id !== post.posterId) {
    createError(`You can't edit other people's post`, 400);
  }

  const data = await editPostService(postId, caption);

  res.status(200).json({ data });
});

// delete post => fake = patch => isdelete(true)
exports.deletePostByPostId = catchError(async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;
  const { isDeleted } = req.body;
  const post = await getPostByPostId(postId);

  if (id !== post.posterId) {
    createError(`You can't delete other people's post`, 400);
  }

  const data = await deletePostService(postId, isDeleted);

  res.status(201).json({ data });
});

// ------------------ Comment ------------------
