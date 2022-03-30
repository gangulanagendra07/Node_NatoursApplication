const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// *** Connected to MongoDB atlas *** //
mongoose.connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("Database is connected successfully")).catch((err) => {
    console.log(err);
})

// **** Connected to mongodb compass or local localhost://27017 ***
// mongoose.connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useFindAndModify: false
// }).then(() => console.log("Database is connected successfully"));


const port = process.env.PORT || 8000;
const server = app.listen(port, '127.0.0.1', () => {
    console.log(`App is running on port ${port}...`);
})

// process.on('UnhandledRejection', err => {
//     console.log(err);
//     console.log('Unhandled Rejection ??');
//     server.close(() => {
//         process.exit(1);
//     });
// })


