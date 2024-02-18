const prisma = require("../models/prisma");

exports.checkFollowById = (userId, followingId) =>
  prisma.relationship.findFirst({
    where: { followerId: userId, followingId },
  });

exports.createFollowById = (userId, followingId) =>
  prisma.relationship.create({
    data: { followerId: userId, followingId },
  });

exports.checkAllFollow = (userId, followingId) =>
  prisma.relationship.findMany({
    where: { AND: [{ followerId: userId }, { followingId }] },
  });

exports.unfollowById = (userId, followingId) =>
  prisma.relationship.deleteMany({
    where: {
      AND: [{ followerId: userId }, { followingId }],
    },
  });
