import { z } from 'zod';

export const createUserRoleSchema = z.object({
  body: z.object({
    user_id: z
      .uuid({ message: 'O Id do usuário deve ser válido.' })
      .min(1, 'O Id do usuário é obrigatório.'),

    role_id: z
      .uuid({ message: 'O Id do papel deve ser válido.' })
      .min(1, 'O Id do papel é obrigatório.'),
  }),
});

export const getUserRolesSchema = z.object({
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

export const userRoleIdSchema = z.object({
  params: z.object({
    id: z.uuid({
      message: 'O Id da atribuição do papel ao usuário deve ser válido.',
    }),
  }),
});

export const updateUserRoleSchema = z.object({
  params: z.object({
    id: z
      .uuid({
        message: 'O Id da atribuição do papel ao usuário deve ser válido.',
      })
      .min(1, 'O Id da atribuição do papel ao usuário é obrigatório.'),
  }),
  body: z
    .object({
      user_id: z
        .uuid({ message: 'O Id do usuário deve ser válido.' })
        .optional(),
      role_id: z.uuid({ message: 'O Id do papel deve ser válido.' }).optional(),
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
