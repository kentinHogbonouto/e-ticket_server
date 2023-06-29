"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_1 = require("../../../../validations/validation");
const environments_1 = __importDefault(require("../../../../configs/environments"));
function AdminsRoutes(adminController) {
    const router = (0, express_1.Router)();
    /**
     * @swaggers
     * tags:
     *   name: Admins
     */
    /**
     * @swagger
     * /api/v1/admins/get-by-reset-password-token/{token}:
     *   get:
     *     summary: Récupérer un administrateur par son token de réinitialisation de mot de passe
     *     tags: [Admins]
     *     parameters:
     *       - in: path
     *         name: token
     *         schema:
     *           type: string
     *         required: true
     *     responses:
     *       200:
     *         description: Admin successfully found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  data:
     *                    type: object
     *                    properties:
     *                      admin:
     *                        $ref: '#/components/schemas/Admin'
     *                  success:
     *                    type: boolean
     *                    example: true
     *                  message:
     *                    type: string
     *                    example: Admin successfully found.
     *       403:
     *         description: Token expired.
     *       404:
     *         description: Admin not found.
     *       500:
     *         description: Erreur server
     */
    router.post("/get-by-reset-password-token/:token", (req, res, next) => adminController.findByResetToken(req, res, next));
    /**
     * @swagger
     * /api/v1/admins/current:
     *   get:
     *     security:
     *       - bearerAuth: []
     *     summary: Récupérer les données du compte de l'administrateur connecté
     *     tags: [Admins]
     *     responses:
     *       200:
     *         description: Connected admin found.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  data:
     *                    type: object
     *                    properties:
     *                      admin:
     *                        $ref: '#/components/schemas/Admin'
     *                  success:
     *                    type: boolean
     *                    example: true
     *                  message:
     *                    type: string
     *                    example: Connected admin found.
     *       401:
     *         description: You have not authenticated.
     *       404:
     *         description: Admin not found.
     *       500:
     *         description: Erreur server
     */
    router.get("/current", (req, res, next) => adminController.findConnect(req, res, next));
    /**
     * @swagger
     * /api/v1/admins/current:
     *   put:
     *     security:
     *       - bearerAuth: []
     *     summary: Modifier le compte de l'administrateur connecté
     *     tags: [Admins]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: admin@cdv.com
     *               username:
     *                 type: string
     *                 example: john.doe
     *     responses:
     *       201:
     *         description: Admin successfully updated.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  data:
     *                    type: object
     *                    properties:
     *                      admin:
     *                        $ref: '#/components/schemas/Admin'
     *                  success:
     *                    type: boolean
     *                    example: true
     *                  message:
     *                    type: string
     *                    example: Admin successfully updated.
     *       401:
     *         description: You have not authenticated.
     *       403:
     *         description: Username already in use. / Email address already in use.
     *       422:
     *         description: Erreur de validation des champs.
     *       500:
     *         description: Erreur server
     */
    router.put("/current", [
        (0, express_validator_1.body)("email")
            .optional({ nullable: true })
            .not()
            .isEmpty()
            .withMessage({
            message: validation_1.ValidationMessages.FIELD_REQUIRED,
            errorCode: 0,
        })
            .isEmail()
            .withMessage({
            message: validation_1.ValidationMessages.INVALID_EMAIL_ADDRESS,
            errorCode: 8,
        })
            .normalizeEmail({ gmail_remove_dots: false }),
    ], (req, res, next) => adminController.updateConnected(req, res, next));
    /**
     * @swagger
     * /api/v1/admins/current/update-password:
     *   put:
     *     security:
     *       - bearerAuth: []
     *     summary: Changer le mot de passe de l'administrateur connecté
     *     tags: [Admins]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               oldPassword:
     *                 type: string
     *                 example: e§udzyi12sCsqdiè#eg!fuif
     *               password:
     *                 type: string
     *                 example: e§udzyi12sCsqdiè#eg!
     *               confirmPassword:
     *                 type: string
     *                 example: e§udzyi12sCsqdiè#eg!
     *     responses:
     *       201:
     *         description: Admin password successfully updated.
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
     *                    example: Admin password successfully updated.
     *       403:
     *         description: Password must be provided. / Incorrect old password.
     *       404:
     *         description: Admin not found.
     *       422:
     *         description: Erreur de validation des champs.
     *       500:
     *         description: Erreur server
     */
    router.put("/current/update-password", [
        (0, express_validator_1.body)("oldPassword")
            .trim()
            .not()
            .isEmpty()
            .withMessage({
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
    ], (req, res, next) => adminController.updateConnectedPassword(req, res, next));
    return router;
}
exports.default = AdminsRoutes;
//# sourceMappingURL=admin.routes.js.map