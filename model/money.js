// ใช้ mongoose
const mongoose = require('mongoose')

//เชื่อมไป mongoDB
const dbUrl = 'mongodb://localhost:27017/productDB1'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

//ออกแบบ Schema
let transactioneSchema = mongoose.Schema({
    type:String,
    usd:Number,
    btc:Number,
})

//สร้าง model
let transaction = mongoose.model("transactions",transactioneSchema)

//ส่งออก Model
module.exports = transaction

//บันทึกข้อมูล
module.exports.saveMoney = function(model,data){
    model.save(data)
}