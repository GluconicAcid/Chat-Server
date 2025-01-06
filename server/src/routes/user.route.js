import { Router } from "express";
import { 
    registerUser, 
    loginUser,
    logoutUser,
    updatePassword,
    deleteUser
} from "../controller/user.controller.js";
import { verifyJWT } from '../middleware/verifyjwt.middleware.js'

const userRouter = new Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout',verifyJWT, logoutUser);
userRouter.put('/update-password', updatePassword);
userRouter.delete('/delete-user',verifyJWT, deleteUser);

export default userRouter