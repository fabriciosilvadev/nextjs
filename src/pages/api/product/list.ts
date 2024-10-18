import { productService } from "@/services/productService";
import { responseFormat } from "@/utils/apiUtils";
import { verifyToken } from "@/utils/authUtils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      //const decoded = verifyToken(req);

      //console.log("decoded", decoded);

      const products = await productService.getAll(req);
      res.status(201).json(responseFormat(true, products));
    } catch (error: { error: { message: string } }) {
      res.status(400).json(responseFormat(false, [], error?.message));
    }
  } else {
    res.status(405).end();
  }
}
