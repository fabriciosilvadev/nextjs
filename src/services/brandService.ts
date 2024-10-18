import { brandRepository } from "@/repositories/brandRepository";
import { NextApiRequest } from "next";

export const brandService = {
  async getAll(req: NextApiRequest) {
    const {
      page = 1,
      orderBy = "createdAt",
      order = "asc",
      limit = 10,
    } = req.query;

    const { brands, total } = await brandRepository.index(
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
      const item = await brandRepository.findById(parseInt(id));
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
      await brandRepository.create({
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
      await brandRepository.update(
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
      await brandRepository.delete(parseInt(id));
      return { status: true, error: "" };
    } catch (error) {
      console.error(error);
      return { status: false, error };
    }
  },
};
