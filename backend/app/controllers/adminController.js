const Product = require('../../database/models/Products')
const Exercice = require('../../database/models/Exercice')
const Train = require('../../database/models/Train')
const New = require('../../database/models/News')
const Comment = require('../../database/models/Comment')

module.exports.addExercice = async(req, res) => {
    const exercice = await new Exercice({
        id: (await Exercice.find({})).length,
        contant: req.body.contant,
        delkkal : req.body.delkkal
    })

    await exercice.save()

    res.json(`${exercice.contant} додано!`)
}

module.exports.addTrain = async(req, res) => {
    const train = await new Train({
        id: (await Train.find({})).length,
        name: req.body.name,
        category: req.body.category,
        contant : req.body.contant,
        time: req.body.time,
        video: req.body.video
    })

    await train.save()

    res.json(`${train.name} додано!`)
}

module.exports.addProduct = async(req, res) => {
    const product = await new Product({
        name : req.body.name,
        kcal : req.body.kcal
    })

    await product.save();

    res.json(`${product.name} додано!`)
}

module.exports.addNew = async(req, res) => {
    try {
        const addNew = await new New({
            id: (await New.find({})).length,
            name : req.body.name,
            contant : req.body.contant,
            img : req.body.img
        })
        await addNew.save();
    
        res.json(`Новина ${addNew.name} додана`)
    }
    catch(e) {
        res.json(e)
    }    
}

module.exports.delNew = async(req, res) => {
    try {
        await New.deleteMany({
            name:req.body.name
        })

        res.json('Видалення виконалось!')
    }
    catch(e) {
        res.json("")
    }
}

module.exports.updateNew = async(req, res) => {
    try {
        const updateNew = {
            name : req.body.name,
            img : req.body.img,
            contant : req.body.contant
        }

        const updateN = await New.findOneAndUpdate(
            {
                name : req.body.oldname
            },
            {
                $set: updateNew
            },
            {
                new:true
            }
        )

        res.json(`${updateN.name} оновлено!`)
        
        
    }
    catch(e) {
        res.json("")
    }
}

module.exports.delTrain = async(req, res) => {
    try{
        await Train.deleteMany({name : req.body.name})
        res.json("Тренування видалене")
    }
    catch(e) {
        res.json("")
    }
}

module.exports.updateTrain = async(req, res) => {
    try{
        const updateTrainNew = await {
            name: req.body.name,
            category: req.body.category,
            contant : req.body.contant,
            time: req.body.time,
            video: req.body.video
        }

        const updateTrain = await Train.findOneAndUpdate(
            {
                name : req.body.oldname,
            },
            {
                $set: updateTrainNew
            },
            {
                new:true
            }
        )

        res.json(`${updateTrain.name} оновлено!`)
    }
    catch(e) {
        res.json("")
    }
}

module.exports.getAllExercices = async(req, res) => {
    try {
        const exercices = await Exercice.find({})
        res.json(exercices)
    }
    catch(e) {
        res.json("")
    }
}

module.exports.delExercice = async(req, res) => {
    try {
        const delExercice = await Exercice.find({contant: req.body.contant})
        const trains = await Train.find({})
        for(let train of trains) {
            console.log(train)
            if(train.contant.startsWith(`${delExercice[0].id} `) || train.contant.includes(` ${delExercice[0].id} `) || train.contant.endsWith(` ${delExercice[0].id}`)){
                console.log(train)
                await Train.deleteMany({id : train.id})
            }
        }
        await Exercice.deleteMany({contant : req.body.contant})
        res.json("Навантаження видалене")
    }
    catch(e)
    {
        res.json("")
    }
}

module.exports.updateExercice = async(req, res) => {
    try {
        const updtExercice = {
            contant: req.body.contant,
            delkkal : req.body.delkkal
        }

        const updatedExercice = await Exercice.findOneAndUpdate(
            {
                contant : req.body.oldcontant,
            },
            {
                $set:updtExercice
            },
            {
                new:true
            }
        )

        res.json(`${updatedExercice.contant} оновлено!`)
    }
    catch(e) {
        res.json("")
    }
}

module.exports.getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    }
    catch(e) {
        res.json("")
    }
}

module.exports.deleteProduct = async(req, res) => {
    try {
        await Product.deleteMany({name : req.body.name})
        res.json(`Продукт видалений`)
    }
    catch(e) {
        res.json("")
    }
}

module.exports.updateProduct = async(req, res) => {
    try {
        const updateProduct = {
            name : req.body.name,
            kcal : req.body.kcal
        }

        const updatedProduct = await Product.findOneAndUpdate(
            {
                name: req.body.oldname
            },
            {
                $set:updateProduct
            },
            {
                new:true
            }
        )

        res.json(`${updatedProduct.name} оновлено!`)       
        
    }
    catch(e) {
        res.json("")
    }
}

module.exports.getComments = async(req, res) => {
    try {
        const comments = await Comment.find({})
        res.json(comments)
    }
    catch(e) {
        res.json("")
    }
}

module.exports.delComments = async(req, res) => {
    try {
        await Comment.deleteMany({name : req.body.name, contant : req.body.contant})
        res.json("Коментарій видалено")
    }
    catch(e) {
        res.json("")
    }
}
