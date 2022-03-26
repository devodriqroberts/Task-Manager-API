import mongoose from 'mongoose';

const mongooseConnection = () => mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })

export default mongooseConnection



