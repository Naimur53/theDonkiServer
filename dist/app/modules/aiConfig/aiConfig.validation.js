"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiConfigValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        aiModel: zod_1.z.enum([...Object.keys(client_1.EAiModel)]),
        instructions: zod_1.z.string({ required_error: 'instruction in required' }),
        unTruthfulCount: zod_1.z.number({ required_error: 'instruction' }).default(0),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        aiModel: zod_1.z
            .enum([...Object.keys(client_1.EAiModel)])
            .optional(),
        instructions: zod_1.z
            .string({ required_error: 'instruction in required' })
            .optional(),
        unTruthfulCount: zod_1.z.number({ required_error: 'instruction' }).optional(),
    }),
});
const askedValidation = zod_1.z.object({
    conversation: zod_1.z.array(zod_1.z.object({
        role: zod_1.z.enum(['user', 'assistant']),
        content: zod_1.z.string({ required_error: 'content is  in required' }),
    })),
});
exports.AiConfigValidation = {
    createValidation,
    updateValidation,
    askedValidation,
};
