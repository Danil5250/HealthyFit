const config = require('../../config/project')
const express = require("express")
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const exphbs = require('express-handlebars')
const path = require('path')
const authRouter = require('../routes/auth')
const userRouter = require('../routes/user')
const adminRouter = require("../routes/admin")
const cookieParser = require("cookie-parser")

const host = config.host;
const port = config.sessionPort;
const key = config.secret;

const app= express();

app.use(cookieParser(key))


//For build React App
//app.use(express.static(path.join(path.resolve(path.dirname(__dirname), "..", ".."), "frontend", "user-page", "build")))

const configCors = {
    credentials:true,
    origin:true
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json());
app.use(morgan('dev'))
app.use(cors(configCors))
app.options('*', cors(configCors))


//For build React App
//app.use(path.resolve(__dirname, '..', '..', '..'), "frontend", "React", "page-user")


app.use('/api/auth/', authRouter);
app.use('/api/user/', userRouter);
app.use('/api/admin/', adminRouter);






module.exports = app;