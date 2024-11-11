const express = require('express');
const fs = require('fs');
const taskRouter = require('./routes/taskRoute')
const bodyParser = require('body-parser')
const cors = require('cors');
require('./db');
require('dotenv').config();
// PORT
const PORT = process.env.PORT;

const app = express();
app.use(cors())
// bodyparser middleware
app.use(bodyParser.json())


// use routes
app.use('/task',taskRouter)

// Listning to port
app.listen(PORT,()=>{
    console.log(`Listning to PORT : ${PORT}`);
})