"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSchema = void 0;
const zod_1 = require("zod");
exports.blogSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string().min(3, "Title must be at least 3 characters long"),
    authorId: zod_1.z.string().min(1, "Author ID is required"),
    authorName: zod_1.z.string().optional(),
    content: zod_1.z.string().min(10, "Content must be at least 10 characters long"),
    tags: zod_1.z.array(zod_1.z.string()).optional().default([]),
    category: zod_1.z.string().optional().default("General"),
    coverImageUrl: zod_1.z.string().url("Invalid image URL").optional(),
    published: zod_1.z.boolean().optional().default(false),
    views: zod_1.z.number().optional().default(0),
    likes: zod_1.z.number().optional().default(0),
    commentsCount: zod_1.z.number().optional().default(0),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
