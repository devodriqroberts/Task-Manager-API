import express from 'express';
import mongooseConnection from './db/mongoose.js';
import userRouter from './routers/userRoutes.js';
import taskRouter from './routers/taskRoutes.js';
import maintenance_mode from './middleware/maintenance.js';


const app = express()
const port = process.env.PORT

// Maintenance Mode
// app.use(maintenance_mode)

app.use(express.json())
app.use("/users", userRouter)
app.use("/tasks", taskRouter)


mongooseConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server is up on port ${port}.`);
    })
}).catch(e => {
    console.log(e);
})