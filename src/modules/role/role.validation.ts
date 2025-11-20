import { z } from 'zod';

export const createRoleSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório.')
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

    description: z.string().optional(),
  }),
});

export const getRolesSchema = z.object({
  query: z.object({
    page: z.coerce
      .number()
      .int()
      .positive('A página deve ser um número positivo.')
      .default(1),
    limit: z.coerce
      .number()
      .int()
      .positive('O limite deve ser um número positivo.')
      .default(10),
  }),
});

export const roleIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'O Id do papel deve ser válido.' }),
  }),
});

export const updateRoleSchema = z.object({
  params: z.object({
    id: z
      .uuid({ message: 'O Id do papel deve ser válido.' })
      .min(1, 'O ID do papel é obrigatório.'),
  }),
  body: z
    .object({
      name: z.string().min(3).optional(),
      description: z.string().optional(),
    })
    .refine(
      (data) => {
        return Object.keys(data).length > 0;
      },
      {
        message: 'Pelo menos um campo deve ser fornecido para atualização.',
      },
    ),
});
