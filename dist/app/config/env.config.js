"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariable = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = __importDefault(require("zod"));
(0, dotenv_1.config)();
const envSchema = zod_1.default.object({
    PORT: zod_1.default.string().default('2000'),
    DATABASE_URL: zod_1.default.string({ message: "DATABASE_URL must be a valid URL" }),
    NODE_ENV: zod_1.default.enum(["development", "production"]),
    //   BCRYPTJS_SALT_ROUND: z.coerce.number(),
    JWT_SECRET: zod_1.default.string({ message: "JWT_SECRET_TOKEN is required" }),
    JWT_EXPIRES_IN: zod_1.default.string({
        message: "Jwt token expires"
    }),
    ADMIN_EMAIL: zod_1.default.string({ message: 'Valid email required' }),
    ADMIN_PASS: zod_1.default.string({ message: 'password required' })
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌ Environment variable validation error:");
    console.error(parsed.error.format());
    process.exit(1);
}
exports.envVariable = parsed.data;
