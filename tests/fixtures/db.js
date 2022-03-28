const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');


const user1Id = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1Id,
    name: "Clark Kent",
    email: "ClarkKentNotSuperman@example.com",
    password: "ClarkKentWho",
    tokens: [{
        token: jwt.sign({_id: user1Id }, process.env.JWT_SECRET)
    }]
}

const user2Id = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2Id,
    name: "Bruce Wayne",
    email: "BruceWayneNotBatman@example.com",
    password: "BruceWayneWho",
    tokens: [{
        token: jwt.sign({_id: user2Id }, process.env.JWT_SECRET)
    }]
}

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 1 Test Description",
    owner: user1Id
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 2 Test Description",
    completed: true,
    owner: user1Id
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 3 Test Description",
    completed: true,
    owner: user2Id
}


const configureDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}

module.exports = {
    user1Id,
    user2Id,
    user1,
    user2,
    task1,
    task2,
    task3,
    configureDatabase
};


