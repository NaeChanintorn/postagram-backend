const prisma = require("../models/prisma");

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
};

exports.checkFollowById = (userId, followingId) =>
  prisma.relationship.findFirst({
    where: { followerId: userId, followingId },
    select: {
      // follower: {
      //   select: userData,
      // },
      following: {
        select: userData,
      },
    },
  });

exports.createFollowById = (userId, followingId) =>
  prisma.relationship.create({
    data: { followerId: userId, followingId },
  });

exports.checkAllFollow = (userId) =>
  prisma.relationship.findMany({
    where: { OR: [{ followerId: userId }, { followingId: userId }] },
  });

exports.unfollowById = (userId, followingId) =>
  prisma.relationship.deleteMany({
    where: {
      AND: [{ followerId: userId }, { followingId }],
    },
  });

exports.countFollowing = (id) =>
  prisma.relationship.count({
    where: { followerId: id },
  });

exports.countFollower = (id) =>
  prisma.relationship.count({
    where: { followingId: id },
  });
