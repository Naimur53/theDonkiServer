"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiConfigService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllAiConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const output = yield prisma_1.default.aiConfig.findFirst();
    if (!output) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'AiConfig not found!');
    }
    return output;
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const askedQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    const output = yield prisma_1.default.aiConfig.findFirst();
    if (!output) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'AiConfig not found!');
    }
    return output;
});
const createAiConfig = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // delete all the config
    yield prisma_1.default.aiConfig.deleteMany();
    const newAiConfig = yield prisma_1.default.aiConfig.create({
        data: payload,
    });
    return newAiConfig;
});
const getSingleAiConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aiConfig.findFirst();
    return result;
});
const increaseTruthfulCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aiConfig.update({
        where: { id: '1' },
        data: { unTruthfulCount: { increment: 1 } },
    });
    return result;
});
const updateAiConfig = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aiConfig.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteAiConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.aiConfig.deleteMany();
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'AiConfig not found!');
    }
    return result;
});
exports.AiConfigService = {
    getAllAiConfig,
    createAiConfig,
    updateAiConfig,
    getSingleAiConfig,
    deleteAiConfig,
    increaseTruthfulCount,
    askedQuestion,
};
