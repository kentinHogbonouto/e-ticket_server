import createHttpError from "http-errors";

import PasswordHelpers from "../../../../helpers/password.helper";
import GeneralHelpers from "../../../../helpers/general.helper";
import AdminService from "../../admins/services/admin.service";

import { UserType } from "../../../../interfaces/token-payload.interface";

import { AuthValidationMessages } from "../validations/auth.validation";

export default class AuthService {
  constructor(
    private adminService: AdminService
  ) {}

  public async authenticate(
    identifier: string,
    password: string
  ): Promise<any> {
    let token = "";
    
    const admin = await this.adminService.findByEmail(identifier);
    if (admin) {
      if (!password) {
        throw new createHttpError.Forbidden(
          AuthValidationMessages.INCORRECT_PASSWORD
        );
      }
      const isEqual = await PasswordHelpers.comparePasswords(
        password,
        admin.password
      );
      if (!isEqual) {
        throw new createHttpError.Forbidden(
          AuthValidationMessages.INCORRECT_PASSWORD
        );
      }

      return {
        admin: admin,
        token: token = GeneralHelpers.generateInstitutionToken({
          userId: admin.id,
          userType: UserType.ADMIN,
        })
      }
    }

    if (!admin) {
      throw new createHttpError.Forbidden(
        AuthValidationMessages.INCORRECT_IDENTIFIER
      );
    }
  }
}
