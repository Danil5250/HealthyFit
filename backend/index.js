const express = require("express")
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoDB = require('./database/index')
const session = require('express-session')


const config = require('./config/project')

const app = require("./app/utils/expressApp")


mongoDB;

const PORT = process.env.PORT || config.port //7770;

app.listen(PORT, () => {
    console.log(`Server start at http://localhost:7770`)
})