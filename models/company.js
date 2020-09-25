const mongoose = require('mongoose')
const { schema } = require('./job')
const Schema = mongoose.Schema
const company = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    city:{
        type:String
    },
    type:{
        type:String
    },
    description:{
        type:String
    }
})

module.exports = mongoose.model('Company',company)