const express = require('express')
const router = express.Router()
const Controller = require('../controller/controller')

router.get('/', Controller.index)
router.get('/deposit', Controller.disposit)
router.post('/insert', Controller.insert)
router.get('/transaction', Controller.transaction)
router.get('/withdraw', Controller.withdraw)
router.get('/buy', Controller.buy)
module.exports = router
