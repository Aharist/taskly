import express from 'express';
import "dotenv/config";
import userRouter from "./routes/user.route.js";
import { errorHandler } from './configs/midleware.js';
import authRouter from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.use("/", (req, res) => {
    res.status(200).json({
        message: "Hello World!",
    });
});
app.use("*", (req, res) => {
    res.status(404).json({
        message: "not found",
    });
});
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
})