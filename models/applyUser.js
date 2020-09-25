const mongoose = require('mongoose')
const Schema = mongoose.Schema
const applyUser = new Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    jobId:{
        type:Schema.Types.ObjectId,
        ref:'Job',
        required:true
    }
    
})

module.exports = mongoose.model('applyUser',applyUser)