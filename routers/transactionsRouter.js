const controller = require('../controllers/transactionsController')
const Router = require('express')
const router = new Router()


router.post('/',  controller.createTransaction)
router.get('/', controller.getTransactions)
router.get('/', controller.getTransactionById)
router.get('/user/:id', controller.getTransactionsByUserId)
router.put('/:id', controller.updateTransaction)
router.delete('/:id', controller.deleteTransaction)
router.post('/user',  controller.updateTransactionByUser)

//[(roleMiddleWare(['ADMIN'])), authMiddleWare],
module.exports = router