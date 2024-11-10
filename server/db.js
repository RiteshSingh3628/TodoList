const mongoose = require('mongoose')
require('dotenv').config()
const mongodbURL = process.env.online_MongoURL
// connecting to the port
mongoose.connect(mongodbURL)


const db = mongoose.connection;


db.on('connected',()=>{
    console.log('connected to database');
})
db.on('disconnected',()=>{
    console.log('Disconneceted to database');
})
db.on('error',(err)=>{
    console.log('databse connection error :',err);
})

module.exports = db;