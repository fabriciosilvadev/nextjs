import z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  price: z
    .number({ invalid_type_error: "Preço deve ser um número" })
    .min(0.01, { message: "Preço deve ser maior que zero" }),
  brand: z.string().min(1, { message: "Marca é obrigatória" }),
  categories: z
    .array(z.string())
    .nonempty({ message: "Selecione ao menos uma categoria" }),
  description: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
});

export type User = z.infer<typeof productSchema>;
