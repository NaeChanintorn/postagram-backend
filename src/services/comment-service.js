const prisma = require("../models/prisma");

exports.createCommentService = (comment, postId, userId) =>
  prisma.comment.create({
    data: {
      comment,
      commenterId: userId,
      postId,
    },
  });

exports.findCommentByCommentId = (commentId, userId, postId) =>
  prisma.comment.findFirst({
    where: {
      id: +commentId,
      commenterId: userId,
      postId,
    },
  });

exports.deleteCommentService = (commentId) =>
  prisma.comment.delete({
    where: {
      id: +commentId,
    },
  });

exports.getCommentService = (postId) =>
  prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      commenter: true,
    },
  });

exports.editCommentService = (comment, commentId) =>
  prisma.comment.update({
    data: {
      comment,
    },
    where: {
      id: commentId,
    },
  });
