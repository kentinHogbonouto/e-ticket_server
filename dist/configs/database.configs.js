"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const environments_1 = __importDefault(require("./environments"));
mongoose_1.default.Promise = bluebird_1.default;
class DatabaseConfigs {
    static init() {
        /**
         * @descritpion Initiate the connection to the database
         */
        const db = mongoose_1.default.connect(environments_1.default.getDatabaseURL(), (error) => {
            if (error) {
                console.error(`Mongoose default connection error: ${error}`);
            }
        });
        /**
         * @descritpion If the connection is successfully established
         */
        mongoose_1.default.connection.on("connected", () => {
            console.info("Successfully connected to MongoDB database");
        });
        /**
         * @descritpion When the connection throws an error
         */
        mongoose_1.default.connection.on("error", (err) => {
            console.error(`Mongoose default connection error: ${err}`);
        });
        /**
         * @descritpion When the connection is disconnected
         */
        mongoose_1.default.connection.on("disconnected", () => {
            console.error("Mongoose default connection disconnected");
        });
        /**
         * @descritpion When the Node process ends, close the Mongoose connection
         */
        process.on("SIGINT", () => {
            mongoose_1.default.connection.close(() => {
                console.info("Mongoose default connection disconnected through app termination");
                process.exit(0);
            });
        });
    }
}
exports.default = DatabaseConfigs;
//# sourceMappingURL=database.configs.js.map