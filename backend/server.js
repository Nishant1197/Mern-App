//To use the data in .env file we use dotenv package and dotenv package load data in process object
require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose')
// Get all the routes
const workouts=require('./routes/workouts')




//express app

const app=express();

// Middleware to attach body object to req if any data is passed
app.use(express.json())

//middleware
app.use('/api/workouts',workouts)

app.use((req,res,next)=>{
    res.json("404 page")
})


//connect to database
mongoose.connect(process.env.MONGO_URI)
.then(()=>{

//Listen for request
app.listen(process.env.PORT,()=>{
    console.log('listeneing on port',process.env.PORT);
})
})
.catch((err)=>{
console.log(err);
})






