const express = require("express")
const router = express.Router();
const userController = require('../controllers/userController')
const adminUserController = require('../controllers/adminUserController')
const commentController = require('../controllers/CommentController')
const multer = require('multer')
const upload = multer()
const jwt = require('jsonwebtoken')
const config = require('../../config/project')

router.get('/logout', authenticateToken, userController.logout)
router.get('/userdata', authenticateToken, userController.getUserByLogin)
router.get('/getalltrains', authenticateToken, adminUserController.getTrains)
router.post('/gettraincontant', authenticateToken, userController.getTrainsContant)
router.post('/gettrainbycategory', authenticateToken, userController.findByCategory)
router.post('/gettrainbyname', authenticateToken, userController.findByName)
router.get('/getallproducts', authenticateToken, adminUserController.getProducts)
router.post('/getuserdata', authenticateToken, userController.getUserdataByLogin)
router.post('/getproductsbykcal', authenticateToken, adminUserController.getProductsByKcal)
router.post('/updateuseradvertisment', authenticateToken, adminUserController.updateUserAdvertisment)
router.post('/getuserarchivements', authenticateToken, adminUserController.getAllUserArchivements)
router.post('/addcomment', commentController.AddComment)
router.post('/getcomments', commentController.GetComment)
router.post('/getuserslogin', authenticateToken, adminUserController.getAllUsersName)
router.post('/getchallengewinner', authenticateToken, userController.getWinnerChallenge)
router.post('/changeweight', authenticateToken, userController.changeWeight)
router.post('/getallnews', adminUserController.getAllNews)
router.post('/getnewbyid', adminUserController.getNewById)

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) return res.json({ success: false, message: 'Незареєстрований' });

    jwt.verify(token, config.secret, (err, user) => {
      if (err) return res.json({ success: false, message: 'Помилка' });

      req.user = user;
      next();
    });
  }

module.exports = router