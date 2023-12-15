const path = require('path')
const Product = require('../../database/models/Products')
const Exercice = require('../../database/models/Exercice')
const Train = require('../../database/models/Train')
const User = require('../../database/models/User')
const UserArchivements = require('../../database/models/UserArchivements')
const News = require('../../database/models/News')

module.exports.getTrains = async(req, res) => {
    const train = await Train.find({})
    res.json(train)
}

module.exports.getProducts = async(req, res) => {
    const products = await Product.find({})
    res.json(products)
}

module.exports.getProductsByKcal = async(req, res) => {
    const products = await Product.find({})
    let result = []
    for(let product of products) {//kcal : 
        if(req.body.kcal - 100 < product.kcal && req.body.kcal + 100 > product.kcal)
            await result.push(product)
    }
    res.json(result)
}

module.exports.initializeArchivementUser = async(req, res) => {
    const archivementUser = await new UserArchivements({
        userLogin : req.cookies.login,
        first:'0 0 0 0',
        second: '0 0 0 0',
        third: '0 0 0 0',
        fourth: '0 0 0 0'
    })

    await archivementUser.save()

    res.json('add null archivementuser')
}

module.exports.updateUserAdvertisment = async(req, res) => {

    try{
        const updateArchUser = {
            userLogin : req.cookies.login,
            first : req.body.first,
            second : req.body.second,
            third : req.body.third,
            fourth : req.body.fourth
        }
        
        const updtUser = await UserArchivements.findOneAndUpdate(
            {
                userLogin : req.cookies.login,
            },
            {
                $set: updateArchUser
            },
            {
                new:true
            }
        )

        res.json(`Досягнення ${updtUser.userLogin} було оновлено`)
    }
    catch(e) {
        res.json(e)
    }
}

module.exports.getAllUserArchivements = async(req, res) => {
    try{
        const getData = await UserArchivements.find({userLogin : req.cookies.login})
        res.json(getData[0])
    }
    catch(e) {
        res.json(e)
    }
}

module.exports.getAllUsersName = async(req, res) => {
    try{
        const users = await User.find({})
        let result = []
        users.forEach( user => {
            result.push(user.login)
        })
        res.json(result)
    }
    catch(err){
        res.json("")
    }
}

module.exports.getAllNews = async(req, res) => {
    try {
        const news = await News.find({})
        res.json(news)
    }
    catch(e) {
        res.json('')
    }
}

module.exports.getNewById = async(req, res) => {
    try {
        const news = await News.find({id:req.body.id})
        res.json(news[0])
    }
    catch(e) {
        res.json("")
    }
}

module.exports.getAllExercise = async(req, res) => {
    try {
        const exercises = await Exercice.find({})
        res.json(exercises)
    }
    catch(e) {
        res.json("")
    }
}
