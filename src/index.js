import mongooseConnection from './db/mongoose.js';
import app from './app.js';

const port = process.env.PORT

mongooseConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server is up on port ${port}.`);
    })
}).catch(e => {
    console.log(e);
})