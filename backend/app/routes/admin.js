const express = require("express")
const router = express.Router();
const adminController = require('../controllers/adminController')
const adminUserController = require('../controllers/adminUserController')
const multer = require('multer')
const upload = multer()
const jwt = require('jsonwebtoken')
const config = require('../../config/project')

router.post('/addExercice', authenticateToken,  adminController.addExercice)//authenticateToken, 
router.post('/addTrain', authenticateToken, adminController.addTrain)
router.post('/addProduct', authenticateToken, adminController.addProduct)
router.post('/addNew', authenticateToken, adminController.addNew)
router.get('/getallnews', authenticateToken, adminUserController.getAllNews)
router.post('/deletenew', authenticateToken, adminController.delNew)
router.patch('/updatenew', authenticateToken, adminController.updateNew)
router.post('/getallexercice', authenticateToken, adminUserController.getAllExercise)
router.post('/addtrain', authenticateToken, adminController.addTrain)
router.get('/gettrain', authenticateToken, adminUserController.getTrains)
router.post('/deltrain', authenticateToken, adminController.delTrain)
router.post('/updatetrain', authenticateToken, adminController.updateTrain)
router.get('/getallexercice', authenticateToken, adminController.getAllExercices)
router.post('/delexercice' , authenticateToken, adminController.delExercice)
router.post('/updateExercice' , authenticateToken, adminController.updateExercice)
router.get('/getallProducts', authenticateToken, adminController.getAllProducts)
router.post('/deleteProduct', authenticateToken, adminController.deleteProduct)
router.post('/updateProduct', authenticateToken, adminController.updateProduct)
router.post('/getAllComments', authenticateToken, adminController.getComments)
router.post('/deleteComment', authenticateToken, adminController.delComments)

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    const userName = req.cookies.login;

    if (!token && userName != "admin") return res.json({ success: false, message: 'Незареєстрований' });

    jwt.verify(token, config.secret, (err, user) => {
      if (err) return res.json({ success: false, message: 'Помилка' });

      req.user = user;
      next();
    });
  }


module.exports = router