import { productRepository } from "@/repositories/productRepository";
import { NextApiRequest } from "next";

export const productService = {
  async getAll(req: NextApiRequest) {
    const {
      page = 1,
      orderBy = "createdAt",
      order = "asc",
      limit = 10,
    } = req.query;

    const { products, total } = await productRepository.index(
      parseInt(page),
      orderBy,
      order,
      parseInt(limit)
    );

    return {
      items: products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  },

  async getById(req: NextApiRequest) {
    const { id } = req.query;

    try {
      const item = await productRepository.findById(parseInt(id));
      console.log(item);
      return { status: true, error: "", response: item };
    } catch (error) {
      console.error(error);
      return { status: false, error };
    }
  },

  async create(req: NextApiRequest) {
    const { name, price, description, brand, categories } = req.body;

    try {
      await productRepository.create({
        name,
        price,
        description,
        brandId: parseInt(brand),
        categories: {
          create: categories.map((id) => ({ category_id: parseInt(id) })),
        },
      });

      return { status: true, error: "" };
    } catch (error) {
      console.error(error);
      return { status: false, error };
    }
  },

  async update(req: NextApiRequest) {
    const { name, price, description, brand, categories } = req.body;
    const { id } = req.query;

    try {
      await productRepository.update(
        {
          name,
          price,
          description,
          brandId: parseInt(brand),
          categories: {
            //create: categories.map((id) => ({ category_id: parseInt(id) })),
            connectOrCreate: categories.map((id) => ({
              category_id: parseInt(id),
            })),
          },
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
      await productRepository.delete(parseInt(id));

      return { status: true, error: "" };
    } catch (error) {
      console.error(error);
      return { status: false, error };
    }
  },
};
