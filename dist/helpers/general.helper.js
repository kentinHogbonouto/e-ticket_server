"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const libphonenumber_js_1 = require("libphonenumber-js");
const environments_1 = __importDefault(require("../configs/environments"));
class GeneralHelpers {
    /**
     * @function generateAdminToken
     * @description Generate JWt Token for admin.
     * @param payload The token payload
     * @return string
     */
    static generateAdminToken(payload) {
        const secret = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "configs", "certs", "institution", "private.pem"));
        return jsonwebtoken_1.default.sign(payload, secret, {
            algorithm: environments_1.default.getJwtTokenAlgorithm(),
            expiresIn: environments_1.default.getJwtTokenDuration(),
        });
    }
    /**
     * @function generateInstitutionToken
     * @description Generate JWt Token for institution.
     * @param payload The token payload
     * @return string
     */
    static generateInstitutionToken(payload) {
        const secret = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "configs", "certs", "institution", "private.pem"));
        return jsonwebtoken_1.default.sign(payload, secret, {
            algorithm: environments_1.default.getJwtTokenAlgorithm(),
            expiresIn: environments_1.default.getJwtTokenDuration(),
        });
    }
    /**
     * @function generateTeamMemberToken
     * @description Generate JWt Token for team member.
     * @param payload The token payload
     * @return string
     */
    static generateTeamMemberToken(payload) {
        const secret = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "configs", "certs", "institution", "private.pem"));
        return jsonwebtoken_1.default.sign(payload, secret, {
            algorithm: environments_1.default.getJwtTokenAlgorithm(),
            expiresIn: environments_1.default.getJwtTokenDuration(),
        });
    }
    /**
     * @function getPage
     * @description Get pagination data.
     * @param data The data
     * @param currentPage The current page
     * @param perPage The number of elements to return per page
     * @param totalElements The total elements in the model
     * @return Pagination
     */
    static getPage(data, currentPage, perPage, totalElements) {
        perPage = perPage === -1 ? totalElements : perPage;
        const page = {
            items: data,
            perPage,
            totalElements,
            currentPage,
            hasPreviousPage: currentPage > 1,
            previousPage: currentPage - 1,
            hasNextPage: perPage * currentPage < totalElements,
            nextPage: currentPage + 1,
            totalPages: Math.abs(Math.ceil(totalElements / perPage)),
        };
        return page;
    }
    /**
     * @function getPhoneNumber
     * @description Get phone number data.
     * @param phoneNumber The phoneNumber from which to extract data
     * @return PhoneNumber
     */
    static getPhoneNumber(phoneNumber) {
        const parsedPhoneNumber = (0, libphonenumber_js_1.parsePhoneNumber)(phoneNumber);
        return {
            phone: parsedPhoneNumber.nationalNumber,
            isoCode: parsedPhoneNumber.countryCallingCode,
            value: parsedPhoneNumber.number,
            countryCode: parsedPhoneNumber.country,
        };
    }
    /**
     * @function getTime
     * @description Get time data.
     * @param time The time from which to extract data
     * @return Time
     */
    static getTime(time) {
        const hour = time.hour < 10 ? `0${time.hour}` : time.hour;
        const minute = time.minute < 10 ? `0${time.minute}` : time.minute;
        return {
            hour: time.hour,
            minute: time.minute,
            value: `${hour}:${minute}`,
        };
    }
}
exports.default = GeneralHelpers;
//# sourceMappingURL=general.helper.js.map