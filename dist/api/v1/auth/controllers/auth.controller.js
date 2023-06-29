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
const express_validator_1 = require("express-validator");
const api_responses_helper_1 = __importDefault(require("../../../../helpers/api-responses.helper"));
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log("loginig for email : " + email + " password : " + password);
                const result = yield this.authService.authenticate(email, password);
                res
                    .status(200)
                    .json(api_responses_helper_1.default.success(result, "Succesfully authenticated."));
            }
            catch (err) {
                console.log("error on auth => : ", err);
                if (!err.status) {
                    err.status = 500;
                }
                next(err);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    const error = new Error("Validation failed.");
                    error.status = 422;
                    error.data = errors.array();
                    throw error;
                }
                const { requestId, password } = req.body;
                //await this.authService.resetPassword(requestId, password);
                res
                    .status(201)
                    .json(api_responses_helper_1.default.successMessage("Password succesfully reseted.", true));
            }
            catch (err) {
                if (!err.status) {
                    err.status = 500;
                }
                next(err);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map