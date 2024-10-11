"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiConfigRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const uploadPdf_1 = __importDefault(require("../../middlewares/uploadPdf"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const aiConfig_controller_1 = require("./aiConfig.controller");
const aiConfig_validation_1 = require("./aiConfig.validation");
const router = express_1.default.Router();
router.get('/', aiConfig_controller_1.AiConfigController.getAllAiConfig);
router.post('/asked', 
// validateRequest(AiConfigValidation.askedValidation),
// verifyRecaptcha,
uploadPdf_1.default, aiConfig_controller_1.AiConfigController.askedQuestion);
router.post('/increase-untruthful-count', aiConfig_controller_1.AiConfigController.increaseTruthfulCount);
router.post('/', (0, auth_1.default)(), (0, validateRequest_1.default)(aiConfig_validation_1.AiConfigValidation.createValidation), aiConfig_controller_1.AiConfigController.createAiConfig);
router.patch('/', (0, auth_1.default)(), (0, validateRequest_1.default)(aiConfig_validation_1.AiConfigValidation.updateValidation), aiConfig_controller_1.AiConfigController.updateAiConfig);
router.delete('/', (0, auth_1.default)(), aiConfig_controller_1.AiConfigController.deleteAiConfig);
exports.AiConfigRoutes = router;
