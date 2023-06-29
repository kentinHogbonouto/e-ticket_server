import { Role } from "../../roles/interfaces/role.model";

export interface Admin {
  id: string;
  email: string;
  password: string;
  role?: Role;
  resetToken?: string;
  resetTokenExpiration?: Date;
  resetPasswordRequestId?: string;
}
