import { Router } from "express";
import { 
    registerUser, 
    loginUser,
    logoutUser
} from "../controller/user.controller.js";

const userRouter = new Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser)

export default userRouter