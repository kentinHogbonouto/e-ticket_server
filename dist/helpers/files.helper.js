"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environments_1 = __importDefault(require("../configs/environments"));
class FilesHelpers {
    /**
     * @function getFileType
     * @description Get file type.
     * @return string
     */
    static getFileType(mimetype) {
        if (mimetype.split("/")[0] !== "application") {
            return mimetype.split("/")[0];
        }
        else if (mimetype.split("/")[0] === "application") {
            if (mimetype.split("/")[1] == "octet-stream") {
                return "image";
            }
            return mimetype.split("/")[1];
        }
        return "other";
    }
    /**
     * @function getUploadedFileType
     * @description Get uplaoded file type.
     * @return string | undefined
     */
    static getUploadedFileType(mimetype) {
        return environments_1.default.getAuthorizedFileTypes().find((type) => type.toLowerCase() === this.getFileType(mimetype).toLowerCase());
    }
    /**
     * @function uploadFile
     * @description Uplaoded file.
     * @return string | undefined
     */
    static uploadFile(mimetype) {
        return environments_1.default.getAuthorizedFileTypes().find((type) => type.toLowerCase() === this.getFileType(mimetype).toLowerCase());
    }
}
exports.default = FilesHelpers;
//# sourceMappingURL=files.helper.js.map