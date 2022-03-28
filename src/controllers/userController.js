const sharp = require('sharp');
const User = require('../models/user');

// Create User
const createUser = async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
}

// Get Avatar
const getAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set("Content-Type", "image/png")
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
}

// Upload Avatar
const uploadAvatar = async (req, res) => {
    // Modified Image
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}

// Delete Avatar
const deleteAvatar = async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}

// Get Profile
const getProfile = async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
}

// Update Profile
const updateProfile = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const validOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!validOperation) return res.status(400).send({"error": "Invalid property found in request payload."})

    try {
        // Updates and Save method required for middleware to trigger
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)          
    } catch (error) {
        res.status(400).send(error)
    }
}

// Delete Profile
const deleteProfile = async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
}

// Login User
const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send()
    }
}

// Logout User
const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token)
        await req.user.save()
        res.send({success: "User Logged Out Successfully."})
    } catch (error) {
        res.status(500).send()
    }
}

// LogoutAll User
const logoutAllUser = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({success: "User Logged Out of All Sessions Successfully."})
    } catch (error) {
        res.status(500).send()
    }
}

module.exports = {
    createUser,
    getAvatar,
    uploadAvatar,
    deleteAvatar,
    getProfile,
    updateProfile,
    deleteProfile,
    loginUser,
    logoutUser,
    logoutAllUser
};
