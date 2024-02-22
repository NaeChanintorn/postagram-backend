const prisma = require("../models/prisma");
const { checkAllFollow } = require("./follow-service");

const userData = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  mobile: true,
  userName: true,
  profileImage: true,
  password: false,
  bio: true,
  createdAt: true,
  updatedAt: true,
};

exports.createPostService = (data) => prisma.post.create({ data });

exports.findAllPost = async (userId, followingId) => {
  const friendId = await checkAllFollow(userId, followingId);
  //   console.log(friendId);

  const posts = await prisma.post.findMany({
    where: {
      posterId: {
        in: [userId, ...friendId.map((i) => i.followingId)],
      },
      isDeleted: false,
    },
    orderBy: { createdAt: "desc" },
    include: {
      poster: {
        select: userData,
      },
      likes: true,
      comments: true,
    },
  });

  return posts;
};

exports.getPostForEachUserService = (userId) =>
  prisma.post.findMany({
    where: {
      posterId: +userId,
    },
  });

exports.getPostByPostId = (postId) =>
  prisma.post.findFirst({
    where: {
      id: +postId,
    },
  });

exports.editPostService = (postId, caption) =>
  prisma.post.update({
    data: {
      caption,
    },
    where: {
      id: +postId,
    },
  });

exports.deletePostService = (postId) =>
  prisma.post.update({
    data: {
      isDeleted: true,
    },
    where: {
      id: +postId,
    },
  });
