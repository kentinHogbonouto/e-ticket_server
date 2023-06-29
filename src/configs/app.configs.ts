import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { expressjwt } from "express-jwt";
import createHttpError from "http-errors";
import path, { join } from "path";
import mongoose from "mongoose";
import fs from "fs";

import swaggerConfigs from "./swagger.configs";
import expressJwtConfigs from "./express-jwt.configs";
import {
  ResponseError,
  FieldValidationError,
} from "../interfaces/error.interface";
import allRoutes from "../routes/index.routes";
import ApiResponses from "../helpers/api-responses.helper";

export default class ApplicationConfigs {
  static init(app: Application): void {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "..", "public")));
    /**
     * @description Picture path
     */
    const uploadDir = path.join(__dirname, "..", "..", "upload");
    app.use("/upload", express.static(uploadDir));

    app.use(
      cors({
        origin: "*",
      })
    );
    app.use(helmet());
    app.enable("trust proxy");
    app.use(compression());

    /**
     * @description Register the swagger documentation endpoint
     */
    app.use(
      "/docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerJsDoc(swaggerConfigs))
    );

    /**
     * @description Set mongoose in strict mode
     */
    mongoose.set("strictQuery", false);

    /**
     * @description Add JWT protection to all routes
     */
    app.use(
      expressjwt(expressJwtConfigs).unless({
        path: [/^\/api\/v1\/auth\/*/],
      })
    );
  }

  static fileDirectoryInitializer() {
    /**
     * @description Create upload direcotry
     */
    const parentFolderName = "upload";
    const folderName = "images";

    const parentPath = `./${parentFolderName}`;
    const path = `${parentPath}/${folderName}`;

    if (!fs.existsSync(parentPath)) {
      fs.mkdirSync(parentPath);
    }

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

  static initRoutes(app: Application): void {
    /**
     * @description Register the API routes
     */
    app.use("/api", allRoutes());
  }

  static handleErrors(app: Application): void {
    /**
     * @description Handle Route Not Found errors
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
      next(new createHttpError.NotFound("API not found"));
    });

    /**
     * @description Handle General errors
     */
    app.use(
      (
        error: ResponseError,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        const status: number = error.status || 500;
        let message: string = error.message;
        let data: any = error.data;
        let errors: any[] = [];

        if (status === 422) {
          data.forEach((error: any) => {
            const index = errors.findIndex(
              (elmt) => elmt.field === error.param
            );
            if (index === -1) {
              const errorData: FieldValidationError = {
                field: error.param,
              };
              if (typeof error.msg == "string") {
                errorData.message = error.msg;
              } else {
                errorData.message = error.msg.message;
              }
              errors.push(errorData);
            }
          });
          data = errors;
        }
        res.status(status).json(ApiResponses.error(message, data));
      }
    );
  }
}
