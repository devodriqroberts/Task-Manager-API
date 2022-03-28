const app = require('./app');

const port = process.env.PORT

// mongooseConnection().then(() => {
//     app.listen(port, () => {
//         console.log(`Server is up on port ${port}.`);
//     })
// }).catch(e => {
//     console.log(e);
// })

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})
