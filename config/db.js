const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
        console.log("database connected");// this will not execute untill the above promise resolved
    } catch (error) {
        console.log(`server error in database connection; error : ${error}`);
    }
}

module.exports = connectDB


