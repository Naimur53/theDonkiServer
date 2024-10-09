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
const axios_1 = __importDefault(require("axios"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
// Function to validate the token
const captchaValidator = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const token = payload.token;
    const response = yield axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify?secret=${config_1.default.captchaSecretKey}&response=${token}`);
    return response.data;
});
// Middleware function to check reCAPTCHA token
const verifyRecaptcha = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the token from the request (from body, query, or headers)
        const token = req.body.token || req.query.token || req.headers['authorization'];
        // console.log(req.headers['authorization']);
        // If no token is found, return a 400 error
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid token');
        }
        // Validate the token
        const captchaResponse = yield captchaValidator({ token });
        console.log(captchaResponse);
        // If validation fails, return a 403 error
        if (!captchaResponse.success) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid captcha');
        }
        // If the token is valid, proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Handle errors and respond with a 500 status
        console.error('Error verifying reCAPTCHA:', error);
        next(error);
    }
});
exports.default = verifyRecaptcha;
