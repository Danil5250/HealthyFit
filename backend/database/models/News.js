const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewSchema = new Schema({
    id : {
        type:Number,
        equired: true
    },
    img : {
        type:String,
        required: true
    },
    name : {
        type:String,
        required: true,
    },
    contant : {
        type:String,
        required: true,
    }
})

module.exports = mongoose.model('new', NewSchema)