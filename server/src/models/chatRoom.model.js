import mongoose from "mongoose";
import { Schema } from "mongoose";

const chatRoomSchema = new Schema(
    {
        chatname: {
            type: String,
            required: true,
            trim: true,
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isPrivate: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

chatRoomSchema.index({participants: 1})

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);