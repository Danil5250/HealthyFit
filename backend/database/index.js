const mongoose = require('mongoose')
const keys = require('../config/db')
module.exports = mongoose.connect(keys.mongoUrl)
    .then(() => {console.log("Connect to MongoDB")})
    .catch(err => console.log(err))