import { z } from 'zod';

export const createPermissionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório.')
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

    description: z.string().optional(),
  }),
});

export const getPermissionsSchema = z.object({
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

export const permissionIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'O Id da permissão deve ser válido.' }),
  }),
});

export const updatePermissionSchema = z.object({
  params: z.object({
    id: z
      .uuid({ message: 'O Id da permissão deve ser válido.' })
      .min(1, 'O ID da permissão é obrigatório.'),
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
