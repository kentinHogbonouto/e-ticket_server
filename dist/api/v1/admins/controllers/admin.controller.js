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
class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    findByResetToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.params;
                const admin = yield this.adminService.findByResetToken(token);
                res
                    .status(200)
                    .json(api_responses_helper_1.default.success({ admin }, "Admin successfully found."));
            }
            catch (err) {
                if (!err.status) {
                    err.status = 500;
                }
                next(err);
            }
        });
    }
    findConnect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sub = req.auth;
                const admin = yield this.adminService.findOne(sub.userId);
                res
                    .status(200)
                    .json(api_responses_helper_1.default.success({ admin }, "Connected admin found."));
            }
            catch (err) {
                if (!err.status) {
                    err.status = 500;
                }
                next(err);
            }
        });
    }
    updateConnected(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    const error = new Error("Validation failed.");
                    error.status = 422;
                    error.data = errors.array();
                    throw error;
                }
                const sub = req.auth;
                const { email } = req.body;
                const iUpdateAdminDto = { id: sub.userId, email };
                const admin = yield this.adminService.update(iUpdateAdminDto);
                res
                    .status(201)
                    .json(api_responses_helper_1.default.success({ admin }, "Admin successfully updated."));
            }
            catch (err) {
                if (!err.status) {
                    err.status = 500;
                }
                next(err);
            }
        });
    }
    updateConnectedPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    const error = new Error("Validation failed.");
                    error.status = 422;
                    error.data = errors.array();
                    throw error;
                }
                const sub = req.auth;
                const { oldPassword, password } = req.body;
                const iUpdateAdminPasswordDto = {
                    id: sub.userId,
                    oldPassword,
                    password,
                };
                yield this.adminService.updatePassword(iUpdateAdminPasswordDto);
                res
                    .status(200)
                    .json(api_responses_helper_1.default.successMessage("Admin password successfully updated.", true));
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
exports.default = AdminController;
//# sourceMappingURL=admin.controller.js.map