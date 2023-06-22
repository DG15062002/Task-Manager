//jshint esversion:8

const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper( async (req,res) =>{
  // res.send('get all tasks');
  // try {
    // const tasks = await Task.find({});
    // res.status(200).json({tasks});
    // res.status(200).json({tasks,amount:tasks.length});
    // res.status(200).json({status:"success", data:{tasks,nbHits:tasks.length}});
  // } catch (error) {
  //   return res.status(500).json({msg:error});
  //
  // }
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const createTask = asyncWrapper( async (req,res) =>{
  // try {
    // const task = await Task.create(req.body);
    // res.status(201).json({task});
  // }
  //  catch (error) {
  //   return res.status(500).json({msg:error});
  // }
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTask = asyncWrapper( async (req,res,next) =>{
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
    if(!task){
      // const error = new Error('Not Found');
      // error.status = 404;
      return next(createCustomError(`No task with ID : ${taskID}`, 404));
      // return res.status(404).json({msg:`No task with id : ${taskID}`});
    }



    res.status(200).json({task});
  // } catch (error) {
  //   return res.status(500).json({msg:error});
  // }

});
const deleteTask = asyncWrapper( async (req,res) =>{
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
    if(!task){
        return next(createCustomError(`No task with ID : ${taskID}`, 404));
      // return res.status(404).json({msg:`No task with id : ${taskID}`});
    }
  res.status(200).json({task});
  // res.send('delete task');
  // res.status(200).send();
  // res.status(200).json({task: null, status : 'success'});
  // }
  //  catch (error) {
  //   return res.status(500).json({msg:error});
  // }
});
const updateTask = asyncWrapper( async (req,res) =>{
  // res.send('update task');
  // try {
    const {id:taskID} = req.params;
    // mongoose.set('useFindAndModify', true);
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
      new : true,
      runValidators:true,
    });

    if(!task){
        return next(createCustomError(`No task with ID : ${taskID}`, 404));
      // return res.status(404).json({msg:`No task with id : ${taskID}`});
    }

    res.status(200).json({task});
  // } catch (error) {
  //     return res.status(500).json({msg:error});
  // }
});
//put is not used here as it replaces any existing if other parameters are missing
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask




};
