import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    try {
        const {username, password, email} = req.body;

        if(!username.trim() &&  !email.trim())
        {
            return res.status(400).json({
                status: 400,
                message: "Username and email is required"
            })
        }

        if(!password)
        {
            return res.status(400).json({
                status: 400,
                message: "Password is required"
            })
        }

        if(username.trim().length < 6)
        {
            return res.status(400).json({
                status: 400,
                message: "Username must be 6 character long"
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email.trim()))
        {
            return res.status(400).json({
                status: 400,
                message: "Email is invalid"
            })
        }

        if(password.length < 8)
        {
            return res.status(400).json({
                status: 400,
                message: "Password must be 8 character long"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        if(!hashPassword)
        {
            return res.status(500).json({
                status: 500,
                message: "An unexpected error occured. Please try again later."
            })
        }

        const user = await User.create({
            username: username.trim(),
            password: hashPassword,
            email: email.trim()
        })

        if(!user)
        {
            return res.status(500).json({
                status: 500,
                message: "Database error"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Registration successful.",
            user: {
                username: user.username.trim(),
                email: user.email.trim(),
            },
        })

    } catch (err) {
        if(err.code == 11000)
        {
            return res.status(400).json({
                status: 400,
                message: "Username or email already exists"
            })
        }
        return res.status(500).json({
            status: 500,
            message: "Internal server error.",
            err: err
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username && !email)
        {
            return res.status(400).json({
                status: 400,
                message: "username or email is required"
            })
        }

        if(!password)
        {
            return res.status(400).json({
                status: 400,
                message: "password is required"
            })
        }

        const user = await User.findOne(
            {
                $or: [{username}, {email}]
            }
        )

        if(!user)
        {
            return res.status(400).json({
                status: 400,
                message: "User does not exsits"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid)
        {
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials"
            })
        }

        const accessToken = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            process.env.SECRET_ACCESS_TOKEN,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
            }
        )

        const refreshToken = jwt.sign(
            {
                _id: user._id
            },
            process.env.SECRET_REFRESH_TOKEN,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "15d"
            }
        )

        if(!accessToken || !refreshToken)
        {
            return res.status(400).json({
                status: 400,
                message: "Failed to create access or refresh Token"
            })
        }

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        const options = {
            httpOnly: true,
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                status: 200,
                message: "User login successfull",
                user: {
                    username: user.username,
                    email: user.email
                }
            })

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const userId = req.user._id;

        await User.findByIdAndUpdate(
            userId,
            {
                $unset: {refreshToken: ""}
            }
        )

        const options =  {
            httpOnly: true
        }
        
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                status: 200,
                message: "User logged out"
            })
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const updatePassword = async(req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username && !email)
        {
            return res.status(400).json({
                status: 400,
                message: "username or email is required"
            })
        }

        if(!password || password.length < 8)
        {
            return rs.status(400).json({
                status: 400,
                message: "Password must be 8 character long"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        if(!hashPassword)
        {
            return res.status(500).json({
                status: 500,
                message: "An unexpected error has occured"
            })
        }

        const user = await User.findOneAndUpdate(
            {
                $or: [{username}, {email}],
            },
            {
                $unset: {refreshToken: ""}
            }
        )

        if(!user)
        {
            return res.status(404).json({
                status: 404,
                message: "username or email does not exists"
            })
        }

        user.password = hashPassword
        
        return res.status(200).json({
            status: 200,
            message: "Password successfully changed",
            user: {
                username: user.username,
                email: user.email
            }
        })

    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            status: 500,
            message: "internal server error"
        })
    }
}



export {
    registerUser,
    loginUser,
    logoutUser,
    updatePassword
}