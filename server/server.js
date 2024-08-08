import express from "express";
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectMongoDb from "./db/mongoDbConnect.js"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes)

app.listen("1000", () => {
    console.log("Server is running on port 1000");
    connectMongoDb();
})