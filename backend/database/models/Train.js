const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trainSchema = new Schema({
    id: {
        type: Number,
        min: 0,
        require : true
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    contant: {
        type: String,
        required: true,
    },
    time:{
        type: Number,
        min: 1,
        require : true
    },
    video:{
        type:String
    }
})

module.exports = mongoose.model('train', trainSchema)