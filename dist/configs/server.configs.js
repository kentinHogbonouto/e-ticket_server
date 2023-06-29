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
const environments_1 = __importDefault(require("./environments"));
class ServerConfigs {
    static onListening() {
        console.log(environments_1.default.serverStartedMessage());
    }
    static gracefulStopServer() {
        setTimeout(() => {
            console.info("Shutting down server");
            process.exit(0);
        }, 10000);
    }
    static onError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error.syscall !== "listen")
                throw error;
            let bind = typeof environments_1.default.getServerPort() === "string"
                ? `Pipe ${environments_1.default.getServerPort()}`
                : `Port ${environments_1.default.getServerPort()}`;
            switch (error.code) {
                case "EACCES":
                    console.error(`${bind} requires elevated privileges`);
                    process.exit(1);
                case "EADDRINUSE":
                    console.error(`${bind} is already in use`);
                    process.exit(1);
                default:
                    throw error;
            }
        });
    }
    static unhandledRejection(reason, promise) {
        console.error({
            promise,
            reason,
        }, "unhandledRejection");
        process.exit(1);
    }
    static uncaughtException(err) {
        console.error(err, "Uncaught exception");
        process.exit(1);
    }
}
exports.default = ServerConfigs;
//# sourceMappingURL=server.configs.js.map