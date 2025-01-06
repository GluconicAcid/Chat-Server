import { Router } from "express";
import { 
    createChatRoom,
    addParticipants
} from "../controller/chatRoom.controller.js";
import { verifyJWT } from "../middleware/verifyjwt.middleware.js";

const chatRoomRouter = new Router();

chatRoomRouter.post('/create-room', verifyJWT, createChatRoom);
chatRoomRouter.post('/:chatRoomId/add-participants', verifyJWT, addParticipants);

export default chatRoomRouter