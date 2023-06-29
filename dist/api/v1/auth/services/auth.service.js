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
const http_errors_1 = __importDefault(require("http-errors"));
const password_helper_1 = __importDefault(require("../../../../helpers/password.helper"));
const general_helper_1 = __importDefault(require("../../../../helpers/general.helper"));
const token_payload_interface_1 = require("../../../../interfaces/token-payload.interface");
const auth_validation_1 = require("../validations/auth.validation");
class AuthService {
    constructor(adminService) {
        this.adminService = adminService;
    }
    authenticate(identifier, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = "";
            const admin = yield this.adminService.findByEmail(identifier);
            if (admin) {
                if (!password) {
                    throw new http_errors_1.default.Forbidden(auth_validation_1.AuthValidationMessages.INCORRECT_PASSWORD);
                }
                const isEqual = yield password_helper_1.default.comparePasswords(password, admin.password);
                if (!isEqual) {
                    throw new http_errors_1.default.Forbidden(auth_validation_1.AuthValidationMessages.INCORRECT_PASSWORD);
                }
                return {
                    admin: admin,
                    token: token = general_helper_1.default.generateInstitutionToken({
                        userId: admin.id,
                        userType: token_payload_interface_1.UserType.ADMIN,
                    })
                };
            }
            if (!admin) {
                throw new http_errors_1.default.Forbidden(auth_validation_1.AuthValidationMessages.INCORRECT_IDENTIFIER);
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map