import { ChatRoom } from "../models/chatRoom.model.js";
import { User } from "../models/user.model.js";

const createChatRoom = async (req, res) => {
    try {
        const { chatRoomName, isPrivate, participants } = req.body
        const owner = req.user

        if(!chatRoomName)
        {
            return res.status(400).json({
                status: 400,
                message: "Chat room name is required"
            })
        }

        if(!owner)
        {
            return res.status(400).json({
                status: 400,
                message: "Owner is required"
            })
        }

        const participantsInChatRoom = []

        for(let i = 0; i < participants.length; i++)
        {
            const isParticipantPresent = await User.findOne({username: participants[i]}).select("-password -refreshToken");

            if(!isParticipantPresent)
            {
                return res.status(404).json({
                    status: 404,
                    message: "User does not exists",
                    participant: {
                        username: participants[i]
                    }
                })
            }

            participantsInChatRoom.push(isParticipantPresent._id);
        }
        
        const chatRoom = await ChatRoom.create(
            {
                chatRoomName: chatRoomName,
                isPrivate: isPrivate,
                owner: owner,
                participants: participantsInChatRoom
            }
        )

        if(!chatRoom)
        {
            return res.status(500).json({
                status: 500,
                message: "An unexpected error occured while creating room"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Room creation successful",
            chatRoom: {
                chatRoomName: chatRoomName,
                isPrivate: isPrivate,
                owner: owner.username,
                participants: participants
            }
        })

    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const addParticipants = async (req, res) => {
    try {
        const {participants} = req.body
        const {chatRoomId} = req.params
        

        if(!participants)
        {
            return res.status(400).json({
                status: 400,
                message: "No participants to add"
            })
        }

        if(!chatRoomId)
        {
            return res.status(400).json({
                status: 400,
                message: "Chat room Id is required"
            })
        }


        const participantsId = []
        for(let i = 0; i < participants.length; i++)
        {
            const isParticipantPresent = await User.findOne({username: participants[i]}).select("-password -refreshToken")
            const participantInChatRoom = await ChatRoom.findOne(
                {participants: { $elemMatch: { $eq: isParticipantPresent._id }}}
            )

            if(participantInChatRoom)
            {
                return res.status(400).json({
                    status: 400,
                    message: "User already in chat room",
                    user: {
                        username: participants[i]
                    }
                })
            }

            if(!isParticipantPresent)
            {
                return res.status(404).json({
                    status: 404,
                    message: "User does not exists",
                    user: {
                        username: participants[i]
                    }
                })
            }
            
            participantsId.push(isParticipantPresent._id);
        }

        const chatRoom = await ChatRoom.findByIdAndUpdate(
            chatRoomId,
            {
                $addToSet: {participants: participantsId}
            }
        )

        if(!chatRoom)
        {
            return res.status(404).json({
                status: 404,
                message: "Chat Room does not exists"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Participants added to the chat room"
        })


        
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const removeParticipants = async (req, res) => {
    try {
        const {chatRoomId, participantId} = req.params

        if(!chatRoomId)
        {
            return res.status(400).json({
                status: 400,
                message: "Chat room Id is required"
            })
        }

        if(!participantId)
        {
            return res.status(400).json({
                status: 400,
                message: "No participant to remove from the chat room"
            })
        }

        const chatRoom = await ChatRoom.findByIdAndUpdate(
            chatRoomId,
            {
                $pull: {participants: participantId}
            },
            {
                new: true
            }
        )

        if(!chatRoom)
        {
            return res.status(404).json({
                status: 404,
                message: "Chat room does not exists"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Participant removed"
        })

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const getParticipants = async (req, res) => {
    try {
        const {chatRoomId} = req.params;

        if(!chatRoomId)
        {
            return res.status(400).json({
                status: 400,
                message: "Chat room Id is required"
            })
        }

        const chatRoom = await ChatRoom.findById(chatRoomId).populate('participants', "-password -refreshToken");

        if(!chatRoom)
        {
            return res.status(404).json({
                status: 404,
                message: "Chat room does not exist"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "Participants successfully fetched",
            participants: chatRoom.participants
        })

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

export {
    createChatRoom,
    addParticipants,
    removeParticipants,
    getParticipants
}