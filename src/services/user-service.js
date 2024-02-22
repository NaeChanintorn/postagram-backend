const prisma = require("../models/prisma");

exports.findUserByMobileOrEmail = (mobileOrEmail) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: mobileOrEmail }, { mobile: mobileOrEmail }],
    },
  });

exports.findUserByUserName = (userName) =>
  prisma.user.findFirst({
    where: { userName },
  });

exports.findUserByMobileOrEmailOrUserName = (mobileOrEmailOrUserName) =>
  prisma.user.findFirst({
    where: {
      OR: [
        { email: mobileOrEmailOrUserName },
        { mobile: mobileOrEmailOrUserName },
        { userName: mobileOrEmailOrUserName },
      ],
    },
  });

exports.createUser = (data) => prisma.user.create({ data });

exports.findUserById = (id) =>
  prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

// Suggested User

exports.countAllUsers = () => prisma.user.count();

exports.RandomUser = (id, countUsers) =>
  prisma.user.findMany({
    where: { NOT: { id } },
    take: 4,
    skip: Math.floor(Math.random() * (countUsers - 3)),
  });

// Edit Profile

exports.updateUserByid = (profileImage, id) =>
  prisma.user.update({
    data: { profileImage },
    where: { id },
  });

exports.updateBioById = (bio, id) =>
  prisma.user.update({
    data: { bio },
    where: { id },
  });
