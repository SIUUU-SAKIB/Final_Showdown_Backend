"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/create-user", (0, validateRequest_1.validateRequest)(user_validation_1.createUserZodSchema), user_controller_1.userController.createUser);
router.get('/user', user_controller_1.userController.getCurrentUser);
router.post("/logout", user_controller_1.userController.logoutUser);
router.post("/login", user_controller_1.userController.login);
exports.userRoutes = router;
// 59HEVTFK 
