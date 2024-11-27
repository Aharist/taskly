import express from 'express';
import "dotenv/config";
import userRouter from "./routes/user.route.js";
import { errorHandler } from './configs/midleware.js';
import authRouter from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();//library express initialized
const PORT = process.env.PORT;

//json middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

//api
app.use("/api/v1/users", userRouter);
app.use('api/v1/auth', authRouter);


app.use("/",(req, res)=>{
    res.status(200).json({
        message: "Welcome",
    });
});


app.use("*",(req, res)=>{
    res.status(404).json({
        message: "not found",
    });
});

app.use(errorHandler);

//start the server
app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
})