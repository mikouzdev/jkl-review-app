import prisma from "../prisma/client.js";

export const userRepo = {
  findUser: (data: { email: string }) => {
    return prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });
  },

  createUser: (data: { email: string; username: string; password_hash?: string; role: string; provider: string }) => {
    return prisma.users.create({ data });
  },
};
