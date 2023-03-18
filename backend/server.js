const express = require('express')
const db = require('./config/db')
const cors = require('cors')
// const bodyparser = require('body-parser')
const logs = require('morgan');
const apiurl = require('./routes/route')
const app = express()
require('dotenv').config()
db()

const port = process.env.PORT 
app.use(express.urlencoded ({extended:false}))
app.use(express.json())
app.use(cors())
app.use(logs('dev'))
app.use('',apiurl)



app.listen(port , ()=>{

    console.log(`server is created successfully on this port : ${port}`)
})