import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório.')
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

    project_id: z
      .uuid({ message: 'O Id do projeto deve ser válido.' })
      .min(1, 'O Id do projeto é obrigatório.'),

    creator_id: z
      .uuid({ message: 'O Id do criador deve ser válido.' })
      .min(1, 'O Id do criador é obrigatório.'),

    parent_id: z.uuid().optional(),
    description: z.string().optional(),
    due_date: z.coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), {
        message: 'A data de vencimento deve ser válida.',
      })
      .optional(),
    priority: z.string().optional(),
    status: z.string().optional(),
    assigned_users: z.uuid().optional(),
  }),
});

export const getTasksSchema = z.object({
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

export const taskIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'O Id da tarefa deve ser válido.' }),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1, 'O Id da tarefa é obrigatório.')
      .uuid({ message: 'O Id da tarefa deve ser válido.' }),
  }),
  body: z
    .object({
      name: z.string().min(3).optional(),
      project_id: z.uuid().optional(),
      creator_id: z.uuid().optional(),
      parent_id: z.uuid().optional(),
      description: z.string().optional(),
      due_date: z.coerce
        .date()
        .refine((date) => !isNaN(date.getTime()), {
          message: 'A data de vencimento deve ser válida.',
        })
        .optional(),
      priority: z.string().optional(),
      status: z.string().optional(),
      assigned_users: z.uuid().optional(),
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
