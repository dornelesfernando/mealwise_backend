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

// Aqui é o register
// Regex
const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
const cpfRegex = /^(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/;
const cnpjRegex = /^(?:\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{14})$/;

const baseSchema = z.object({
  name: z.string().trim().min(3, 'Nome muito curto'),
  email: z.string().trim().email('Email inválido'),
  password: z.string().trim().min(6, 'Mínimo 6 caracteres'),
  // Ajuste leve no phone para garantir que string vazia passe sem brigar com o regex
  phone: z.union([
    z.string().regex(phoneRegex, 'Formato inválido'),
    z.literal('')
  ]).optional(),
});

const customerSchema = baseSchema.extend({
  role: z.literal('customer'),
  cpf: z.string().regex(cpfRegex, 'CPF inválido'),
  city: z.string().trim().min(1, 'Cidade é obrigatória'),
  address: z.string().trim().min(1, 'Endereço é obrigatório'),
});

const establishmentSchema = baseSchema.extend({
  role: z.literal('establishment'),
  cnpj: z.string().regex(cnpjRegex, 'CNPJ inválido'),
  city: z.string().trim().min(1, 'Cidade é obrigatória'),
  address: z.string().trim().min(1, 'Endereço é obrigatório'),
});

const deliverymanSchema = baseSchema.extend({
  role: z.literal('deliveryman'),
  cpf: z.string().regex(cpfRegex, 'CPF inválido'),
  birthdate: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Data inválida',
    }),
  university: z.string().trim().min(1, 'Universidade obrigatória'),
});

export const registerSchema = z.object({
  body: z.discriminatedUnion('role', [
    customerSchema,
    establishmentSchema,
    deliverymanSchema,
  ]),
});

export type RegisterFormData = z.infer<typeof registerSchema>['body'];
