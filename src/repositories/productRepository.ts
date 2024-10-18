import { BrandCreate } from "@/interfaces/brandInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productRepository = {
  async index(page = 1, orderBy = "createdAt", order = "asc", limit = 10) {
    const skip = (page - 1) * limit;
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        [orderBy]: order,
      },
    });

    const total = await prisma.product.count();

    return { products, total };
  },

  async findById(id: number) {
    return await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        brand: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  },

  async create(data) {
    return await prisma.product.create({ data });
  },

  async update(data, id: number) {
    return await prisma.product.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  },
};
