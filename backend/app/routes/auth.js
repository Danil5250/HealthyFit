const express = require("express")
const router = express.Router();
const authController = require('../controllers/authController')
const multer = require('multer')
const upload = multer()



router.post('/register',  authController.register)
router.post('/sign',  authController.login)

module.exports = router