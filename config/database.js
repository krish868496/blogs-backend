const mongoose = require("mongoose")
require("dotenv").config();
const connectDb = () => {
        mongoose.connect(process.env.DATABASE_NAME).then(
                console.log("Database connected successfully")
        ).catch((err) => {
                console.log(err);
                process.exit(1);
        })
}

module.exports = connectDb;