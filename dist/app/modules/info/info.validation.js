"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...Object.keys(client_1.EInfoStatus)]),
        description: zod_1.z.string({ required_error: 'description in required' }),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({}),
});
exports.InfoValidation = {
    createValidation,
    updateValidation,
};
