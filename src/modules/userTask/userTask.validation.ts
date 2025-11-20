import { z } from 'zod';

export const createUserTaskSchema = z.object({
  body: z.object({
    user_id: z
      .uuid({ message: 'O Id do usuário deve ser válido.' })
      .min(1, 'O Id do usuário é obrigatório.'),

    task_id: z
      .uuid({ message: 'O Id da tarefa deve ser válido.' })
      .min(1, 'O Id da tarefa é obrigatório.'),

    assignment_date: z.coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), {
        message: 'A data de atribuição deve ser válida.',
      })
      .min(1, 'A data de atribuição é obrigatória.'),

    is_main_responsible: z.boolean({ message: 'A opção deve ser válida.' }),
  }),
});

export const getUserTasksSchema = z.object({
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

export const userTaskIdSchema = z.object({
  params: z.object({
    id: z.uuid({
      message: 'O Id da atribuição da tarefa ao usuário deve ser válido.',
    }),
  }),
});

export const updateUserTaskSchema = z.object({
  params: z.object({
    id: z
      .uuid({
        message: 'O Id da atribuição da tarefa ao usuário deve ser válido.',
      })
      .min(1, 'O Id da atribuição da tarefa ao usuário é obrigatório.'),
  }),
  body: z
    .object({
      user_id: z
        .uuid({ message: 'O Id do usuário deve ser válido.' })
        .optional(),
      task_id: z
        .uuid({ message: 'O Id da tarefa deve ser válido.' })
        .optional(),
      assignment_date: z.coerce
        .date()
        .refine((date) => !isNaN(date.getTime()), {
          message: 'A data de atribuição deve ser válida.',
        })
        .optional(),
      is_main_responsible: z.boolean().optional(),
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
