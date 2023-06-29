"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environments_1 = __importDefault(require("./environments"));
exports.default = {
    definition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: `${environments_1.default.getAppName()} API Server`,
            description: `<b>${environments_1.default.getAppName()} API Server Documentation</b>.`,
        },
        servers: [
            {
                url: environments_1.default.getServerURL(),
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        "./src/routes/index.routes.ts",
        "./src/api/v1/*/routes/*.ts",
    ],
};
//# sourceMappingURL=swagger.configs.js.map