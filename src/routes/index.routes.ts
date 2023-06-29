import { Router } from "express";

import AuthRoutes from "../api/v1/auth/routes/auth.routes";
import AdminsManagementRoutes from "../api/v1/admins/routes/admin-management.routes";

import AuthController from "../api/v1/auth/controllers/auth.controller";
import AdminManagementController from "../api/v1/admins/controllers/admin-management.controller";

import AuthService from "../api/v1/auth/services/auth.service";
import AdminsRoutes from "../api/v1/admins/routes/admin.routes";
import AdminController from "../api/v1/admins/controllers/admin.controller";
import AdminService from "../api/v1/admins/services/admin.service";
import AdminRepository from "../api/v1/admins/repositories/admin.repository";

/**
 * @description Router configuration
 * @exports router
 * @default
 */
export default function AllRoutes() {
  const router: Router = Router();

  router.use(
    "/v1/auth",
    AuthRoutes(
      new AuthController(
        new AuthService(
          new AdminService(
            new AdminRepository(),
          )
        )
      )
    )
  );

  router.use(
    "/v1/managements/admins",
    AdminsManagementRoutes(
      new AdminManagementController(
        new AdminService(
          new AdminRepository(),
        )
      )
    )
  );

  router.use(
    "/v1/admins",
    AdminsRoutes(
      new AdminController(
        new AdminService(
          new AdminRepository(),
        )
      )
    )
  );

  return router;
}

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
