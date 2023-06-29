"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const environments_1 = __importDefault(require("../../../../configs/environments"));
const validation_1 = require("../../../../validations/validation");
function AuthRoutes(authController) {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * tags:
     *   name: Auth
     */
    /**
     * @swagger
     * /api/v1/auth/login:
     *   post:
     *     summary: Auhtentifier un restaurant, un serveur, un chef de rangs ou un administrateur.
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: test-institution@gmail.com
     *               password:
     *                 type: string
     *                 example: 88889999
     *     responses:
     *       200:
     *         description: Succesfully authenticated!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  data:
     *                    type: object
     *                    properties:
     *                      token:
     *                        type: string
     *                  success:
     *                    type: boolean
     *                    example: true
     *                  message:
     *                    type: string
     *                    example: Succesfully authenticated!
     *       403:
     *         description: Incorrect password / Incorrect username /incorrect email.
     *       422:
     *         description: Erreur de validation des champs.
     *       500:
     *         description: Erreur server
     */
    router.post("/login", (req, res, next) => authController.login(req, res, next));
    /**
     * @swagger
     * /api/v1/auth/reset-password:
     *   post:
     *     summary: Réinitialiser le mot de passe d'un utilisateur
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               requestId:
     *                 type: string
     *                 example: d5b1b3900b7148f2a60848a256fb9427
     *               password:
     *                 type: string
     *                 example: e§udzyi12sCsqdiè#eg!
     *               confirmPassword:
     *                 type: string
     *                 example: e§udzyi12sCsqdiè#eg!
     *     responses:
     *       200:
     *         description: Password succesfully reseted.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  success:
     *                    type: boolean
     *                    example: true
     *                  message:
     *                    type: string
     *                    example: Password succesfully reseted.
     *       403:
     *         description: This user has no reset password request in progress.
     *       422:
     *         description: Erreur de validation des champs.
     *       500:
     *         description: Erreur server
     */
    router.post("/reset-password", [
        (0, express_validator_1.body)("requestId").not().isEmpty().withMessage({
            message: validation_1.ValidationMessages.FIELD_REQUIRED,
            errorCode: 0,
        }),
        (0, express_validator_1.body)("password")
            .trim()
            .not()
            .isEmpty()
            .withMessage({
            message: validation_1.ValidationMessages.FIELD_REQUIRED,
            errorCode: 0,
        })
            .isLength({ min: environments_1.default.getPasswordMinLength() })
            .withMessage({
            message: validation_1.ValidationMessages.lengthConstraintsFailed({
                min: environments_1.default.getPasswordMinLength(),
            }),
            errorCode: 3,
        }),
        (0, express_validator_1.body)("confirmPassword")
            .trim()
            .not()
            .isEmpty()
            .withMessage({
            message: validation_1.ValidationMessages.FIELD_REQUIRED,
            errorCode: 0,
        })
            .custom((value, { req }) => validation_1.ValidationMessages.isPasswordConfirmationMatch(value, req.body.password)),
    ], (req, res, next) => authController.resetPassword(req, res, next));
    return router;
}
exports.default = AuthRoutes;
//# sourceMappingURL=auth.routes.js.map