const express = require('express')
const router = express.Router()
const Task = require('../modals/Task')

router.get('/',(req,resp)=>{
    resp.status(200).send("Welcome to task Manager");
})


// Adding data to task
router.post('/add',(req,resp)=>{
    const data = req.body;
    const newTask = new Task(data)
    newTask.save()
    .then((reponse)=>{
        resp.status(201).json({message:"Added Task Successfully"})
    })
    .catch((err)=>{
        console.log(err)
        resp.status(400).json({message:err.message})
    })

})

// Getting All the tasks
router.get('/all',(req,resp)=>{
    Task.find()
    .then((data)=>{
        resp.status(200).json(data)
    })
    .catch(err=>{
        resp.status(400).json({message:err.message})
    })
})

// Edit Task
router.put('/edit/:id',(req,resp)=>{
    const taskId = req.params.id;
    const taskBody = req.body
    Task.findByIdAndUpdate(taskId,taskBody,{
        new:true,//return the updated document
        runValidaters:true,//Run Mongoose validation
    })
    .then((response)=>{
        resp.status(200).json({message:"Updated successfully"})
    })
    .catch(err=>{
        resp.status(400).json({message:err.message})
    })
})

// delete Task
router.delete('/delete/:id',(req,resp)=>{
    const taskId = req.params.id;
    Task.findByIdAndDelete(taskId)
    .then((response)=>{
        resp.status(200).json({message:"deleted successfully"})
    })
    .catch(err=>{
        resp.status(400).json({message:err.message})
    })
})
module.exports = router;