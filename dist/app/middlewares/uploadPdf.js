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
const http_status_1 = __importDefault(require("http-status"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
// Function to extract text from PDF
const extractTextFromPDF = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, pdf_parse_1.default)(buffer);
    return data.text;
});
// Middleware to handle file upload and extract PDF content
const uploadPdfFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ body: req.body });
    req.body = {
        conversation: JSON.parse(req.body.conversation),
        // question: req.body.question,
    };
    //   upload(req, res, async err => {
    //     if (err) {
    //       console.log(err);
    //       throw new ApiError(httpStatus.BAD_REQUEST, 'File upload failed');
    //     }
    // Check if a PDF file is uploaded
    console.log({ mid: req.files, ai: req.file });
    if (Array.isArray(req.files)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You can only upload one pdf at a time');
    }
    if (req.files && req.files.pdf) {
        const mainFile = req.files.pdf;
        try {
            // Extract text from the PDF file
            const pdfText = yield extractTextFromPDF(mainFile === null || mainFile === void 0 ? void 0 : mainFile.data);
            if (pdfText) {
                console.log({ pdfText });
                // Update request body with extracted text
                const conversation = req.body.conversation;
                conversation[conversation.length - 1] = {
                    role: 'user',
                    content: `
                          PDF FILE CONTENT : ${pdfText}
                          
                          USER QUERY : ${conversation[conversation.length - 1].content}
                          `,
                };
                console.log({ conversation });
                req.body = Object.assign(Object.assign({}, req.body), { conversation });
            }
            // Add extracted text to request body
        }
        catch (error) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to extract PDF content');
        }
    }
    next();
    //   });
});
exports.default = uploadPdfFile;
