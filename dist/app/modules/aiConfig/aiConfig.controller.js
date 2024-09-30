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
exports.AiConfigController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const aiConfig_service_1 = require("./aiConfig.service");
const createAiConfig = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AiConfigData = req.body;
    const result = yield aiConfig_service_1.AiConfigService.createAiConfig(AiConfigData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'AiConfig Created successfully!',
        data: result,
    });
}));
const getAllAiConfig = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield aiConfig_service_1.AiConfigService.getAllAiConfig();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'AiConfig retrieved successfully !',
        data: result,
    });
}));
const getSingleAiConfig = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield aiConfig_service_1.AiConfigService.getSingleAiConfig();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'AiConfig retrieved  successfully!',
        data: result,
    });
}));
const increaseTruthfulCount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield aiConfig_service_1.AiConfigService.increaseTruthfulCount();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Dislike added!',
        data: { unTruthfulCount: result === null || result === void 0 ? void 0 : result.unTruthfulCount },
    });
}));
const updateAiConfig = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateAbleData = req.body;
    const result = yield aiConfig_service_1.AiConfigService.updateAiConfig(id, updateAbleData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'AiConfig Updated successfully!',
        data: result,
    });
}));
const deleteAiConfig = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield aiConfig_service_1.AiConfigService.deleteAiConfig();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'AiConfig deleted successfully!',
        data: result,
    });
}));
exports.AiConfigController = {
    getAllAiConfig,
    createAiConfig,
    updateAiConfig,
    getSingleAiConfig,
    deleteAiConfig,
    increaseTruthfulCount,
};
