const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    height:{
        type: Number,
        min: 0,
        max:300,//sm
        require : true
    },
    age:{
        type: Number,
        min: 0,
        max:200,
        require : true
    },
    weight:{
        type: Number,
        min: 0,
        max:350,
        require : true
    },
    wantWeight:{
        type: Number,
        min: 0,
        max:350,
        require : true
    },
    view:{
        type: String,
        dataV : ['thin', 'muscular', 'thick'],
        require : true
    },
    wantView:{
        type: String,
        dataV : ['thin', 'muscular', 'thick'],
        require : true
    },
    activity:{
        type:String,
        adata : ['sitting', 'mixed', 'active'],
        require : true
    },
    goal:{
        type:String,
        gdata :['loseweight', 'gainweight', 'keepinshape'],
        require : true
    },
    eatkkal:{
        type:String,
        ekdata:['little', 'medium', 'alot'],
        require : true
    },
    stat:{
        type:String,
        require : true
    }
})

module.exports = mongoose.model('users', userSchema)