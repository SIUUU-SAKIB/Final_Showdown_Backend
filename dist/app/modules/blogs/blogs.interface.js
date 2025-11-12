"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = exports.BlogsModel = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
const BlogPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    coverImageUrl: { type: String },
    category: { type: String },
    authorId: { type: String },
    publishedAt: { type: Date },
    isPublished: { type: Boolean, default: false },
}, {
    timestamps: true
});
exports.BlogsModel = (0, mongoose_1.model)('Blogs', BlogPostSchema);
const BlogTagSchema = zod_1.default.string().min(1).max(30);
exports.blogValidation = zod_1.default.object({
    title: zod_1.default.string({ message: "Blog title is required" })
        .min(2, { message: "Minimum 2 characters required" })
        .max(80, { message: "Title cannot exceed 30 characters" }),
    content: zod_1.default.string({ message: "Content is required" }),
    authorId: zod_1.default.string({ message: "Author ID is required" }).optional(),
    tags: zod_1.default.array(BlogTagSchema).optional(),
    coverImageUrl: zod_1.default.string().optional(),
    category: zod_1.default.string().optional(),
    publishedAt: zod_1.default.union([zod_1.default.string(), zod_1.default.date()]).optional(),
    isPublished: zod_1.default.boolean().optional()
});
