"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiConfig_router_1 = require("../modules/aiConfig/aiConfig.router");
const auth_route_1 = require("../modules/auth/auth.route");
const info_router_1 = require("../modules/info/info.router");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/ai-config',
        route: aiConfig_router_1.AiConfigRoutes,
    },
    {
        path: '/info',
        route: info_router_1.InfoRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
