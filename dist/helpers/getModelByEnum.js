"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const getAiModelValue = (model) => {
    switch (model) {
        case client_1.EAiModel.GPT_4:
            return 'gpt-4';
        case client_1.EAiModel.GPT_4_TURBO:
            return 'gpt-4-turbo';
        case client_1.EAiModel.GPT_3_5_TURBO:
            return 'gpt-3.5-turbo';
        default:
            return 'gpt-3.5-turbo';
    }
};
exports.default = getAiModelValue;
