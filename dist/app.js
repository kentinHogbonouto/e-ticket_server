"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const admin_accounts_seeder_1 = __importDefault(require("./api/v1/seeds/admin-accounts.seeder"));
const app_configs_1 = __importDefault(require("./configs/app.configs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/**
 * @description Create application server
 * @param app
 */
const server = (0, http_1.createServer)(app);
/**
 * @description Configure Application
 */
app_configs_1.default.init(app);
/**
 * @description Configure Routes
 */
app_configs_1.default.initRoutes(app);
/**
 * @description Handles errors
 */
app_configs_1.default.handleErrors(app);
/**
 * @description Initialize upload directory
 */
app_configs_1.default.fileDirectoryInitializer();
/**
 * @description Create admin account
 */
(0, admin_accounts_seeder_1.default)();
exports.default = server;
//# sourceMappingURL=app.js.map