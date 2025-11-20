import { z } from 'zod';

export const createPositionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório.')
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

    hierarchical_level: z
      .number()
      .int()
      .min(1, 'O nível de hierarquia é obrigatório.')
      .max(100, 'O nível máximo de hierarquia é 100.')
      .positive('O nível de hierarquia deve ser um número positivo.'),

    description: z.string().optional(),
  }),
});

export const getPositionsSchema = z.object({
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

export const positionIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'O Id da posição deve ser válido.' }),
  }),
});

export const updatePositionSchema = z.object({
  params: z.object({
    id: z
      .uuid({ message: 'O Id da posição deve ser válido.' })
      .min(1, 'O Id da posição é obrigatório.'),
  }),
  body: z
    .object({
      name: z.string().min(3).optional(),
      hierarchical_level: z
        .number()
        .int()
        .min(1)
        .max(100)
        .positive()
        .optional(),
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
