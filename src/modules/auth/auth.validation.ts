import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z
      .email({ message: 'Formato de e-mail inválido.' })
      .min(1, 'O e-mail é obrigatório.'),

    password: z
      .string()
      .min(1, 'A senha é obrigatória.')
      .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  }),
});

export const registerSchema = z.object({
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
  }),
});
