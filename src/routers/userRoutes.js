import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import User from '../models/user.js';
import auth from '../middleware/auth.js';

const router = new express.Router()

router.route("/")
    .post(async (req, res) => {
        const user = new User(req.body)

        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({user, token})
        } catch (e) {
            res.status(400).send(e)
        }
    })

router.route("/:id/avatar")
    .get(async (req, res) => {
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
    })

const upload = multer({
    limits: {
        fileSize: 1_000_000, // 1MB
    },
    fileFilter(req, file, cb) { // File Type Filter
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image."))
        }
        cb(undefined, true)
    }
})

router.route("/me/avatar")
    .post(auth, upload.single("avatar"), async (req, res) => {
        // Modified Image
        const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
        req.user.avatar = buffer
        await req.user.save()
        res.send()
    }, (error, req, res, next) => {
        res.status(400).send({error: error.message})
    })

    .delete(auth, async (req, res) => {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    })


router.route("/me")
    .get(auth, async (req, res) => {
        try {
            res.send(req.user)
        } catch (error) {
            res.status(500).send(error)
        }
    })
    
    .patch(auth, async (req, res) => {
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
    })

    .delete(auth, async (req, res) => {
        try {
            await req.user.remove()
            res.send(req.user)
        } catch (error) {
            res.status(400).send(error)
        }
    })

router.route("/login")
    .post(async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({user, token})
        } catch (error) {
            res.status(400).send()
        }
    })

router.route("/logout")
    .post(auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token)
            await req.user.save()
            res.send({success: "User Logged Out Successfully."})
        } catch (error) {
            res.status(500).send()
        }
    })

router.route("/logoutAll")
    .post(auth, async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send({success: "User Logged Out of All Sessions Successfully."})
        } catch (error) {
            res.status(500).send()
        }
    })


export default router