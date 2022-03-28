const express = require('express');
const auth = require('../middleware/auth');
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController")

const router = new express.Router()

router.route("/")
    // Create Task
    .post(auth, createTask)
    // Get Tasks
    .get(auth, getTasks)
    
router.route("/:id")
    // Get Task
    .get(auth, getTask)
    // Update Task
    .patch(auth, updateTask)
    // Delete Task
    .delete(auth, deleteTask)

module.exports = router