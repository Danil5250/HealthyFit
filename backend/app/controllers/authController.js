const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../database/models/User')
const dbConfig = require('../../config/db')
const config = require("../../config/project")
const errorHandler = require('../utils/errorHandler')
const express = require('express')
const path = require('path')
const myValid = require('../utils/Validate')
const app = require('../utils/expressApp')
const UserArchivements = require('../../database/models/UserArchivements')


module.exports.login = async (req, res) =>{
    if (myValid.IsValidLogin(req.body.login) && myValid.IsValidPassword(req.body.password)) {
        const signUser = await User.findOne({login:req.body.login})
        if(signUser)
        {
            GetToken(req, signUser, res)
        }
        else
        {
            res.json("Некоректні дані")
            //errorHandler(res, 401, "Auth is failed")
        }
    }
    else
    {
        res.json("Некоректні дані")
        //errorHandler(res, 401, "Auth is failed")
    }
    
}



module.exports.register = async(req, res) =>{//, next
    const signUser = await User.findOne({login:req.body.login})
    if(signUser){
        res.json(`Такий користувач існує`)
    }
    else
    {
        if(myValid.IsValidLogin(req.body.login) && myValid.IsValidPassword(req.body.password))
        {
            let returnS = myValid.IsRealData(req.body.height, req.body.age, req.body.weight, req.body.wantWeight, req.body.goal, req.body.Stat)
            if(returnS == "")
            {
                const passw = bcryptjs.hashSync(req.body.password);
                const newUser = new User({
                    login : req.body.login,
                    password : passw,
                    email : req.body.email,
                    height : req.body.height,
                    age : req.body.age,
                    weight: req.body.weight,
                    wantWeight : req.body.wantWeight,
                    view : req.body.view,
                    wantView : req.body.wantView,
                    activity : req.body.activity,
                    goal : req.body.goal,
                    eatkkal: req.body.eatkkal,
                    stat : req.body.stat
                })
                try{
                    await newUser.save();

                    const userdb = await User.findOne({login : req.body.login})

                    const archivementUser = new UserArchivements({
                        userLogin : req.body.login,
                        first:'0 0 0 0',
                        second: '0 0 0 0',
                        third: '0 0 0 0',
                        fourth: '0 0 0 0'
                    })
                
                    await archivementUser.save()

                    GetToken(req, userdb, res)
                    //res.render("sign")//path.join(path.resolve(path.dirname(__dirname), "..", ".."), "frontend", "views", "userpage.html")
                }
                catch(err){
                    console.log(err);
                    res.json("Трапилась несподіванка... Cпробуйте ще раз")
                    //res.render('question', {error : ""})
                }
            }
            else
            {
                res.json(returnS)
                //res.render('question', {error : returnS})
            }
        }
        else{
            res.json("Некоректні дані")
            //res.render('question', {error : "Некоректні дані"})
        }

        //console.log(req.body)
        
    }
}
function GetToken(req, signUser, res) {
    const isValidPsw = bcryptjs.compareSync(req.body.password, signUser.password)
    if (isValidPsw) {
        const token = jwt.sign({
            login: signUser.login,
            userId: signUser._id
        }, config.secret, { expiresIn: 1000 * 60 * 60 * 24 })

        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24,
            secure: true,
        })
        
        res.cookie('login', signUser.login, {
            maxAge: 1000 * 60 * 60 * 24,
            secure: true,
        })

        if(signUser.login == "admin")
        res.status(200).json("admin")
        else
        res.status(200).json("")
    }

    else {
        res.json("Некоректні дані")
    }
}

