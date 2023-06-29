import createHttpError from "http-errors";

import AdminRepository from "../repositories/admin.repository";

import PasswordHelpers from "../../../../helpers/password.helper";

import { Admin } from "../interfaces/admin.model";
import {
  ICreateAdminDto,
  IFindAllAdminsDto,
  IUpdateAdminDto,
  IResetAdminPasswordDto,
  IUpdateAdminPasswordDto,
  IUpdateAdminRoleDto,
} from "../interfaces/dto/services/admin.dto";
import {
  CreateAdminDto,
  UpdateAdminDto,
} from "../interfaces/dto/repositories/admin.dto";

import { ValidationMessages } from "../../../../validations/validation";
import { AdminValidationMessages } from "../validations/admin.validation";

export default class AdminService {
  constructor(
    private adminRepository: AdminRepository,
  ) {}

  /**
   * @function findByResetToken
   * @description Get admin by his reset password token.
   * @param token
   * @return Promise<Admin | null>
   */
  public async findByResetToken(token: string): Promise<Admin | null> {
    let admin = await this.adminRepository.findByResetToken(token);
    if (!admin) {
      throw new createHttpError.NotFound(AdminValidationMessages.NOT_FOUND);
    }
    if (
      admin.resetTokenExpiration &&
      new Date(admin.resetTokenExpiration).getTime() <= Date.now()
    ) {
      throw new createHttpError.Forbidden(ValidationMessages.TOKEN_EXPIRED);
    }

    admin = await this.adminRepository.findByEmail(admin.email);

    return admin;
  }

  /**
   * @function findAll
   * @description Get the list of all admins
   * @param iFindAllAdminsDto An object of type IFindAllAdminsDto containing the query filters
   * @return Promise<{ admins: Admin[]; totalElements: number }>
   */
  public async findAll(
    iFindAllAdminsDto: IFindAllAdminsDto
  ): Promise<{ admins: Admin[]; totalElements: number }> {
    let admins: Admin[] = [];

    let totalElements = await this.adminRepository.countAll();

    if (iFindAllAdminsDto.size === -1) {
      admins = await this.adminRepository.findAll({
        sort: iFindAllAdminsDto.sort,
      });
    } else {
      admins = await this.adminRepository.findAll({
        size: iFindAllAdminsDto.size,
        sort: iFindAllAdminsDto.sort,
        page: iFindAllAdminsDto.page,
      });
    }

    return { admins, totalElements };
  }

  /**
   * @function findOne
   * @description GET admin by id
   * @param id The id of the admin
   * @return Promise<Admin>
   */
  public async findOne(id: string): Promise<Admin> {
    return await this.findById(id);
  }

  /**
   * @function findByEmail
   * @description Get admin by email
   * @param email The email of the admin
   * @return Promise<Admin | null>
   */
  public async findByEmail(email: string): Promise<Admin | null> {
    return await this.adminRepository.findByEmail(email);
  }

  /**
   * @function findByResetPasswordRequestId
   * @description Get admin by reset password request id
   * @param requestId The request id
   * @return Promise<Admin | null>
   */
  public async findByResetPasswordRequestId(
    requestId: string
  ): Promise<Admin | null> {
    return await this.adminRepository.findByResetPasswordRequestId(requestId);
  }

  /**
   * @function create
   * @description Create an admin
   * @param iCreateAdminDto An object of type ICreateAdminDto containing the admin account informations
   * @return Promise<Admin>
   */
  public async create(iCreateAdminDto: ICreateAdminDto): Promise<Admin> {

    const existingAdminWithEmail = await this.adminRepository.findByEmail(
      iCreateAdminDto.email
    );
    if (existingAdminWithEmail) {
      throw new createHttpError.Forbidden(
        ValidationMessages.EMAIL_ALREADY_IN_USE
      );
    }

    const createAdminDto: CreateAdminDto = {
      email: iCreateAdminDto.email,
      password: iCreateAdminDto.password,
      role: iCreateAdminDto.roleId,
    };
    let admin = await this.adminRepository.create(createAdminDto);

    return this.findById(admin.id);
  }

  /**
   * @function update
   * @description Update an admin
   * @param iUpdateAdminDto An object of type IUpdateAdminDto containing the admin account informations
   * @return Promise<Admin>
   */
  public async update(iUpdateAdminDto: IUpdateAdminDto): Promise<Admin> {
    let admin: any = await this.findById(iUpdateAdminDto.id);

    const updateAdminDto: UpdateAdminDto = {
      id: iUpdateAdminDto.id,
    };

    if (iUpdateAdminDto.email) {
      const existingAdminWithEmail = await this.adminRepository.findByEmail(
        iUpdateAdminDto.email
      );
      if (existingAdminWithEmail) {
        throw new createHttpError.Forbidden(
          ValidationMessages.EMAIL_ALREADY_IN_USE
        );
      }
      updateAdminDto.email = iUpdateAdminDto.email;
    }

    admin = await this.adminRepository.update(updateAdminDto);
    return admin;
  }


  /**
   * @function updatePassword
   * @description Update an admin password
   * @param iUpdateAdminPasswordDto An object of type IUpdateTeacherPasswordDto containing the admin password
   * @return Promise<void>
   */
  public async updatePassword(
    iUpdateAdminPasswordDto: IUpdateAdminPasswordDto
  ): Promise<void> {
    let admin: any = await this.findOne(iUpdateAdminPasswordDto.id);

    if (!iUpdateAdminPasswordDto.password) {
      throw new createHttpError.Forbidden(
        ValidationMessages.PASSWORD_MUST_BE_PROVIDED
      );
    }

    const isEqual = await PasswordHelpers.comparePasswords(
      iUpdateAdminPasswordDto.oldPassword,
      admin.password
    );
    if (!isEqual) {
      throw new createHttpError.Forbidden(
        ValidationMessages.INCORRECT_OLD_PASSWORD
      );
    }

    const updateAdminDto: UpdateAdminDto = {
      id: iUpdateAdminPasswordDto.id,
      password: iUpdateAdminPasswordDto.password,
    };
    await this.adminRepository.update(updateAdminDto);

    return;
  }

  /**
   * TODO
   * @function resetPassword
   * @description
   * @param iResetAdminPasswordDto
   * @return void
   */
  public async resetPassword(
    iResetAdminPasswordDto: IResetAdminPasswordDto
  ): Promise<void> {
    const updateAdminDto: UpdateAdminDto = {
      id: iResetAdminPasswordDto.id,
      password: iResetAdminPasswordDto.password,
      resetPasswordRequestId: iResetAdminPasswordDto.resetPasswordRequestId,
    };
    await this.adminRepository.update(updateAdminDto);

    return;
  }

  /**
   * TODO
   * @function generateResetPasswordToken
   * @description
   * @param id
   * @return Promise<Admin | null>
   */
  public async generateResetPasswordToken(id: string): Promise<Admin | null> {
    return await this.adminRepository.generateResetPasswordToken(id);
  }

  /**
   * TODO
   * @function findById
   * @description
   * @param id
   * @return
   */
  private async findById(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new createHttpError.NotFound(AdminValidationMessages.NOT_FOUND);
    }
    return admin;
  }
}
