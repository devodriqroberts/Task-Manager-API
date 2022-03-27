import express from 'express';
import userRouter from './routers/userRoutes.js';
import taskRouter from './routers/taskRoutes.js';
import maintenance_mode from './middleware/maintenance.js';


const app = express()

// Maintenance Mode
// app.use(maintenance_mode)

app.use(express.json())
app.use("/users", userRouter)
app.use("/tasks", taskRouter)

export default app