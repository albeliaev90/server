const Router = require('express')
const router = new Router()

const controller = require('../controllers/usersController')



router.post('/',  controller.createUser)
router.get('/', controller.getUsers)
router.get('/', controller.getUserById)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser) 
router.get('/search/:query', controller.searchUser)

//[(roleMiddleWare(['ADMIN'])), authMiddleWare],
module.exports = router