const express = require('express')
const router = express.Router()
const connection = require('../config/dbconnection')
const bcryptjs = require('bcryptjs')
const authController = require('../controller/auth.controller')

router.post('/login', 
  authController.login
)


module.exports = router