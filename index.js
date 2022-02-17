const express = require('express')
const app = express()

app.use(express.static('./public'))

//interpreteção do formato json
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))

app.use('/user',require('./routes/user.route'))

const port = process.env.port || 3000

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})