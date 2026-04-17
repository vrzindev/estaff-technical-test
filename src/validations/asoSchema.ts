import { z } from 'zod';

export const asoSchema = z.object({
  bio: z.string().optional(),
  hasAso: z.boolean(),
  asoType: z.enum(['simples', 'completo']).optional(),
  emissionDate: z.string().optional(),
  asoFile: z
    .object({
      name: z.string(),
      uri: z.string(),
      type: z.string(),
      size: z.number(),
    })
    .optional(),
  hasZigPayExperience: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.hasAso) {
    if (!data.asoType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'É necessário escolher um tipo de ASO para continuar',
        path: ['asoType'],
      });
    }

    if (!data.emissionDate || data.emissionDate.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'É necessário inserir a data de emissão para continuar',
        path: ['emissionDate'],
      });
    } else {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(data.emissionDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Data de emissão inválida',
          path: ['emissionDate'],
        });
      }
    }

    if (!data.asoFile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'É obrigatório enviar o documento ASO',
        path: ['asoFile'],
      });
    }
  }
});
