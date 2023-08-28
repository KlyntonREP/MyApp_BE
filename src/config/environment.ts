import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });


export default {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    BASE_URL: process.env.BASE_URL,
    AUTH_EMAIL: process.env.AUTH_EMAIL,
    AUTH_PASS: process.env.AUTH_PASS,
}