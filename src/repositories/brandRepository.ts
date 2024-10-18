import { BrandCreate } from "@/interfaces/brandInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const brandRepository = {
  async index(page = 1, orderBy = "createdAt", order = "asc", limit = 10) {
    const skip = (page - 1) * limit;
    const brands = await prisma.brand.findMany({
      skip,
      take: limit,
      orderBy: {
        [orderBy]: order,
      },
    });

    const total = await prisma.brand.count();

    return { brands, total };
  },

  async findById(id: number) {
    return await prisma.brand.findUnique({
      where: {
        id,
      },
    });
  },

  async create(data: BrandCreate) {
    return await prisma.brand.create({ data });
  },

  async update(data: BrandCreate, id: number) {
    return await prisma.brand.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id: number) {
    return await prisma.brand.delete({
      where: { id },
    });
  },
};
