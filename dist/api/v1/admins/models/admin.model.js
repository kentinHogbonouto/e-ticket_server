"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    resetToken: {
        type: String,
        select: false,
    },
    resetTokenExpiration: {
        type: Date,
        select: false,
    },
    resetPasswordRequestId: {
        type: String,
        select: false,
    },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role",
        select: false,
        required: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        },
    },
});
exports.default = (0, mongoose_1.model)("Admin", AdminSchema);
//# sourceMappingURL=admin.model.js.map