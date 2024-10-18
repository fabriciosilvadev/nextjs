import jwt from "jsonwebtoken";

export const verifyToken = (req: { headers: { authorization: string } }) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Token não foi encontrado na requisição");

  return jwt.verify(token, process.env.JWT_SECRET ?? "defaultSecret");
};
