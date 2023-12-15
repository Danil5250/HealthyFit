const path = require('path')
const Product = require('../../database/models/Products')
const Exercice = require('../../database/models/Exercice')
const Train = require('../../database/models/Train')
const User = require('../../database/models/User')
const UserArchivements = require('../../database/models/UserArchivements')


module.exports.logout = (req, res) => {
    res.clearCookie("token")
    res.clearCookie("login")
    res.json("")
}

module.exports.getUserByLogin = async(req,res) =>{
    const fUser = await User.find({login : req.cookies.login})
    res.json(fUser[0])
}


module.exports.getTrainsContant = async (req, res) => {
    const contant = String(req.body.contant).split(' ')
    let findexercices = []
    for(let ex of contant) {
        
        let exercise = await Exercice.find({id:ex})
        await findexercices.push(exercise[0])
    }
    res.json(findexercices)
}

module.exports.findByCategory = async (req, res) => {
    const findTrain = await Train.find({category : req.body.category})
    
    res.json(findTrain)
}

module.exports.findByName = async (req, res) => {
    const allTrains = await Train.find();
    let returnData = []
    for(let train of allTrains) {
        if(train.name.includes(req.body.name))
        await returnData.push(train)
    }
    res.json(returnData)
}

module.exports.getUserdataByLogin = async(req, res) => {
    const userData = await User.find({login:req.body.login});
    res.json(userData[0])
}

module.exports.getWinnerChallenge = async(req, res) => {
    const opponentArchivement = await UserArchivements.find({userLogin : req.body.opponentlogin})
    const currentArchivement = await UserArchivements.find({userLogin : req.cookies.login})
    if(req.body.criterion == 'morelean') {
        const Ofirst = opponentArchivement[0].first.split(' ')
        const Osecond = opponentArchivement[0].second.split(' ')
        const Othird = opponentArchivement[0].third.split(' ')
        const Ofourth = opponentArchivement[0].fourth.split(' ')
        
        const Cfirst = currentArchivement[0].first.split(' ')
        const Csecond = currentArchivement[0].second.split(' ')
        const Cthird = currentArchivement[0].third.split(' ')
        const Cfourth = currentArchivement[0].fourth.split(' ')

        const Oweight = Ofirst[0] + Osecond[0] + Othird[0] + Ofourth[0]
        const Ovt = Ofirst[1] + Osecond[1] + Othird[1] + Ofourth[1]
        const Ovb = Ofirst[2] + Osecond[2] + Othird[2] + Ofourth[2] 
        const Ovh = Ofirst[3] + Osecond[3] + Othird[3] + Ofourth[3]

        const Cweight = Cfirst[0] + Csecond[0] + Cthird[0] + Cfourth[0]
        const Cvt = Cfirst[1] + Csecond[1] + Cthird[1] + Cfourth[1]
        const Cvb = Cfirst[2] + Csecond[2] + Cthird[2] + Cfourth[2]
        const Cvh = Cfirst[3] + Csecond[3] + Cthird[3] + Cfourth[3]

        if(Cweight < Oweight && Cvt < Ovt && Cvb < Ovb && Cvh < Ovh) {
            res.json("Ви перемогли у челенджі")
        }
        else if(Cweight > Oweight && Cvt > Ovt && Cvb > Ovb && Cvh > Ovh) {
            res.json("Ви програли у челенджі")
        }
        else {
            res.json("Нічия")
        }
    }
    else if(req.body.criterion == 'morebig') {
        const Ofirst = opponentArchivement[0].first.split(' ')
        const Osecond = opponentArchivement[0].second.split(' ')
        const Othird = opponentArchivement[0].third.split(' ')
        const Ofourth = opponentArchivement[0].fourth.split(' ')
        
        const Cfirst = currentArchivement[0].first.split(' ')
        const Csecond = currentArchivement[0].second.split(' ')
        const Cthird = currentArchivement[0].third.split(' ')
        const Cfourth = currentArchivement[0].fourth.split(' ')

        const Oweight = Ofirst[0] + Osecond[0] + Othird[0] + Ofourth[0]
        const Ovt = Ofirst[1] + Osecond[1] + Othird[1] + Ofourth[1]
        const Ovb = Ofirst[2] + Osecond[2] + Othird[2] + Ofourth[2] 
        const Ovh = Ofirst[3] + Osecond[3] + Othird[3] + Ofourth[3]

        const Cweight = Cfirst[0] + Csecond[0] + Cthird[0] + Cfourth[0]
        const Cvt = Cfirst[1] + Csecond[1] + Cthird[1] + Cfourth[1]
        const Cvb = Cfirst[2] + Csecond[2] + Cthird[2] + Cfourth[2]
        const Cvh = Cfirst[3] + Csecond[3] + Cthird[3] + Cfourth[3]

        if(Cweight > Oweight && Cvt > Ovt && Cvb > Ovb && Cvh > Ovh) {
            res.json("Ви перемогли у челенджі")
        }
        else if(Cweight < Oweight && Cvt < Ovt && Cvb < Ovb && Cvh < Ovh) {
            res.json("Ви програли у челенджі")
        }
        else {
            res.json("Нічия")
        }
    }
}
module.exports.changeWeight = async(req, res) => {
    try {
        const updateUserData = {
            weight : req.body.weight
        }

        const updateUser = await User.findOneAndUpdate(
            {
                login : req.cookies.login
            },
            {
                $set: updateUserData
            },
            {
                new:true
            }
        )

        res.json(`${updateUser.login}, вага змінена`)
    }
    catch(e) {
        res.json(e)
    }
}
