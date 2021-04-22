const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    user:{
         type:String,
        required:true,
        ref:'user'

    },
    task:{
        type:String,
        required:true
    }
},{timestamps:true});


module.exports = new mongoose.model('task',taskSchema);