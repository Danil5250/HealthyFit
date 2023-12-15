const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    kcal:{
        type: Number,
        min: -1,
        max:1000,
        require : true
    },
})

module.exports = mongoose.model('products', productSchema)