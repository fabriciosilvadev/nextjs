import { CategoryCreate } from "@/interfaces/categoryInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const categoryRepository = {
  async index(page = 1, orderBy = "createdAt", order = "asc", limit = 10) {
    const skip = (page - 1) * limit;
    const brands = await prisma.category.findMany({
      skip,
      take: limit,
      orderBy: {
        [orderBy]: order,
      },
    });

    const total = await prisma.category.count();

    return { brands, total };
  },

  async findById(id: number) {
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  },

  async create(data: CategoryCreate) {
    return await prisma.category.create({ data });
  },

  async update(data: CategoryCreate, id: number) {
    return await prisma.category.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id: number) {
    return await prisma.category.delete({
      where: { id },
    });
  },
};
