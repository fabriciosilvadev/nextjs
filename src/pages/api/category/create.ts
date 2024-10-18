import { categoryService } from "@/services/categoryService";
import { responseFormat } from "@/utils/apiUtils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const save = await categoryService.create(req);

      if (save.status) {
        res.status(201).json(responseFormat(true, []));
        return;
      }

      res.status(500).json(responseFormat(false, [], save.error));
    } catch (error: { error: { message: string } }) {
      res.status(400).json(responseFormat(false, [], error?.message));
    }
  } else {
    res.status(405).end();
  }
}
