const prisma = require("../models/prisma");

exports.findLikeByUserId = (postId, userId) =>
  prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

exports.createLikeService = (postId, userId) =>
  prisma.like.create({
    data: {
      postId,
      userId,
    },
  });

exports.deleteLikeService = (postId, userId) =>
  prisma.like.delete({
    where: {
      userId_postId: { postId, userId },
    },
  });

exports.getAllLikeService = (postId) =>
  prisma.like.findMany({
    where: {
      postId,
    },
  });
