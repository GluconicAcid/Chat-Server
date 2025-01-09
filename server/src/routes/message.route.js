import { Router } from "express";
import { deleteMessage, sendMessage } from "../controller/message.controller.js";
import { verifyJWT } from "../middleware/verifyjwt.middleware.js";

const messageRouter = new Router();

messageRouter.post('/:chatRoomId/send-message',verifyJWT, sendMessage);
messageRouter.delete('/:chatRoomId/:messageId', verifyJWT, deleteMessage);

export default messageRouter;