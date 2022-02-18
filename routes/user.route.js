const express = require('express')
const router = express.Router()
const connection = require('../config/dbconnection')
const bcryptjs = require('bcryptjs')
const authController = require('../controller/auth.controller')
const pagesController = require('../controller/pages.controller')
const path = require('path')

router.post('/login', 
  authController.login
)

router.get('/main', authController.checkAuth,(req,res)=> {
  res.sendFile(path.join(__dirname,'../views/pagina.html'))
})


module.exports = router