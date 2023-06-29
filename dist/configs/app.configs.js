"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_jwt_1 = require("express-jwt");
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const swagger_configs_1 = __importDefault(require("./swagger.configs"));
const express_jwt_configs_1 = __importDefault(require("./express-jwt.configs"));
const index_routes_1 = __importDefault(require("../routes/index.routes"));
const api_responses_helper_1 = __importDefault(require("../helpers/api-responses.helper"));
class ApplicationConfigs {
    static init(app) {
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "public")));
        /**
         * @description Picture path
         */
        const uploadDir = path_1.default.join(__dirname, "..", "..", "upload");
        app.use("/upload", express_1.default.static(uploadDir));
        app.use((0, cors_1.default)({
            origin: "*",
        }));
        app.use((0, helmet_1.default)());
        app.enable("trust proxy");
        app.use((0, compression_1.default)());
        /**
         * @description Register the swagger documentation endpoint
         */
        app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swagger_configs_1.default)));
        /**
         * @description Set mongoose in strict mode
         */
        mongoose_1.default.set("strictQuery", false);
        /**
         * @description Add JWT protection to all routes
         */
        app.use((0, express_jwt_1.expressjwt)(express_jwt_configs_1.default).unless({
            path: [/^\/api\/v1\/auth\/*/],
        }));
    }
    static fileDirectoryInitializer() {
        /**
         * @description Create upload direcotry
         */
        const parentFolderName = "upload";
        const folderName = "images";
        const parentPath = `./${parentFolderName}`;
        const path = `${parentPath}/${folderName}`;
        if (!fs_1.default.existsSync(parentPath)) {
            fs_1.default.mkdirSync(parentPath);
        }
        if (!fs_1.default.existsSync(path)) {
            fs_1.default.mkdirSync(path);
        }
    }
    static initRoutes(app) {
        /**
         * @description Register the API routes
         */
        app.use("/api", (0, index_routes_1.default)());
    }
    static handleErrors(app) {
        /**
         * @description Handle Route Not Found errors
         */
        app.use((req, res, next) => {
            next(new http_errors_1.default.NotFound("API not found"));
        });
        /**
         * @description Handle General errors
         */
        app.use((error, req, res, next) => {
            const status = error.status || 500;
            let message = error.message;
            let data = error.data;
            let errors = [];
            if (status === 422) {
                data.forEach((error) => {
                    const index = errors.findIndex((elmt) => elmt.field === error.param);
                    if (index === -1) {
                        const errorData = {
                            field: error.param,
                        };
                        if (typeof error.msg == "string") {
                            errorData.message = error.msg;
                        }
                        else {
                            errorData.message = error.msg.message;
                        }
                        errors.push(errorData);
                    }
                });
                data = errors;
            }
            res.status(status).json(api_responses_helper_1.default.error(message, data));
        });
    }
}
exports.default = ApplicationConfigs;
//# sourceMappingURL=app.configs.js.map