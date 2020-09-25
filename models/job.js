const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Job = new Schema({
    title:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    companyId:{
        type:Schema.Types.ObjectId,
        ref:'Company',
        required:true
    }
    
})


module.exports = mongoose.model('Job',Job)