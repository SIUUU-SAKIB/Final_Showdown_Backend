import { Schema, Document, model } from "mongoose"

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    role?: "admin" | "user"
}
const userSchema = new Schema<User>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    { timestamps: true }
);

export const UserModel = model<User>('User', userSchema);