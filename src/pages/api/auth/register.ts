import { authService } from "@/services/authService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;
    try {
      const payload = {
        email,
        password,
        name,
      };
      const user = await authService.register(payload);
      res.status(201).json(user);
    } catch (error: { error: { message: string } }) {
      res.status(400).json({ error: error?.message });
    }
  } else {
    res.status(405).end();
  }
}
