import express from "express";
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectMongoDb from "./db/mongoDbConnect.js"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
<<<<<<< HEAD
app.use(cookieParser());
=======
>>>>>>> 167bea1a4056ec291ccdf95e8f168ccf0de8819c
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes)

app.listen("1000", () => {
    console.log("Server is running on port 1000");
    connectMongoDb();
})