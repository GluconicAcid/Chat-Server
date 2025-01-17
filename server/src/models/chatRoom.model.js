import mongoose from "mongoose";
import { Schema } from "mongoose";

const chatRoomSchema = new Schema(
    {
        chatRoomName: {
            type: String,
            required: true,
            trim: true,
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isPrivate: {
            type: Boolean,
            default: false
        },
        messages: [{
            type: String,
            ref: "Message"
        }]
    },
    {
        timestamps: true
    }
);

chatRoomSchema.index({participants: 1})

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);