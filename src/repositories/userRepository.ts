import { User } from "@/interfaces/userInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRepository = {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  async createUser(data: User) {
    return await prisma.user.create({ data });
  },
};
