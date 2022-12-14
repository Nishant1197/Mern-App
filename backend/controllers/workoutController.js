const { default: mongoose } = require('mongoose');
const Workout = require('../modals/Workout');


//get all workouts
const getWorkouts=async(req,res)=>{
    const workouts= await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}


//get a single workout
const getWorkout=async(req,res)=>{
    const {id}=req.params
    //Type checking of id did we provide proper format of id
   //Monodb type object id
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No such workout"})
    }
        const workout= await Workout.findById(id)
     if(!workout)
     {
      return   res.status(404).json({error:'No such workout'})
     }
     
     
        res.status(200).json(workout)
  


}

//create new workout
const createWorkout=async(req,res)=>{
    const {title,reps,load}=req.body

    //add doc to db
    try{
        const workout= await Workout.create({
            title,reps,load
        })
        res.status(200).json(workout)
    }
    catch(err)
    {
        res.status(400).json({error:err.message});
     }
    
    
}

//delete a workout
const deleteWorkout=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
    return  res.status(404).json({error:'No such workout'})
    }
    const workout=await Workout.findOneAndDelete({_id:id})
    if(!workout)
    {
        res.status(404).json({error:'No such workout'})
    }
    return res.status(200).json(workout)
}


//update a workout
const updateWorkout=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
    return  res.status(404).json({error:'No such workout'})
    }
    const workout=await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!workout)
    {
        res.status(404).json({error:'No such workout'})
    }
    return res.status(200).json(workout)

}


module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}