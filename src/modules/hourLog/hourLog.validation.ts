import { z } from 'zod';

export const createHourLogSchema = z.object({
  body: z.object({
    task_id: z
      .uuid({ message: 'O Id da tarefa deve ser válida.' })
      .min(1, 'A tarefa é obrigatória.'),

    user_id: z
      .uuid({ message: 'O Id do usuário deve ser válido.' })
      .min(1, 'O usuário é obrigatório.'),

    log_date: z.coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), {
        message: 'A data do registro deve ser válida.',
      })
      .min(1, 'A data do registro é obrigatória.'),

    startTime: z.string().min(1, 'A hora inicial é obrigatória.'),

    end_time: z.string().min(1).optional(),
    hour_woeked: z.number().min(1).optional(),
    description: z.string().optional(),
  }),
});

export const getHourLogSchema = z.object({
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

export const hourLogIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'O Id do registro de hora deve ser válido.' }),
  }),
});

export const updateHourLogSchema = z.object({
  params: z.object({
    id: z
      .uuid({ message: 'O Id do registro de hora deve ser válido.' })
      .min(1, 'O ID da posição é obrigatório.'),
  }),
  body: z
    .object({
      task_id: z
        .uuid({ message: 'O Id da tarefa deve ser válida.' })
        .optional(),
      user_id: z
        .uuid({ message: 'O Id do usuário deve ser válido.' })
        .optional(),
      log_date: z.coerce
        .date()
        .refine((date) => !isNaN(date.getTime()), {
          message: 'A data do registro de hora deve ser válida.',
        })
        .optional(),
      startTime: z.string().optional(),
      end_time: z.string().optional(),
      hour_woeked: z.number().optional(),
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
