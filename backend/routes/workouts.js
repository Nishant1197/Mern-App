const express=require('express');
const mongoose = require('mongoose');
const { createWorkout,getWorkouts,getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');


//express app

const router=express.Router()

router.get('/',getWorkouts)


router.get('/:id',getWorkout)


router.post('/',createWorkout)


router.delete('/:id',deleteWorkout)


router.patch('/:id',updateWorkout)



module.exports=router;