import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app ,server} from "./Socket/socket.js";
dotenv.config({});

//cors is cross org. resource sharing which allow frontend to access backend api as frontend origin port=5173 and backend is running on 8000
app.use(cors({
  origin: 'https://instax-frontend.onrender.com',
  credentials: true
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));
//cookie-parser is a middleware in Express that helps your backend read cookies sent by the client (browser).
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.status(200).json({
    message: "I am Anvit",
    success: true
  });
});
//app.use()->	For using middleware or route groups (files)
app.use("/api/v1/user",userRoute);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/message",messageRoute);


const PORT = process.env.PORT||5000;
server.listen(PORT, () => {
    connectDB();
  console.log(`Server listening at ${PORT}`);
});
