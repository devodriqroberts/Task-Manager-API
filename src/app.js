const express = require('express');
const userRouter = require('./routers/userRoutes');
const taskRouter = require('./routers/taskRoutes');
const maintenance_mode = require('./middleware/maintenance');
require('./db/mongoose');


const app = express()

// Maintenance Mode
// app.use(maintenance_mode)

app.use(express.json())
app.use("/users", userRouter)
app.use("/tasks", taskRouter)

module.exports =  app