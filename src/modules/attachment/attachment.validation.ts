import { z } from 'zod';

export const fileSchema = z.object({
  buffer: z.instanceof(Buffer),
  originalname: z.string().min(1, 'O nome original do arquivo é obrigatório.'),
  mimetype: z.string().min(1, 'O tipo MIME do arquivo é obrigatório.'),
  size: z
    .number()
    .int()
    .positive('O tamanho do arquivo deve ser um número positivo.'),
});

export const createAttachmentSchema = z.object({
  body: z.object({
    creator_id: z.uuid('O creator_id deve ser um id válido.'),

    task_id: z.uuid('O task_id deve ser um id válido.').optional(),
    project_id: z.uuid('O project_id deve ser um id válido.').optional(),
  }),
});

export const getAttachmentsSchema = z.object({
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

export const attachmentIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'O Id do anexo deve ser válido.' }),
  }),
});

export const updateAttachmentSchema = z.object({
  params: z.object({
    id: z
      .uuid({ message: 'O Id do anexo deve ser válido.' })
      .min(1, 'O Id do anexo é obrigatório.'),
  }),
  body: z
    .object({
      file_name: z
        .string()
        .min(1, 'O nome do arquivo não pode ser vazio.')
        .optional(),
      task_id: z.uuid('O task_id deve ser um UUID válido.').optional(),
      project_id: z.uuid('O project_id deve ser um UUID válido.').optional(),
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
