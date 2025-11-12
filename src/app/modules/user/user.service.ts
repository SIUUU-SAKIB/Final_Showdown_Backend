import { envVariable } from "../../config/env.config";
import { generateToken } from "../../utils/JWT";
import { setAuthCookie } from "../../utils/setCookie";
import { User, UserModel } from "./user.interface";
import bcrypt from "bcryptjs"
const createUser = async (payload: Partial<User>) => {
    const { password, email, name, role } = payload
    const isUserExist = await UserModel.findOne({ email: payload.email })
    console.log(payload)
    if (isUserExist) {
        throw Error("User already exist")
    }
    const hashedPass = await bcrypt.hash(password as string, 10)
    const user = await UserModel.create({
        email,
        password: hashedPass,
        name,
        role
    })

    return user
}


const login = async (payload: Partial<User>) => {
    const { email, password } = payload
    const isUserExist = await UserModel.findOne({ email })
    if (!isUserExist) {
        throw Error("Email does not exist")
    }
    const passwordMatched = await bcrypt.compare(password as string, isUserExist?.password)
    if (!passwordMatched) {
        throw Error("Wrong password")
    }

    const JwtPayload = {
        userId: isUserExist?._id,
        email: isUserExist?.email,
        role: isUserExist?.role

    }
    const accessToken = generateToken(JwtPayload, "1d")
    const refreshToken = generateToken(JwtPayload, "7d")

    const { password: pass, ...rest } = isUserExist.toObject()
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: rest
    }

}
export const uesrservice = { createUser, login }