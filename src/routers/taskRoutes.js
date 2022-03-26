import express from 'express';
import Task from '../models/task.js';
import auth from '../middleware/auth.js';

const router = new express.Router()

router.route("/")
    .post(auth, async (req, res) => {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })

        try {
            await task.save()
            res.status(201).send(task)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    .get(auth, async (req, res) => {
        const match = {}
        const sort = {}
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
        const skip = req.query.skip ? (parseInt(req.query.page) * limit) - limit : 0

        
        if (req.query.completed) {
            match.completed = req.query.completed === "true"
        }
        if (req.query.sortBy) {
            const sortOn = req.query.sortBy.split(":")[0]
            const sortDirection = req.query.sortBy.split(":")[1] === "desc" ? -1 : 1
            sort[sortOn] = sortDirection
        }

        try {
            console.log(req.user);
            await req.user.populate({
                path: "tasks",
                match,
                options: {
                    limit,
                    skip,
                    sort
                }
            })
            res.status(200).send(req.user.tasks)
        } catch (error) {
            res.status(500).send()
        }
    })

    router.route("/:id")
        .get(auth, async (req, res) => {
            try {
                const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
                task ? res.send(task) : res.status(404).send()
            } catch (error) {
                res.status(500).send()   
            }
        })

        .patch(auth, async (req, res) => {
            const updates = Object.keys(req.body)
            const allowedUpdates = ["description", "completed"]
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
            
            if (!isValidOperation) return res.status(400).send({"error": "Invalid property found in request payload."})
            
            try {
                const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
                if (!task) return res.status(404).send()

                updates.forEach((update) => task[update] = req.body[update])
                await task.save()
                res.send(task)

            } catch (error) {
                res.status(400).send(error)
            }
        })

        .delete(auth, async (req, res) => {
            try {
                const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
                task ? res.send(task) : res.status(404).send()
            } catch (error) {
                res.status(400).send(error)
            }
        })

export default router