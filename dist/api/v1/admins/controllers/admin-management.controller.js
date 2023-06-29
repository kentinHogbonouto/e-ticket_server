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
const general_helper_1 = __importDefault(require("../../../../helpers/general.helper"));
const api_responses_helper_1 = __importDefault(require("../../../../helpers/api-responses.helper"));
const query_enum_1 = require("../../../../interfaces/models/query.enum");
const environments_1 = __importDefault(require("../../../../configs/environments"));
class AdminManagementController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { page, size, sort } = req.query;
                const params = {
                    page: Number(page) || 1,
                    sort: sort || query_enum_1.QuerySort.DESC,
                    size: Number(size) || environments_1.default.getPaginationItemsPerPage(),
                };
                const { admins, totalElements } = yield this.adminService.findAll(params);
                const response = general_helper_1.default.getPage(admins, params.page, params.size, totalElements);
                res
                    .status(200)
                    .json(api_responses_helper_1.default.success(response, "Admins successfully found."));
            }
            catch (err) {
                if (!err.status) {
                    err.status = 500;
                }
                next(err);
            }
        });
    }
    findById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const admin = yield this.adminService.findOne(id);
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
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    const error = new Error("Validation failed.");
                    error.status = 422;
                    error.data = errors.array();
                    throw error;
                }
                const { email, username, password } = req.body;
                const iCreateAdminDto = {
                    email,
                    password,
                    roleId: "63c95f17b8bdfa73146ce0cc",
                };
                const admin = yield this.adminService.create(iCreateAdminDto);
                res
                    .status(201)
                    .json(api_responses_helper_1.default.success({ admin }, "Admin successfully created."));
            }
            catch (err) {
                if (!err.status) {
                    err.status = 500;
                }
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    const error = new Error("Validation failed.");
                    error.status = 422;
                    error.data = errors.array();
                    throw error;
                }
                const { id } = req.params;
                const { username } = req.body;
                const { email } = req.body;
                const iUpdateAdminDto = { id, email };
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
    updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    const error = new Error("Validation failed.");
                    error.status = 422;
                    error.data = errors.array();
                    throw error;
                }
                const { id } = req.params;
                const { oldPassword, password } = req.body;
                const iUpdateAdminPasswordDto = {
                    id,
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
exports.default = AdminManagementController;
//# sourceMappingURL=admin-management.controller.js.map