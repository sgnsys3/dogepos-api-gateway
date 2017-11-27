const router = require('express').Router()
const authMiddleware = require('../../../middlewares/authHeader')
const generalSQL = require('../../../repositories/generalSQL')
const specialistSQL = require('../../../repositories/specialistSQL')

router.use('/', authMiddleware)

router.get('/product', (req, res) => {
  console.log(req.query.name)
  if (req.query.name == undefined) {
    generalSQL.selectAll('product')(req, res)
  } else {
    generalSQL.productName(req, res)
  }
})

/* Specialist API */
router.post('/staffs/mvp', specialistSQL.staffMVP)
router.post('/sale/day', specialistSQL.priceSum)
router.get('/staffs/boss', specialistSQL.whoTheBoss)

/* Normal API */
router.get('/product/:id', generalSQL.selectByID('product', 'productNo'))
router.post('/product', generalSQL.insertInto('product'))
router.patch('/product/:id', generalSQL.updateTable('product', 'productNo'))
router.delete('/product/:id', generalSQL.deleteByID('product', 'productNo'))

router.get('/staffs', generalSQL.selectAll('staffs'))
router.get('/staffs/:id', generalSQL.selectByID('staffs', 'staffNo'))
router.post('/staffs', generalSQL.insertInto('staffs'))
router.patch('/staffs/:id', generalSQL.updateTable('staffs', 'staffNo'))
router.delete('/staffs/:id', generalSQL.deleteByID('staffs', 'staffNo'))

router.get('/producttype', generalSQL.selectAll('producttype'))
router.get('/producttype/:id', generalSQL.selectByID('producttype', 'productTypeNo'))
router.post('/producttype', generalSQL.insertInto('producttype'))
router.patch('/producttype/:id', generalSQL.updateTable('producttype', 'productTypeNo'))
router.delete('/producttype/:id', generalSQL.deleteByID('producttype', 'productTypeNo'))

router.get('/productbill', generalSQL.selectAll('productbill'))
router.get('/productbill/:id', generalSQL.selectByID('productbill', 'productBillNo'))
router.post('/productbill', generalSQL.insertInto('productbill'))
router.patch('/productbill/:id', generalSQL.updateTable('productbill', 'productBillNo'))
router.delete('/productbill/:id', generalSQL.deleteByID('productbill', 'productBillNo'))

router.get('/members', generalSQL.selectAll('members'))
router.get('/members/:id', generalSQL.selectByID('members', 'memberNo'))
router.post('/members', generalSQL.insertInto('members'))
router.patch('/members/:id', generalSQL.updateTable('members', 'memberNo'))
router.delete('/members/:id', generalSQL.deleteByID('members', 'memberNo'))

router.get('/bills', generalSQL.selectAll('bills'))
router.get('/bills/:id', generalSQL.selectByID('bills', 'billNo'))
router.post('/bills', generalSQL.insertInto('bills'))
router.patch('/bills/:id', generalSQL.updateTable('bills', 'billNo'))
router.delete('/bills/:id', generalSQL.deleteByID('bills', 'billNo'))

router.get('/accounts', generalSQL.selectAll('accounts'))
router.get('/accounts/:id', generalSQL.selectByID('accounts', 'accountNo'))
router.post('/accounts', generalSQL.insertInto('accounts'))
router.patch('/accounts/:id', generalSQL.updateTable('accounts', 'accountNo'))
router.delete('/accounts/:id', generalSQL.deleteByID('accounts', 'accountNo'))

module.exports = router