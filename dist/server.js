"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const environments_1 = __importDefault(require("./configs/environments"));
const server_configs_1 = __importDefault(require("./configs/server.configs"));
const database_configs_1 = __importDefault(require("./configs/database.configs"));
/**
 * @description Configure Database
 */
database_configs_1.default.init();
/**
 * @function startServer
 * @description Start the API Server
 */
const startServer = () => {
    app_1.default.listen(environments_1.default.getServerPort());
    app_1.default.on("error", server_configs_1.default.onError);
    app_1.default.on("listening", server_configs_1.default.onListening);
    process.on("SIGINT", server_configs_1.default.gracefulStopServer);
    process.on("SIGTERM", server_configs_1.default.gracefulStopServer);
    process.on("uncaughtException", server_configs_1.default.uncaughtException);
    process.on("unhandledRejection", server_configs_1.default.unhandledRejection);
};
/**
 * @description Starting API Server after everythin is set up
 */
setImmediate(startServer);
exports.default = app_1.default;
//# sourceMappingURL=server.js.map