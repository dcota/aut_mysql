const express = require("express");
const router = express.Router();
const connection = require("../config/dbconnection");
const bcryptjs = require("bcryptjs");
const authController = require("../controller/auth.controller");
const path = require("path");

router.post("/", authController.login,(req,res)=>{
  res.redirect('/adminpage')
})

router.get("/login", (req, res) => {
  console.log('aqui')
  res.sendFile(path.join(__dirname, "../public/login.html"));
});


router.post("/new", (req, res) => {
  let username=req.body.username
  let level = req.body.level
  let encPass = bcryptjs.hashSync(escape(req.body.password,bcryptjs.genSaltSync(2)))
  let today = new Date().toISOString().slice(0, 10)
  try {
    connection.query(
      "SELECT * FROM user WHERE username = ?",
      [req.body.username],
      (error, result) => {
        if (error) throw error;
        if (result>0) res.json({msg:'Utilizador existente'})
        try{
          connection.query(
            'INSERT INTO user (username,password,level,registration_data) VALUES (?,?,?,?)',
            [username,encPass,level,today],
            (error,result)=>{
              if(error) throw error
              console.log(result.insertId)
              let private_key=Math.random().toString(36).substring(2) + result.insertId
              let public_key=Math.random().toString(36).substring(2) + result.insertId
              try{
                connection.query(
                  'UPDATE user SET public_key = ?, private_key = ? WHERE iduser = ?',
                  [public_key,private_key,result.insertId],
                  (error,result)=>{
                    if (error) throw error
                    res.json({msg:'Utilizador criado'})
                  }
                )
              }
              catch(error){
                res.json({msg:'Error na BD'})
              }
            }
          )
        }
        catch(error){
          res.json({msg:'Error na BD'})
        }
      }
    );
  } catch (error) {
    res.json({
      msg: "Erro na BD",
    });
  }
});



module.exports = router;
