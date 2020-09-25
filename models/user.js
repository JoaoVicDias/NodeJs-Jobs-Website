const mongoose = require('mongoose')
const Schema = mongoose.Schema
const user = new Schema({
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
    lastname:{
        type:String
    },
    city:{
        type:String
    },
    linkedinurl:{
        type:String
    },
    githuburl:{
        type:String
    },
    skill:{
        type:String
    }
})

module.exports = mongoose.model('User',user)