import mongoose from 'mongoose';

const mongooseConnection = () => mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    })

export default mongooseConnection
//taskmanagerapp
//mongodb+srv://taskmanagerapp:taskmanagerapp@task-manager-app-2022.yuqog.mongodb.net/Task-Manager-App-API-2022?retryWrites=true&w=majority



