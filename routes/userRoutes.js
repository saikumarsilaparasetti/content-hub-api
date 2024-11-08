const userController = require('../controllers/userController')

const router = require('express').Router()

router.post('/create', userController.createUser)
router.post('/login', userController.login)
module.exports = router