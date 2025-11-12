import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import { blogController } from "./blogs.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { blogValidation } from "./blogs.interface";

const router = Router()
router.post('/create-blog',validateRequest(blogValidation), blogController.createBlog )

router.patch("/update-blog/:id",blogController.updateBlog )
router.get('/all-blogs', blogController.getAllBlogs)

router.get("/blog/:id", blogController.getBlogById)

router.delete("/delete-blog/:id", blogController.deleteBlogById)

export const blogsRoute = router