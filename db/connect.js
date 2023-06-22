//jshint esversion:8
const mongoose = require('mongoose');
// const connectionString =
// 'mongodb+srv://Dhwaj:Chph1234@nodeexpressprojects.9om8e43.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority';


const connectDB = (url) =>{
  return mongoose
  .connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
  // .then(()=>console.log('CONNECTED TO THE DB...'))
  // .catch((err)=>console.log(err));
};

module.exports =connectDB;
