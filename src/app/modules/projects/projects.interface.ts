import { model, Schema } from "mongoose";

// types/project.ts
export interface IProject {
    _id?: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    image?: string;
    category?: string;
    createdAt?: Date;
}
interface IProjectDocument extends IProject, Document {}
const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    technologies: {
      type: [String],
      required: true,
    },
    githubUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      enum: ["frontend", "backend", "fullstack", "other"],
      default: "other",
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

// ✅ Prevent model overwrite in dev hot-reloads
const ProjectModel =  model<IProjectDocument>("projects", ProjectSchema);

export default ProjectModel;