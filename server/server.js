import express from "express";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import notificationRoutes from "./routes/notification.routes.js"
import dotenv from "dotenv"
import connectMongoDb from "./db/mongoDbConnect.js"
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary"
import cors from "cors"


dotenv.config();


cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
    }
)

const app = express();
app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/notification", notificationRoutes)

app.listen("1000", () => {
    console.log("Server is running on port 1000");
    connectMongoDb();
})