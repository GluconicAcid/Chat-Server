import { Router } from "express";
import { 
    registerUser, 
    loginUser,
    logoutUser,
    updatePassword
} from "../controller/user.controller.js";
import { verifyJWT } from '../middleware/verifyjwt.middleware.js'

const userRouter = new Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout',verifyJWT, logoutUser);
userRouter.post('/updatepassword', updatePassword)

export default userRouter