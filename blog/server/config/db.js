require("dotenv").config();
const mongoose = require("mongoose");

const dbConnector = async() => {
    const db = await mongoose.connect(process.env.DB_URL);
    if(!db) return console.log("Database is Not Connected.");
    return console.log("Database Connected.");
}

module.exports = dbConnector;
