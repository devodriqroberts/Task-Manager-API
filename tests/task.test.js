const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { 
    user1Id, 
    user2Id, 
    user1, 
    user2, 
    task1, 
    task2, 
    task3, 
    configureDatabase 
} = require('./fixtures/db');


beforeEach(configureDatabase)

test("Should create task for user", async () => {
    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send({
            description: "From my test"
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
    expect(task.owner).toEqual(user1Id)
}) 

test("Should get all tasks for user 1", async () => {
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(2)
})

test("Should get all tasks for user 2", async () => {
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(1)
})

test("Unauthorized user should NOT be able to delete task of another user", async () => {
    await request(app)
        .delete(`/tasks/${task2._id}`)
        .set("Authorization", `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(task2._id)
    expect(task).not.toBeNull()
})