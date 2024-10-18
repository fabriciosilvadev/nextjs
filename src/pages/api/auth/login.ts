import { authService } from "@/services/authService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const user = await authService.login(email, password);
      res.status(201).json(user);
    } catch (error: { error: { message: string } }) {
      res.status(400).json({ error: error?.message });
    }
  } else {
    res.status(405).end();
  }
}
