import mongoose, { model, Schema } from "mongoose";
import z from "zod";

export interface BlogPost {
    title: string;
    content: string;
    tags?: string[];
    coverImageUrl?: string;
    category?: string;
    publishedAt?: Date;
    isPublished?: boolean;
    createdAt?: Date;
    authorId?:string,
    updatedAt?: Date;
}


const BlogPostSchema: Schema<BlogPost> = new Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        tags: [{ type: String }],
        coverImageUrl: { type: String },
        category: { type: String },
        authorId:{type:String},
        publishedAt: { type: Date },
        isPublished: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);
export const BlogsModel = model<BlogPost>('Blogs', BlogPostSchema);

const BlogTagSchema = z.string().min(1).max(30);

export const blogValidation = z.object({
  title: z.string({ message: "Blog title is required" })
           .min(2, { message: "Minimum 2 characters required" })
           .max(80, { message: "Title cannot exceed 30 characters" }),
  content: z.string({ message: "Content is required" }),
  authorId: z.string({ message: "Author ID is required" }).optional(),
  tags: z.array(BlogTagSchema).optional(),
  coverImageUrl: z.string().optional(),
  category: z.string().optional(),
  publishedAt: z.union([z.string(), z.date()]).optional(), 
  isPublished: z.boolean().optional()
});
