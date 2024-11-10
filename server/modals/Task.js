const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Task = mongoose.model('Tasks',taskSchema);
module.exports = Task;