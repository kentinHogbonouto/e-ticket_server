export interface Admin {
  id: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
  resetPasswordRequestId?: string;
}
