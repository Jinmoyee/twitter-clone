import express from "express";
import authRoutes from "./routes/auth.routes.js"

const app = express();

app.get("/",(req,res) => {
    res.send("Hello World!");
})

app.use("/api/auth", authRoutes)

app.listen("1000", () => {
    console.log("Server is running on port 1000");
})