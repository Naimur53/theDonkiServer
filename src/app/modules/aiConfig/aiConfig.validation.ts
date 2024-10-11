import { EAiModel } from '@prisma/client';
import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    aiModel: z.enum([...Object.keys(EAiModel)] as [string, ...string[]]),
    instructions: z.string({ required_error: 'instruction in required' }),
    unTruthfulCount: z.number({ required_error: 'instruction' }).default(0),
  }),
});
const updateValidation = z.object({
  body: z.object({
    aiModel: z
      .enum([...Object.keys(EAiModel)] as [string, ...string[]])
      .optional(),
    instructions: z
      .string({ required_error: 'instruction in required' })
      .optional(),
    unTruthfulCount: z.number({ required_error: 'instruction' }).optional(),
  }),
});
const askedValidation = z.object({
  conversation: z.array(
    z.object({
      role: z.enum(['user', 'assistant'] as [string, ...string[]]),
      content: z.string({ required_error: 'content is  in required' }),
    })
  ),
});
export const AiConfigValidation = {
  createValidation,
  updateValidation,
  askedValidation,
};
