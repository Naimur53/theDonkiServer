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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiConfigController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const openai_1 = require("openai");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const getModelByEnum_1 = __importDefault(require("../../../helpers/getModelByEnum"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const aiConfig_service_1 = require("./aiConfig.service");
const openai = new openai_1.OpenAI({
    apiKey: config_1.default.openAiApi, // Load API key from .env
});
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
const askedQuestion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d, _e;
    const adminMessage = yield aiConfig_service_1.AiConfigService.getSingleAiConfig();
    if (!adminMessage) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong please try again');
    }
    const systemMessage = {
        role: 'system',
        content: ` 
        ${adminMessage === null || adminMessage === void 0 ? void 0 : adminMessage.instructions}
         
        Finally for each response you should add format  e.g., ** for bold, # for headers, etc.

        `,
    };
    const data = req.body;
    const info = {
        model: (0, getModelByEnum_1.default)(adminMessage.aiModel) || 'gpt-4',
        messages: [systemMessage, ...data.conversation],
        stream: true, // Enable streaming
    };
    console.log(info);
    const completion = yield openai.chat.completions.create({
        model: (0, getModelByEnum_1.default)(adminMessage.aiModel) || 'gpt-4',
        messages: [systemMessage, ...data.conversation],
        stream: true, // Enable streaming
    });
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    try {
        for (var _f = true, completion_1 = __asyncValues(completion), completion_1_1; completion_1_1 = yield completion_1.next(), _a = completion_1_1.done, !_a; _f = true) {
            _c = completion_1_1.value;
            _f = false;
            const part = _c;
            const content = (_e = (_d = part.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content;
            if (content) {
                res.write(content);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_f && !_a && (_b = completion_1.return)) yield _b.call(completion_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    res.end();
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
    askedQuestion,
};
