import { Message } from "../models/message.model.js";

const sendMessage = async (req, res) => {
    try {
        const {messageLine} = req.body
        const sender = req.user
        const {chatRoomId} = req.params

        if(!messageLine)
        {
            return res.status(400).json({
                status: 400,
                message: "No message to send"
            })
        }

        if(!sender)
        {
            return res.status(400).json({
                status: 400,
                message: "User not verified"
            })
        }

        const message = await Message.create({
            messageLine: messageLine,
            senderId: sender._id,
            chatRoomId: chatRoomId,
            isRead: false
        })

        if(!message)
        {
            return res.status(500).json({
                status: 500,
                message: "An unexpected error has occured"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Message send successfully"
        })

    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const deleteMessage = async (req, res) => {
    try {
        const {messageId} = req.params;

        const message = await Message.findByIdAndDelete(messageId);

        if(!message)
        {
            return res.status(500).json({
                status: 500,
                message: "An unexpected error has occured"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Message deleted successfully"
        })

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

export{
    sendMessage,
    deleteMessage
}