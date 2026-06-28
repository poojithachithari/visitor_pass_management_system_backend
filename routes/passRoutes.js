const express = require('express')
const protect = require('../middleware/authMiddleware')
const router = express.Router()
const {getAllPasses,getOnePass, createPass, updatePass, getPassbyVisitorId} = require('../controllers/passController')
const authorize = require('../middleware/roleMiddleware')

router.get('/',protect,authorize('admin','security'),getAllPasses)
router.get('/id/:visitorId',protect,authorize('admin','visitor'),getPassbyVisitorId)
router.get('/:id', protect,authorize('admin','security','visitor'),getOnePass)
router.post('/',protect,authorize('admin','security'),createPass)
router.put('/:id',protect,authorize('admin','security'),updatePass)

module.exports = router