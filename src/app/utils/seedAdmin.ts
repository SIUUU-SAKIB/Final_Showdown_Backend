import { envVariable } from "../config/env.config"
import bcrypt from "bcryptjs"
import { UserModel } from "../modules/user/user.interface"
export const seedAdmin = async () => {
    const email = envVariable.ADMIN_EMAIL
    const password = envVariable.ADMIN_PASS
    const hashedPassword = await bcrypt.hash(password, 10)
    const existingAdmin = await UserModel.findOne({ email })
    if (existingAdmin) {
        console.log("✅ Admin already exist")
    } else {
        await UserModel.create({
            name: "Admin",
            email,
            password: hashedPassword,
            role: "admin"
        })
        console.log("🎉🎉🎉 Admin created successfully")
    }
}
