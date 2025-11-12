"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true, // ✅ adds createdAt & updatedAt
});
// ✅ Prevent model overwrite in dev hot-reloads
const ProjectModel = (0, mongoose_1.model)("projects", ProjectSchema);
exports.default = ProjectModel;
