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

exports.findUserById = (id) => prisma.user.findUnique({ where: { id } });

exports.countAllUsers = () => prisma.user.count();

exports.RandomUser = (countUsers) =>
  prisma.user.findMany({
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
