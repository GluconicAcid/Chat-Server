import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

import userRouter from "./src/routes/user.route.js";

app.use('/api/v1/user', userRouter);

export {app};