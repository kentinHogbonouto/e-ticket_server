import EnvironmentConfigs from "./environments";

export default {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: `${EnvironmentConfigs.getAppName()} API Server`,
      description: `<b>${EnvironmentConfigs.getAppName()} API Server Documentation</b>.`,
    },
    servers: [
      {
        //url: EnvironmentConfigs.getServerURL(),
        url: "https://e-ticket-backend-jwsc.onrender.com/"
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
