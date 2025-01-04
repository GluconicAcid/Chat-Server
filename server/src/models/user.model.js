import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema);