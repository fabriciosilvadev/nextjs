import z from "zod";

export const brandSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
});

export type User = z.infer<typeof brandSchema>;
