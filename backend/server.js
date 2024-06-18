import express from "express";
import authRoutes from "./routes/auth.routes.js"
import connectMongoDB from "./db/connectMongoDB.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //to parse req.body

app.use("/api/auth", authRoutes);

app.listen(PORT, () =>{
    console.log(`Server is now running in port ${PORT}`);
    connectMongoDB();
})
