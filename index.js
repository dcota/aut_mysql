const express = require('express')
const app = express()
const cors = require('cors');
const authController = require('./controller/auth.controller')
const path = require('path')
app.use(cors());

app.options('*', cors());
app.use((req, res, callback) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Language, Location');
res.header('Access-Control-Expose-Headers', 'Authorization, Language, Location');
    return callback();
})

app.use(express.static('./public'))

//interpreteção do formato json
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))

app.use('/login',authController.checkAuth,require('./routes/user.route'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'))
})

app.get('/loginpage',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/login.html'))
})

app.post('/page',authController.checkAuth,(req,res)=>{
    if(req.body.level==="admin")
         res.redirect('/adminpage')
    else
         res.redirect('/main')
})

app.get('/adminpage',(req,res)=>{
    res.sendFile(path.join(__dirname,'./views/adminpage.html'))
})

app.get('/main',(req,res)=>{
    res.sendFile(path.join(__dirname,'./views/main.html'))
})



const port = process.env.port || 3000

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})