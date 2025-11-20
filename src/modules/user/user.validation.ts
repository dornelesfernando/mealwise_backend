import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório.')
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

    email: z
      .email({ message: 'Formato de e-mail inválido.' })
      .min(1, 'O e-mail é obrigatório.'),

    password: z
      .string()
      .min(1, 'A senha é obrigatória.')
      .min(6, 'A senha deve ter no mínimo 6 caracteres.'),

    hiring_date: z.coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), {
        message: 'A data de entrada na equipe deve ser válida.',
      })
      .min(1, 'A data de entrada na equipe é obrigatporia.'),

    position_id: z
      .uuid({ message: 'O Id do cargo deve ser válido.' })
      .min(1, 'O Id do cargo é obrigatório.'),

    cellphone: z.string().optional(),
    birth_date: z.coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), {
        message: 'A data de nascimento deve ser válida.',
      })
      .optional(),

    department_id: z.uuid().optional(),
    address: z.string().optional(),
    supervisor_id: z.uuid().optional(),
  }),
});

export const getUsersSchema = z.object({
  query: z.object({
    page: z.coerce
      .number()
      .int()
      .positive('A página deve ser um número positivo.')
      .default(1),
    limit: z.coerce
      .number()
      .int('O limite deve ser um número positivo.')
      .positive()
      .default(10),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'O Id do usuário deve ser válido.' }),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z
      .uuid({ message: 'O Id do usuário deve ser válido.' })
      .min(1, 'O Id do usuário é obrigatório.'),
  }),
  body: z
    .object({
      name: z.string().min(3).optional(),
      email: z.email().optional(),
      password: z.string().min(6).optional(),
      hiring_date: z.coerce
        .date()
        .refine((date) => !isNaN(date.getTime()), {
          message: 'A data de entrada na equipe deve ser válida.',
        })
        .optional(),
      address: z.string().optional(),
      position_id: z.uuid().optional(),
      cellphone: z.string().optional(),
      birth_date: z.coerce
        .date()
        .refine((date) => !isNaN(date.getTime()), {
          message: 'A data de nascimento deve ser válida.',
        })
        .optional(),
      department_id: z.uuid().optional(),
      supervisor_id: z.uuid().optional(),
      is_active: z.boolean().optional(),
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
