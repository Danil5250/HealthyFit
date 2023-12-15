const Comment = require('../../database/models/Comment')

module.exports.AddComment = async(req, res) => {
    const comment = await new Comment({
        name : req.body.name,
        contant : req.body.contant,
        date: new Date().toLocaleDateString()
    })

    await comment.save();

    res.json(`${comment.name}, коментар додано!`)
}

module.exports.GetComment = async(req,res) => {
    const comments = await Comment.find({})
    res.json(comments)
}