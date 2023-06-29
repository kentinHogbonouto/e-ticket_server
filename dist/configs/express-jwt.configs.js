"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const environments_1 = __importDefault(require("./environments"));
const options = {
    secret: jwks_rsa_1.default.expressJwtSecret({
        jwksUri: `${environments_1.default.getServerURL()}/.well-knows/public-jwk.json`,
        cache: true,
        rateLimit: true,
    }),
    algorithms: [environments_1.default.getJwtTokenAlgorithm()],
};
exports.default = options;
//# sourceMappingURL=express-jwt.configs.js.map