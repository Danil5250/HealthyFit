const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserArchivements = new Schema({
    userLogin : {
        type:String,
        required: true,
        unique: true
    },
    first : {
        type:String,
        required: true,
    },
    second : {
        type:String,
        required: true,
    },
    third : {
        type:String,
        required: true,
    },
    fourth : {
        type:String,
        required: true,
    }
})

module.exports = mongoose.model('userarchivements', UserArchivements)