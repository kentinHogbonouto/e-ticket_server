"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class EnvironmentConfigs {
    /**
     * @function getServerPort
     * @description Get server PORT.
     * @return number
     */
    static getServerPort() {
        return Number(process.env.PORT);
    }
    /**
     * @function getDatabaseURL
     * @description Get the database URL.
     * @return string
     */
    static getDatabaseURL() {
        const MONGODB_USERNAME = EnvironmentConfigs.inProduction
            ? process.env.E_TICKET_MONGODB_USERNAME
            : process.env.E_TICKET_DEV_MONGODB_USERNAME;
        const MONGODB_PASSWORD = EnvironmentConfigs.inProduction
            ? process.env.E_TICKET_MONGODB_PASSWORD
            : process.env.E_TICKET_DEV_MONGODB_PASSWORD;
        const MONGODB_DATABASE_NAME = EnvironmentConfigs.inProduction
            ? process.env.E_TICKET_MONGODB_DATABASE_NAME
            : process.env.E_TICKET_DEV_MONGODB_DATABASE_NAME;
        const MONGODB_DATABASE_HOST = EnvironmentConfigs.inProduction
            ? process.env.E_TICKET_MONGODB_DATABASE_HOST
            : process.env.E_TICKET_DEV_MONGODB_DATABASE_HOST;
        console.log(MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_DATABASE_NAME, MONGODB_DATABASE_HOST);
        let url = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_DATABASE_HOST}/${MONGODB_DATABASE_NAME}`;
        console.log("url: ", url);
        return url;
    }
    /**
     * @function getAppName
     * @description Get server app name.
     * @return string
     */
    static getAppName() {
        return process.env.E_TICKET_APP_NAME || "E_TICKET api";
    }
    /**
     * @function getServerURL
     * @description Get server app name.
     * @return string
     */
    static getServerURL() {
        return EnvironmentConfigs.inProduction
            ? process.env.E_TICKET_SERVER_URL || ""
            : `http://localhost:${this.getServerPort()}`;
    }
    /**
     * @function serverStartedMessage
     * @description Get server started message.
     * @return string
     */
    static serverStartedMessage() {
        return `${this.getAppName()} server started on ${this.getServerURL()}`;
    }
    /**
     * @function getJwtTokenAlgorithm
     * @description Get Jwt algorithm used to generate the JWT token.
     * @return string[]
     */
    static getJwtTokenAlgorithm() {
        return process.env.JWT_TOKEN_ALGORITHM || [""];
    }
    /**
     * @function getJwtTokenDuration
     * @description Get Jwt duration.
     * @return string
     */
    static getJwtTokenDuration() {
        return process.env.JWT_TOKEN_DURATION || "24h";
    }
    /**
     * @function getAuthorizedFileMinetypes
     * @description Get authorized file minetypes.
     * @return string[]
     */
    static getAuthorizedFileMinetypes() {
        const minetypes = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/svg+xml",
            "application/octet-stream",
        ];
        return minetypes;
    }
    /**
     * @function getAuthorizedFileTypes
     * @description Get authorized file types.
     * @return string[]
     */
    static getAuthorizedFileTypes() {
        const types = ["IMAGE", "PDF", "VIDEO"];
        return types;
    }
    /**
     * @function getMaximumFileSize
     * @description Get maximum file size in MB.
     * @return number
     */
    static getMaximumFileSize() {
        return Number(process.env.MAX_FILE_SIZE_MB) || 5;
    }
    /**
     * @function getResetPasswordTokenDuration
     * @description Get the duration of reset password token in milliseconds. Default 1h
     * @return number
     */
    static getResetPasswordTokenDuration() {
        return (Number(process.env.RESET_PASSWORD_TOKEN_DURATION) || 3600) * 1000;
    }
    /**
     * @function getPaginationItemsPerPage
     * @description Get the number of items per that will be returned per page
     * @return number
     */
    static getPaginationItemsPerPage() {
        return Number(process.env.ITEMS_PER_PAGE) || 12;
    }
    /**
     * @function getPasswordMinLength
     * @description Get the minimum length required for passwords
     * @return number
     */
    static getPasswordMinLength() {
        return Number(process.env.PASSWORD_MIN_LENGTH) || 8;
    }
}
exports.default = EnvironmentConfigs;
EnvironmentConfigs.inProduction = process.env.NODE_ENV === "production";
//# sourceMappingURL=index.js.map