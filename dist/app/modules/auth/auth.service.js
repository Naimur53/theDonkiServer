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
exports.AuthService = void 0;
const axios_1 = __importDefault(require("axios"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const auth_utils_1 = require("./auth.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: givenEmail, password } = payload;
    let adminLoginStatus = yield prisma_1.default.admin.findFirst();
    if (!adminLoginStatus) {
        adminLoginStatus = yield prisma_1.default.admin.create({
            data: { failedAttempts: 0, lastLogin: new Date() },
        });
    }
    //create access token & refresh token
    if ((adminLoginStatus === null || adminLoginStatus === void 0 ? void 0 : adminLoginStatus.failedAttempts) > 3) {
        if (!(0, auth_utils_1.isFiveMinutesAgo)(adminLoginStatus.updatedAt)) {
            throw new ApiError_1.default(http_status_1.default.TOO_MANY_REQUESTS, `Too many failed attempts please try again after ${(0, auth_utils_1.checkDateWithinFiveMinutes)(adminLoginStatus.updatedAt)}`);
        }
    }
    // check is email and password valid
    if (givenEmail !== config_1.default.mainAdminEmail ||
        password !== config_1.default.mainAdminEmailPass) {
        yield prisma_1.default.admin.update({
            where: { id: '1' },
            data: { failedAttempts: { increment: 1 } },
        });
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid email or password');
    }
    yield prisma_1.default.admin.update({
        where: { id: '1' },
        data: {
            failedAttempts: 0,
            lastLogin: new Date(),
        },
    });
    const id = config_1.default.mainAdminEmail;
    const role = 'admin';
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId: id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const captchaValidator = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const token = payload.token;
    const response = yield axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify?secret=${config_1.default.captchaSecretKey}&response=${token}`);
    return response.data;
});
exports.AuthService = {
    loginUser,
    captchaValidator,
};
