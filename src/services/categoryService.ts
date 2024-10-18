import { categoryRepository } from "@/repositories/categoryRepository";
import { productRepository } from "@/repositories/productRepository";
import { NextApiRequest } from "next";

export const categoryService = {
  async getAll(req: NextApiRequest) {
    const {
      page = 1,
      orderBy = "createdAt",
      order = "asc",
      limit = 10,
    } = req.query;

    const { brands, total } = await categoryRepository.index(
      parseInt(page),
      orderBy,
      order,
      parseInt(limit)
    );

    return {
      items: brands,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  },

  async getById(req: NextApiRequest) {
    const { id } = req.query;

    try {
      const item = await categoryRepository.findById(parseInt(id));
      console.log(item);
      return { status: true, error: "", response: item };
    } catch (error) {
      console.error(error);
      return { status: false, error };
    }
  },

  async create(req: NextApiRequest) {
    const { name } = req.body;

    try {
      await categoryRepository.create({
        name,
      });

      return { status: true, error: "" };
    } catch (error) {
      console.error(error);
      return { status: false, error };
    }
  },

  async update(req: NextApiRequest) {
    const { name } = req.body;
    const { id } = req.query;

    try {
      await categoryRepository.update(
        {
          name,
        },
        parseInt(id)
      );

      return { status: true, error: "" };
    } catch (error) {
      console.error(error);
      return { status: false, error };
    }
  },

  async delete(req: NextApiRequest) {
    const { id } = req.query;

    try {
      await productRepository.updateProductDeleteBrand(parseInt(id));
      await categoryRepository.delete(parseInt(id));

      return { status: true, error: "" };
    } catch (error) {
      console.error(error);
      return { status: false, error };
    }
  },
};
