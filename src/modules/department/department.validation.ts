import { z } from 'zod';

export const createDepartmentSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'O nome é obrigatório.')
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

    manager_id: z
      .uuid({ message: 'O Id do gerente do departamento deve ser válido.' })
      .min(1, 'O Id do gerente do departamento é obrigatório.'),

    is_active: z.boolean({ message: 'A opção deve ser válida.' }),

    description: z.string().optional(),
  }),
});

export const getDepartmentsSchema = z.object({
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

export const departmentIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'O Id do departamento deve ser válido.' }),
  }),
});

export const updateDepartmentSchema = z.object({
  params: z.object({
    id: z
      .uuid({ message: 'O Id do departamento deve ser válido.' })
      .min(1, 'O ID do departamento é obrigatório.'),
  }),
  body: z
    .object({
      name: z.string().min(3).optional(),
      description: z.string().optional(),
      manager_id: z
        .uuid({ message: 'O Id do gerente do departamento deve ser válido.' })
        .optional(),
      is_active: z.boolean({ message: 'A opção deve ser válida.' }).optional(),
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
