import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        messageLine: {
            type: String,
            required: true,
            trim: true
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        chatRoomId: {
            type: Schema.Types.ObjectId,
            ref: "ChatRoom"
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

messageSchema.index({senderId: 1, charRoomId: 1});

export const Message = mongoose.model("Message", messageSchema);