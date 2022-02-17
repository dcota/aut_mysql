const express = require('express')
const router = express.Router()
const connection = require('../config/dbconnection')

router.post('/',(req,res)=>{
    const username = req.body.username;
    console.log(username)
    connection.query(
        'SELECT * FROM user WHERE username = ?', 
        [req.body.username],     
        (err,result) => {
        if(err){
            console.log('Erro na base de dados...')
        }
        else {
            if(result!=0)
                res.json({msg : 'Utilizador existente'})
            //criar novo
        }
    })
})


module.exports = router