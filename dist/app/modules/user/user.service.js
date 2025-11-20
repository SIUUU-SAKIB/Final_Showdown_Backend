"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uesrservice = void 0;
const JWT_1 = require("../../utils/JWT");
const user_interface_1 = require("./user.interface");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user_interface_1.UserModel);
    const { password, email, name, role } = payload;
    const isUserExist = yield user_interface_1.UserModel.findOne({ email: payload.email });
    if (isUserExist) {
        throw Error("User already exist");
    }
    const hashedPass = yield bcryptjs_1.default.hash(password, 10);
    const user = yield user_interface_1.UserModel.create({
        email,
        password: hashedPass,
        name,
        role
    });
    return user;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    console.log(email, password);
    const isUserExist = yield user_interface_1.UserModel.findOne({ email });
    if (!isUserExist) {
        throw Error("Email does not exist");
    }
    const passwordMatched = yield bcryptjs_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!passwordMatched) {
        throw Error("Wrong password");
    }
    const JwtPayload = {
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role
    };
    const accessToken = (0, JWT_1.generateToken)(JwtPayload, "1d");
    const refreshToken = (0, JWT_1.generateToken)(JwtPayload, "7d");
    const _a = isUserExist.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: rest
    };
});
exports.uesrservice = { createUser, login };
