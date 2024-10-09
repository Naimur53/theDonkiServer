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
    var _d, _e, _f, _g;
    console.log('form api', req.file, req.files);
    try {
        // Fetch admin configuration
        const adminMessage = yield aiConfig_service_1.AiConfigService.getSingleAiConfig();
        if (!adminMessage) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong, please try again');
        }
        // Prepare the system message
        const systemMessage = {
            role: 'system',
            content: `
    ABOUT THIS APP : Its a application for answer user questions or researching information of Bible. You name is The Donki Ai. 
      
    Main INSTRUCTION: ${adminMessage === null || adminMessage === void 0 ? void 0 : adminMessage.instructions}
    
    About USER question: user may only provide question or include pdf query too. If you found the pdf information not related to Bible book or real please politely tell them to asked about the bible.

    UI INSTRUCTION : Ensure each response includes appropriate markdown formatting to enhance the display. Use ** for bold text, # for headers, > for quote, and - for lists etc as we are using react-markdown to render the UI similar to ChatGPT. Apply markdown where necessary to structure the content effectively. if react markdown supports other markup formatting that i did't mention but you can add to make the ui more readable then please add those markup too.
        `,
        };
        // Extract data from request
        const data = req.body;
        // Define the chat request parameters
        console.log({
            model: (0, getModelByEnum_1.default)(adminMessage.aiModel) || 'gpt-4',
            messages: [systemMessage, ...data.conversation],
            stream: true, // Enable streaming
        }, 'form api ');
        // Call the OpenAI API
        const completion = yield openai.chat.completions.create({
            model: (0, getModelByEnum_1.default)(adminMessage.aiModel) || 'gpt-4',
            messages: [systemMessage, ...data.conversation],
            stream: true, // Enable streaming
        });
        // Set response headers for streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        try {
            // Stream the response
            for (var _h = true, completion_1 = __asyncValues(completion), completion_1_1; completion_1_1 = yield completion_1.next(), _a = completion_1_1.done, !_a; _h = true) {
                _c = completion_1_1.value;
                _h = false;
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
                if (!_h && !_a && (_b = completion_1.return)) yield _b.call(completion_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // End the streaming response
        res.end();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        // Error handling for OpenAI API issues
        if (((_f = error.response) === null || _f === void 0 ? void 0 : _f.status) === 429) {
            // Quota limit reached or rate limit error
            throw new ApiError_1.default(http_status_1.default.TOO_MANY_REQUESTS, 'Quota exceeded or too many requests, please try again later.');
        }
        else if (((_g = error.response) === null || _g === void 0 ? void 0 : _g.status) === 401) {
            // Invalid API key or authentication error
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid API key or authentication failed.');
        }
        else {
            // Handle any other errors
            console.error('OpenAI API error:', error);
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'An error occurred while processing the request.');
        }
    }
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
