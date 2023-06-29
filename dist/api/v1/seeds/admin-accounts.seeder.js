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
const admin_model_1 = __importDefault(require("../admins/models/admin.model"));
const password_helper_1 = __importDefault(require("../../../helpers/password.helper"));
function seedSuperAdmins() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hasPassword = yield password_helper_1.default.hashPassword(process.env.E_TICKET_SUPER_ADMIN_DEFAULT_PASSWORD);
            const superAdmins = [
                {
                    email: process.env.E_TICKET_SUPER_ADMIN_DEFAULT_EMAIL,
                    password: hasPassword,
                },
            ];
            const existingSuperAdmins = yield admin_model_1.default.find();
            if (!existingSuperAdmins.length) {
                for (const superAdmin of superAdmins) {
                    const newSuperAdmin = new admin_model_1.default(superAdmin);
                    yield newSuperAdmin.save();
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.default = seedSuperAdmins;
//# sourceMappingURL=admin-accounts.seeder.js.map