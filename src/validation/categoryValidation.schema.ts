import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
});

export type User = z.infer<typeof categorySchema>;
