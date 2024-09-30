import { EInfoStatus } from '@prisma/client';
import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    status: z.enum([...Object.keys(EInfoStatus)] as [string, ...string[]]),
    description: z.string({ required_error: 'description in required' }),
  }),
});
const updateValidation = z.object({
  body: z.object({}),
});
export const InfoValidation = {
  createValidation,
  updateValidation,
};
