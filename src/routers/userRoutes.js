const express = require('express');
const auth = require('../middleware/auth');
const upload = require("../utils/avatarPrep")
const { 
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
} = require("../controllers/userController")

const router = new express.Router()

router.route("/")
    // Create User
    .post(createUser)

router.route("/:id/avatar")
    // Get Avatar
    .get(getAvatar)

router.route("/me/avatar")
    // Upload Avatar
    .post(auth, upload.single("avatar"), uploadAvatar, (error, req, res, next) => {
        res.status(400).send({error: error.message})
    })
    // Delete Avatar
    .delete(auth, deleteAvatar)


router.route("/me")
    // Get Profile
    .get(auth, getProfile)
    // Update Profile
    .patch(auth, updateProfile)
    // Delete Profile
    .delete(auth, deleteProfile)

router.route("/login")
    // Login User
    .post(loginUser)

router.route("/logout")
    // Logout User
    .post(auth, logoutUser)

router.route("/logoutAll")
    // LogoutAll User
    .post(auth, logoutAllUser)


module.exports = router