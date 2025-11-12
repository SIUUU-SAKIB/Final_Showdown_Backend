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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const setCookie_1 = require("../../utils/setCookie");
const JWT_1 = require("../../utils/JWT");
const user_interface_1 = require("./user.interface");
const env_config_1 = require("../../config/env.config");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paylaod = yield req.body;
    const user = yield user_service_1.uesrservice.createUser(paylaod);
    res.status(200).json({
        status: true,
        message: "User created successfully",
        data: user
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.uesrservice.login(req.body);
    (0, setCookie_1.setAuthCookie)(res, user);
    res.status(200).json({
        status: true,
        message: "🎉🎉🎉 Login Successfull",
        user
    });
});
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }
        const decoded = (0, JWT_1.verifyToken)(token);
        const user = yield user_interface_1.UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    }
    catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        });
    }
});
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: env_config_1.envVariable.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.status(200).json({
            message: "User Logged out successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while logging out" });
    }
});
exports.userController = { createUser, login, getCurrentUser, logoutUser };
