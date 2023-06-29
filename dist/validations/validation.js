"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMessages = void 0;
class ValidationMessages {
    static lengthConstraintsFailed(constraints) {
        let error = "";
        if (!constraints)
            return error;
        if (constraints.min) {
            error = `Must contain at least ${constraints.min} ${constraints.min > 1 ? "characters" : "character"}`;
        }
        if (constraints.max) {
            error = `Must contain at must ${constraints.max} ${constraints.max > 1 ? "characters" : "character"}`;
        }
        return error;
    }
    static isPasswordConfirmationMatch(confirm, password) {
        return new Promise((resolve, reject) => {
            if (confirm !== password) {
                reject({
                    message: "Passwords must match.",
                    errorCode: 4,
                });
            }
            resolve(true);
        });
    }
}
exports.ValidationMessages = ValidationMessages;
ValidationMessages.FIELD_REQUIRED = "This field is required.";
ValidationMessages.USERNAME_ALREADY_IN_USE = "Username already in use.";
ValidationMessages.EMAIL_ALREADY_IN_USE = "email already in use.";
ValidationMessages.EMAIL_ALREADY_EXISTE = "Institution with this email already exist.";
ValidationMessages.PHONE_NUMBER_ALREADY_EXISTE = "Institution with this phone number already exist.";
ValidationMessages.SIRET_NUMBER_ALREADY_EXISTE = "Institution with this siret number already exist.";
ValidationMessages.POSTAL_ADDRESS_ALREADY_EXISTE = "Institution with this postal address already exist.";
ValidationMessages.INVALID_EMAIL_ADDRESS = "Invalid email address.";
ValidationMessages.PASSWORD_MUST_BE_PROVIDED = "Password must be provided.";
ValidationMessages.INCORRECT_OLD_PASSWORD = "Incorrect old password.";
ValidationMessages.MUST_BE_AN_ARRAY = "Must be an array.";
ValidationMessages.TOKEN_EXPIRED = "Token expired.";
//# sourceMappingURL=validation.js.map