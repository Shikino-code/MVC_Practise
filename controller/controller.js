const req = require('express/lib/request')
const res = require('express/lib/response')
const transactions = require('../model/money')

module.exports.index = (req,res)=>{
    res.render('index.ejs')
}

module.exports.disposit = (req,res)=>{
    res.render('deposit.ejs')
}

module.exports.insert = (req,res)=>{
    if(req.body.type === 'deposit' && req.body.usd !== null && req.body.usd > 0){
        console.log('Depositing')
        let doc = new transactions({
            //กำหนดรับค่า 2 ตำแหน่ง
            usd: getFloat(req.body.usd),
            type:req.body.type
        })
        transactions.saveMoney(doc,(err)=>{
            if(err) console.log(err)
        })
    }
    if(req.body.type === 'withdraw' && req.body.usd < req.body.amount && req.body.usd !== null && req.body.usd > 0){
        console.log('Withdrawing')
        let doc = new transactions({
            usd: getFloat(req.body.usd),
            type: req.body.type
        })
        transactions.saveMoney(doc,(err)=>{
            if(err) console.log(err)
        })
    }
    res.redirect('/')
}

const getFloat = (number) => {
    return parseFloat(parseFloat(number).toFixed(2))
}

module.exports.transaction = (req,res)=>{
    transactions.find().exec((err,doc)=>{
        res.render('transaction.ejs',{transactions:doc})
    })
}

module.exports.withdraw = (req,res)=>{
    transactions.find().exec((err,doc)=>{
        let amountArray = doc.map(item => {
            return {
                amount: getFloat(item.usd),
                type: item.type
            }
        })
        let amount = parseFloat(0);
        amountArray.forEach(
            transaction => {
                console.log(typeof getFloat(transaction.amount))
                console.log(transaction.amount)
                if(transaction.type === 'deposit')
                {
                    amount += transaction.amount
                } else {
                    amount -= transaction.amount
                }
            }
        )
        res.render('withdraw.ejs', {
            amount: amount
        })
    })
}

module.exports.buy = (req,res)=>{
    res.render('buy.ejs')
}