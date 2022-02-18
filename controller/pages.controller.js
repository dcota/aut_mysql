const res = require("express/lib/response")

exports.teste = (req,res)=>{
    res.json({msg:'aprovado com método'})
}