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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class PasswordHelpers {
    /**
     * @function hashPassword
     * @description Generate hash password.
     * @param password The password to hash.
     * @return Promise<string>
     */
    static hashPassword(password) {
        return new Promise(function (resolve, reject) {
            resolve(bcryptjs_1.default.hash(password, 15));
        });
    }
    /**
     * @function comparePasswords
     * @description Compare two passwords.
     * @param password The password to compare with the encrypted password.
     * @param encrypted The encrypted password.
     * @return Promise<boolean>
     */
    static comparePasswords(password = "", encrypted = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                resolve(bcryptjs_1.default.compare(password, encrypted));
            });
        });
    }
}
exports.default = PasswordHelpers;
//# sourceMappingURL=password.helper.js.map