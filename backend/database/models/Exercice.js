const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciceSchema = new Schema({
    id:{
        type: Number,
        min: 0,
        required: true
    },
    contant: {
        type: String,
        required: true,
    },
    delkkal : {
        type:Number,
        min:0,
        required: true
    }
})

module.exports = mongoose.model('exercice', exerciceSchema)