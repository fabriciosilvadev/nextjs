import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";
import { AuthRegister } from "@/interfaces/authInterface";

export const authService = {
  async register(user: AuthRegister) {
    const existingUser = await userRepository.findUserByEmail(user.email);
    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await userRepository.createUser(user);
  },

  async login(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Credenciais inválida");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Credenciais inválida");
    }

    const secretKey = process.env.JWT_SECRET
      ? process.env.JWT_SECRET
      : "defaultSecret";

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });
    return { token };
  },

  verifyToken(token: string) {
    const secretKey = process.env.JWT_SECRET;

    if (secretKey) {
      return jwt.verify(token, secretKey);
    }

    return jwt.verify(token, "defaultSecret");
  },
};
