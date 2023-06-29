import AdminModel from "../admins/models/admin.model";

import PasswordHelpers from "../../../helpers/password.helper";

export default async function seedSuperAdmins() {
  try {
    const hasPassword = await PasswordHelpers.hashPassword(
      process.env.E_TICKET_SUPER_ADMIN_DEFAULT_PASSWORD
    );

    const superAdmins = [
      {
        email: process.env.E_TICKET_SUPER_ADMIN_DEFAULT_EMAIL,
        password: hasPassword,
      },
    ];
    const existingSuperAdmins = await AdminModel.find();
    if (!existingSuperAdmins.length) {
      for (const superAdmin of superAdmins) {
        const newSuperAdmin = new AdminModel(superAdmin);
        await newSuperAdmin.save();
      }
    }
  } catch (error) {
    console.error(error);
  }
}
