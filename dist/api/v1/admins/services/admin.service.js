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
const validation_1 = require("../../../../validations/validation");
const admin_validation_1 = require("../validations/admin.validation");
class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    /**
     * @function findByResetToken
     * @description Get admin by his reset password token.
     * @param token
     * @return Promise<Admin | null>
     */
    findByResetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = yield this.adminRepository.findByResetToken(token);
            if (!admin) {
                throw new http_errors_1.default.NotFound(admin_validation_1.AdminValidationMessages.NOT_FOUND);
            }
            if (admin.resetTokenExpiration &&
                new Date(admin.resetTokenExpiration).getTime() <= Date.now()) {
                throw new http_errors_1.default.Forbidden(validation_1.ValidationMessages.TOKEN_EXPIRED);
            }
            admin = yield this.adminRepository.findByEmail(admin.email);
            return admin;
        });
    }
    /**
     * @function findAll
     * @description Get the list of all admins
     * @param iFindAllAdminsDto An object of type IFindAllAdminsDto containing the query filters
     * @return Promise<{ admins: Admin[]; totalElements: number }>
     */
    findAll(iFindAllAdminsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let admins = [];
            let totalElements = yield this.adminRepository.countAll();
            if (iFindAllAdminsDto.size === -1) {
                admins = yield this.adminRepository.findAll({
                    sort: iFindAllAdminsDto.sort,
                });
            }
            else {
                admins = yield this.adminRepository.findAll({
                    size: iFindAllAdminsDto.size,
                    sort: iFindAllAdminsDto.sort,
                    page: iFindAllAdminsDto.page,
                });
            }
            return { admins, totalElements };
        });
    }
    /**
     * @function findOne
     * @description GET admin by id
     * @param id The id of the admin
     * @return Promise<Admin>
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findById(id);
        });
    }
    /**
     * @function findByEmail
     * @description Get admin by email
     * @param email The email of the admin
     * @return Promise<Admin | null>
     */
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.findByEmail(email);
        });
    }
    /**
     * @function findByResetPasswordRequestId
     * @description Get admin by reset password request id
     * @param requestId The request id
     * @return Promise<Admin | null>
     */
    findByResetPasswordRequestId(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.findByResetPasswordRequestId(requestId);
        });
    }
    /**
     * @function create
     * @description Create an admin
     * @param iCreateAdminDto An object of type ICreateAdminDto containing the admin account informations
     * @return Promise<Admin>
     */
    create(iCreateAdminDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingAdminWithEmail = yield this.adminRepository.findByEmail(iCreateAdminDto.email);
            if (existingAdminWithEmail) {
                throw new http_errors_1.default.Forbidden(validation_1.ValidationMessages.EMAIL_ALREADY_IN_USE);
            }
            const createAdminDto = {
                email: iCreateAdminDto.email,
                password: iCreateAdminDto.password,
                role: iCreateAdminDto.roleId,
            };
            let admin = yield this.adminRepository.create(createAdminDto);
            return this.findById(admin.id);
        });
    }
    /**
     * @function update
     * @description Update an admin
     * @param iUpdateAdminDto An object of type IUpdateAdminDto containing the admin account informations
     * @return Promise<Admin>
     */
    update(iUpdateAdminDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = yield this.findById(iUpdateAdminDto.id);
            const updateAdminDto = {
                id: iUpdateAdminDto.id,
            };
            if (iUpdateAdminDto.email) {
                const existingAdminWithEmail = yield this.adminRepository.findByEmail(iUpdateAdminDto.email);
                if (existingAdminWithEmail) {
                    throw new http_errors_1.default.Forbidden(validation_1.ValidationMessages.EMAIL_ALREADY_IN_USE);
                }
                updateAdminDto.email = iUpdateAdminDto.email;
            }
            admin = yield this.adminRepository.update(updateAdminDto);
            return admin;
        });
    }
    /**
     * @function updatePassword
     * @description Update an admin password
     * @param iUpdateAdminPasswordDto An object of type IUpdateTeacherPasswordDto containing the admin password
     * @return Promise<void>
     */
    updatePassword(iUpdateAdminPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = yield this.findOne(iUpdateAdminPasswordDto.id);
            if (!iUpdateAdminPasswordDto.password) {
                throw new http_errors_1.default.Forbidden(validation_1.ValidationMessages.PASSWORD_MUST_BE_PROVIDED);
            }
            const isEqual = yield password_helper_1.default.comparePasswords(iUpdateAdminPasswordDto.oldPassword, admin.password);
            if (!isEqual) {
                throw new http_errors_1.default.Forbidden(validation_1.ValidationMessages.INCORRECT_OLD_PASSWORD);
            }
            const updateAdminDto = {
                id: iUpdateAdminPasswordDto.id,
                password: iUpdateAdminPasswordDto.password,
            };
            yield this.adminRepository.update(updateAdminDto);
            return;
        });
    }
    /**
     * TODO
     * @function resetPassword
     * @description
     * @param iResetAdminPasswordDto
     * @return void
     */
    resetPassword(iResetAdminPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateAdminDto = {
                id: iResetAdminPasswordDto.id,
                password: iResetAdminPasswordDto.password,
                resetPasswordRequestId: iResetAdminPasswordDto.resetPasswordRequestId,
            };
            yield this.adminRepository.update(updateAdminDto);
            return;
        });
    }
    /**
     * TODO
     * @function generateResetPasswordToken
     * @description
     * @param id
     * @return Promise<Admin | null>
     */
    generateResetPasswordToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.generateResetPasswordToken(id);
        });
    }
    /**
     * TODO
     * @function findById
     * @description
     * @param id
     * @return
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.findById(id);
            if (!admin) {
                throw new http_errors_1.default.NotFound(admin_validation_1.AdminValidationMessages.NOT_FOUND);
            }
            return admin;
        });
    }
}
exports.default = AdminService;
//# sourceMappingURL=admin.service.js.map