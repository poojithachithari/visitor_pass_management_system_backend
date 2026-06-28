const express = require('express')
const protect = require('../middleware/authMiddleware')
const authorize = require('../middleware/roleMiddleware')
const router = express.Router()
const {getAllUsers,getOneUser,updateUser,deleteUser} = require('../controllers/userController')

router.get('/',protect,authorize('admin'),getAllUsers)
router.get('/:id',protect,authorize('admin'),getOneUser)
router.put('/:id',protect,authorize('admin'),updateUser)
router.delete('/:id',protect,authorize('admin'),deleteUser)

module.exports = router