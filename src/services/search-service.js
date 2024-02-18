const prisma = require("../models/prisma");

exports.searchUserByUserName = (userName) =>
  prisma.user.findMany({
    where: {
      userName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      mobile: true,
      userName: true,
      profileImage: true,
      password: false,
      bio: true,
    },
  });
