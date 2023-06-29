import { Role } from "../../../../roles/interfaces/role.model";

export interface CreateAdminDto {
  email: string;
  password: string;
  role: string;
}
export interface UpdateAdminDto {
  id: string;
  email?: string;
  password?: string;
  resetPasswordRequestId?: string | undefined | null;
  role?: Role;
}
