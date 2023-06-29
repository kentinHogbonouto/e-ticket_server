"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponses {
    static successMessage(message, success) {
        return {
            message,
            success,
        };
    }
    static success(data, message) {
        return Object.assign({ data }, this.successMessage(message, true));
    }
    static error(message, data) {
        return Object.assign({ data }, this.successMessage(message || "Some error occurred", false));
    }
}
exports.default = ApiResponses;
//# sourceMappingURL=api-responses.helper.js.map