import dotenv from "dotenv";
import { Server, createServer } from "http";
import express, { Application } from "express";
import seedSuperAdmins from "./api/v1/seeds/admin-accounts.seeder";
import ApplicationConfigs from "./configs/app.configs";

dotenv.config();

const app: Application = express();

/**
 * @description Create application server
 * @param app
 */
const server: Server = createServer(app);

/**
 * @description Configure Application
 */
ApplicationConfigs.init(app);

/**
 * @description Configure Routes
 */
ApplicationConfigs.initRoutes(app);

/**
 * @description Handles errors
 */
ApplicationConfigs.handleErrors(app);

/**
 * @description Initialize upload directory
 */
ApplicationConfigs.fileDirectoryInitializer();

/**
 * @description Create admin account
 */
seedSuperAdmins()

export default server;
