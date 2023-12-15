const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required:true
    },
    contant: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('comment', commentSchema)