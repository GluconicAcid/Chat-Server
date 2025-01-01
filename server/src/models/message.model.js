import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
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

messageSchema.index({senderId: 1, receiverId: 1});

export const Message = mongoose.model("Message", messageSchema);