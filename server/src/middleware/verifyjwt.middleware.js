import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(403).json({
                status: 403,
                message: "Unauthorized user"
            })
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            })
        }
        req.user = user;
        next();

    } catch (err) {
        return res.status(403).json({
            status: 403,
            message: "Invalid access token"
        })
    }
}
