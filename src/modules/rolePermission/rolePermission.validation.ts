import { z } from 'zod';

export const createRolePermissionSchema = z.object({
  body: z.object({
    role_id: z
      .uuid({ message: 'O Id do papel deve ser válido.' })
      .min(1, 'O Id do papel é obrigatório.'),

    permission_id: z
      .uuid({ message: 'O Id da permissão deve ser válido.' })
      .min(1, 'O Id da permissão é obrigatória.'),
  }),
});

export const getRolePermissionsSchema = z.object({
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

export const rolePermissionIdSchema = z.object({
  params: z.object({
    id: z.uuid({
      message: 'O Id da atribuição da permissão ao papel deve ser válido.',
    }),
  }),
});

export const updateRolePermissionSchema = z.object({
  params: z.object({
    id: z
      .uuid({
        message: 'O Id da atribuição da permissão ao papel deve ser válido.',
      })
      .min(1, 'O Id da atribuição da permissão ao papel é obrigatório.'),
  }),
  body: z
    .object({
      role_id: z.uuid({ message: 'O Id do papel deve ser válido.' }).optional(),
      permission_id: z
        .uuid({ message: 'O Id da permissão deve ser válido.' })
        .optional(),
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
