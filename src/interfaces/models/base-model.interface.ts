export interface BaseModel {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
  resetPasswordRequestId?: string;
}
