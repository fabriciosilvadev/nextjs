import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productCategoryRepository = {
  async create(data) {
    return await prisma.productCategory.createMany({ data });
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
