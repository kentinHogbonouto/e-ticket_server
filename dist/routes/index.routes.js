"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../api/v1/auth/routes/auth.routes"));
const admin_management_routes_1 = __importDefault(require("../api/v1/admins/routes/admin-management.routes"));
const auth_controller_1 = __importDefault(require("../api/v1/auth/controllers/auth.controller"));
const admin_management_controller_1 = __importDefault(require("../api/v1/admins/controllers/admin-management.controller"));
const auth_service_1 = __importDefault(require("../api/v1/auth/services/auth.service"));
const admin_routes_1 = __importDefault(require("../api/v1/admins/routes/admin.routes"));
const admin_controller_1 = __importDefault(require("../api/v1/admins/controllers/admin.controller"));
const admin_service_1 = __importDefault(require("../api/v1/admins/services/admin.service"));
const admin_repository_1 = __importDefault(require("../api/v1/admins/repositories/admin.repository"));
/**
 * @description Router configuration
 * @exports router
 * @default
 */
function AllRoutes() {
    const router = (0, express_1.Router)();
    router.use("/v1/auth", (0, auth_routes_1.default)(new auth_controller_1.default(new auth_service_1.default(new admin_service_1.default(new admin_repository_1.default())))));
    router.use("/v1/managements/admins", (0, admin_management_routes_1.default)(new admin_management_controller_1.default(new admin_service_1.default(new admin_repository_1.default()))));
    router.use("/v1/admins", (0, admin_routes_1.default)(new admin_controller_1.default(new admin_service_1.default(new admin_repository_1.default()))));
    return router;
}
exports.default = AllRoutes;
/**
 * @swagger
 * components:
 *   schemas:
 *     PhoneNumber:
 *       type: object
 *       required:
 *         - phone
 *         - value
 *         - isoCode
 *         - countryCode
 *       properties:
 *         phone:
 *           type: string
 *         value:
 *           type: string
 *         isoCode:
 *           type: string
 *         countryCode:
 *           type: string
 *
 *     Time:
 *       type: object
 *       required:
 *         - hour
 *         - minute
 *         - value
 *       properties:
 *         hour:
 *           type: number
 *         minute:
 *           type: number
 *         value:
 *           type: string
 *
 *     Admin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */
//# sourceMappingURL=index.routes.js.map