import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import trainsRouter from "./router/trainsRouter.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use('/trains', trainsRouter);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
