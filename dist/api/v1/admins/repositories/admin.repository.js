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
const crypto_1 = __importDefault(require("crypto"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const password_helper_1 = __importDefault(require("../../../../helpers/password.helper"));
const environments_1 = __importDefault(require("../../../../configs/environments"));
class AdminRepository {
    countAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.count();
        });
    }
    findAll({ size, page, sort, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page && size) {
                return yield admin_model_1.default.find()
                    .skip((page - 1) * size)
                    .limit(size)
                    .select("+role")
                    .populate("role")
                    .sort({ createdAt: sort });
            }
            return yield admin_model_1.default.find()
                .select("+role")
                .populate("role")
                .sort({ createdAt: sort });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { email };
            return yield this.findOne(query);
        });
    }
    findByResetPasswordRequestId(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { resetPasswordRequestId: requestId };
            return yield this.findOne(query);
        });
    }
    findByResetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { resetToken: token };
            return yield admin_model_1.default.findOne(query).select("resetToken resetTokenExpiration resetPasswordRequestId email");
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield admin_model_1.default.findById(id).select("+role +password").populate("role");
        });
    }
    create(createAdminDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield password_helper_1.default.hashPassword(createAdminDto.password);
            return yield admin_model_1.default.create({
                email: createAdminDto.email,
                password: hashedPassword,
                role: createAdminDto.role,
            });
        });
    }
    update(updateAdminDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_model_1.default.findById(updateAdminDto.id).select("+password");
            if (!admin)
                return null;
            if (updateAdminDto.email)
                admin.email = updateAdminDto.email;
            if (updateAdminDto.password) {
                admin.password = yield password_helper_1.default.hashPassword(updateAdminDto.password);
            }
            return yield admin.save();
        });
    }
    generateResetPasswordToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_model_1.default.findById(id);
            if (!admin)
                return null;
            admin.resetToken = crypto_1.default.randomBytes(60).toString("hex");
            admin.resetTokenExpiration = new Date(Date.now() + environments_1.default.getResetPasswordTokenDuration());
            return yield admin.save();
        });
    }
    cleanResetPasswordToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_model_1.default.findById(id);
            if (!admin)
                return null;
            admin.resetToken = undefined;
            admin.resetTokenExpiration = undefined;
            return yield admin.save();
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield admin_model_1.default.findOne(query).select("+password");
        });
    }
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query) {
                return yield admin_model_1.default.countDocuments(query);
            }
            return yield admin_model_1.default.countDocuments();
        });
    }
}
exports.default = AdminRepository;
//# sourceMappingURL=admin.repository.js.map