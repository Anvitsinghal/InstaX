import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
dotenv.config({});
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.status(200).json({
    message: "I am Anvit",
    success: true
  });
});
app.use("/api/v1/user",userRoute);

const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
    connectDB();
  console.log(`Server listening at ${PORT}`);
});
