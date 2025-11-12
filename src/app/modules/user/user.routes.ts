import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { userController } from "./user.controller";
import { authenticate } from "../../middleware/auth";

const router = Router()
router.post("/create-user", validateRequest(createUserZodSchema), userController.createUser )
router.get('/user', userController.getCurrentUser)
router.post("/logout", userController.logoutUser)
router.post("/login", userController.login)
export const userRoutes = router


// 59HEVTFK 