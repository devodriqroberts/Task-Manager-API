const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { user1Id, user1, configureDatabase } = require('./fixtures/db');


beforeEach(configureDatabase)


test("Should sign up a new user.", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "Vod",
            email: "vod@example.com",
            password: "PassingPass123!"
        })
        .expect(201)

    // Assert that the db was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    
    // Assertions about response object
    expect(response.body).toMatchObject({
        user: {
            name: "Vod",
            email: "vod@example.com"
        },
        token: user.tokens[0].token
    })
    // Test password is not plain text
    expect(user.password).not.toBe("PassingPass123!")
}) 

test("Should fail to sign up existing user.", async () => {
    await request(app)
        .post("/users")
        .send({
            name: user1.name,
            email: user1.email,
            password: user1.password
        })
        .expect(400)
}) 

test("Should login in existing user", async () => {
    const response = await request(app)
        .post("/users/login")
        .send({
            email: user1.email,
            password: user1.password
        })
        .expect(200)

    // Assert 2nd token matches user token after login
    const user = await User.findById(user1Id)
    expect(user.tokens[1].token).toBe(response.body.token)
})

test("Should not login nonexistent user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: "emaildoesnotexist@example.com",
            password: "thisusershouldfail"
        })
        .expect(400)
})

test("Should get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
})

test("Should NOT  get profile for unauthenticated user", async () => {
    await request(app)
        .get("/users/me")
        .send()
        .expect(401)
})

test("Should delete account for authenticated user", async () => {
    await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(user1Id)
    expect(user).toBeNull()
})

test("Should NOT delete account for unauthenticated user", async () => {
    await request(app)
        .delete("/users/me")
        .send()
        .expect(401)
})

test("Should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/profile-pic.jpg")
        .expect(200)
    const user = await User.findById(user1Id)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid user field", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send({
            email: "user1updatedemail@example.com",
            age: 27
        })
        .expect(200)

    const user = await User.findById(user1Id)
    expect(user.name).toBe(user1.name)
    expect(user.email).toBe("user1updatedemail@example.com")
    expect(user.age).toBe(27)
})

test("Should NOT update with invalid user field", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${user1.tokens[0].token}`)
        .send({
            location: "Miami, FL"
        })
        .expect(400)
})