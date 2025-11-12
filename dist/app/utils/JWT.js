"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const generateToken = (payload, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, env_config_1.envVariable.JWT_SECRET, { expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_config_1.envVariable.JWT_SECRET);
    }
    catch (error) {
        console.log(`JWT verification failed ${error.message}`);
        return null;
    }
};
exports.verifyToken = verifyToken;
