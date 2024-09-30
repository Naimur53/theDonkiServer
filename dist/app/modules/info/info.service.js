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
exports.InfoService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield prisma_1.default.info.findFirst();
    if (!total) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Info not found!');
    }
    return total;
});
const createInfo = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // delete all the info
    yield prisma_1.default.info.deleteMany();
    const newInfo = yield prisma_1.default.info.create({
        data: payload,
    });
    return newInfo;
});
const getSingleInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.info.findFirst();
    return result;
});
const updateInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.info.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.info.delete({
        where: { id },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Info not found!');
    }
    return result;
});
exports.InfoService = {
    getAllInfo,
    createInfo,
    updateInfo,
    getSingleInfo,
    deleteInfo,
};
