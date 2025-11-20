import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório.')
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

    start_date: z.coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), {
        message: 'A data de início do projeto deve ser válida.',
      })
      .min(1, 'A data de início é obrigatória.'),

    manager_id: z
      .uuid({ message: 'O Id do gerente do projeto deve ser válido.' })
      .min(1, 'O Id do gerente do projeto é obrigatório.'),

    priority: z.string().min(1, 'A prioridade é obrigatória.'),

    parent_id: z.uuid().optional(),
    description: z.string().optional(),
    priority_rank: z.number().optional(),
    status: z.string().optional(),
    expected_end_date: z.coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), {
        message:
          'A data de expectativa para finalização do projeto deve ser válida.',
      })
      .optional(),
  }),
});

export const getProjectsSchema = z.object({
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

export const projectIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'O Id do projeto deve ser válido.' }),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z
      .uuid({ message: 'O Id do projeto deve ser válido.' })
      .min(1, 'O Id do projeto é obrigatório.'),
  }),
  body: z
    .object({
      name: z.string().min(3).optional(),
      start_date: z.coerce
        .date()
        .refine((date) => !isNaN(date.getTime()), {
          message: 'A data de início do projeto deve ser válida.',
        })
        .optional(),
      parent_id: z.uuid().optional(),
      manager_id: z.uuid().optional(),
      description: z.string().optional(),
      priority: z.string().optional(),
      priority_rank: z.number().optional(),
      status: z.string().optional(),
      expected_end_date: z.coerce
        .date()
        .refine((date) => !isNaN(date.getTime()), {
          message:
            'A data de expectativa para finalização do projeto deve ser válida.',
        })
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
