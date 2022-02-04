const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/TourModel')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// *** Connected to MongoDB atlas *** //
mongoose.connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => console.log("Database is connected successfully")).catch(err => {
    console.log(err);
});

// Read Json file
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

// Import Data into DB
const importData = async () => {

    try {
        await Tour.create(tours);
        console.log("data stored successfully")
    } catch (err) {
        console.log(err);
    }


}

console.log(process.argv);