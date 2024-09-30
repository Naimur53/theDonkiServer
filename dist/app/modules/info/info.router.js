"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const info_controller_1 = require("./info.controller");
const info_validation_1 = require("./info.validation");
const router = express_1.default.Router();
router.get('/', info_controller_1.InfoController.getAllInfo);
router.get('/:id', info_controller_1.InfoController.getSingleInfo);
router.post('/', (0, validateRequest_1.default)(info_validation_1.InfoValidation.createValidation), info_controller_1.InfoController.createInfo);
router.patch('/:id', (0, validateRequest_1.default)(info_validation_1.InfoValidation.updateValidation), info_controller_1.InfoController.updateInfo);
router.delete('/', info_controller_1.InfoController.deleteInfo);
exports.InfoRoutes = router;
