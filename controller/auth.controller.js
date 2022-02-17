const bcryptjs = require('bcryptjs')
const connection = require('../config/dbconnection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.login = (req,res) => {
    let username = req.body.username
    let password = req.body.password
    try {
        connection.query(
            'SELECT * FROM user WHERE username = ?',
            [username],
            (err,result)=>{
                let user = result[0]
                if(err) throw err
                if(!user || !bcrypt.compareSync(password,user.password)){
                    res.json({
                        msg:'Username ou password incorreta'
                    })
                }
                let payload = {
                    pk : user.public_key
                } 
                let options = {
                    expiresIn: 15000,
                    issuer: 'ENTA'
                }
                let token = jwt.sign(payload, user.private_key,options)
                let userInfo = {
                    level: user.level
                }
                res.header('Authorization',token).json(userInfo)
            }
        )
    }
    catch(err){
        res.json({
            msg:'erro...'
        })
    }
    
}
