const Router = require('express')
const router = new Router()

const controller = require('../controllers/siteOrdersController')



router.get('/', controller.getOrdersList)
router.post('/', controller.createOrder)
router.post('/contract', controller.createContract)

module.exports = router