const express = require('express')
const router = require('./routes/router')
const path = require('path')
const app = express()

//api express
app.use(express.urlencoded({extended:false}))
app.use(router)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
//ดึงข้อมูล static ใน public
app.use(express.static(path.join(__dirname,'public')))
 
app.listen(8080,()=>{
    console.log("start server expresss")
})