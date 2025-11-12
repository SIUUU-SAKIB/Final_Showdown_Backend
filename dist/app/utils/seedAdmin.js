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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const env_config_1 = require("../config/env.config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_interface_1 = require("../modules/user/user.interface");
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = env_config_1.envVariable.ADMIN_EMAIL;
    const password = env_config_1.envVariable.ADMIN_PASS;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const existingAdmin = yield user_interface_1.UserModel.findOne({ email });
    if (existingAdmin) {
        console.log("✅ Admin already exist");
    }
    else {
        yield user_interface_1.UserModel.create({
            name: "Admin",
            email,
            password: hashedPassword,
            role: "admin"
        });
        console.log("🎉🎉🎉 Admin created successfully");
    }
});
exports.seedAdmin = seedAdmin;
