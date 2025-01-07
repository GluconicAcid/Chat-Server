import { Router } from "express";
import { 
    createChatRoom,
    addParticipants,
    removeParticipants
} from "../controller/chatRoom.controller.js";
import { verifyJWT } from "../middleware/verifyjwt.middleware.js";

const chatRoomRouter = new Router();

chatRoomRouter.post('/create-room', verifyJWT, createChatRoom);
chatRoomRouter.post('/:chatRoomId/add-participants', verifyJWT, addParticipants);
chatRoomRouter.delete('/:chatRoomId/participants/:participantId', verifyJWT, removeParticipants);

export default chatRoomRouter