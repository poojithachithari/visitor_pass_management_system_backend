const express = require('express')
const protect = require('../middleware/authMiddleware')
const router = express.Router()
const {getAllVisitors,getOneVisitor,createVisitor,updateVisitor , deleteVisitor, getVisitorByUserEmail} = require('../controllers/visitorController')
const authorize = require('../middleware/roleMiddleware')
router.get('/',protect,authorize('admin','security','employee'),getAllVisitors)
router.get('/email/:email',protect,authorize('admin','visitor'),getVisitorByUserEmail)
router.get('/:id',protect,authorize('admin','security','employee'),getOneVisitor)
router.post('/',protect,authorize('admin','security', 'employee'),createVisitor)
router.put('/:id',protect,authorize('admin','security'),updateVisitor)
router.delete('/:id',protect,authorize('admin'),deleteVisitor)

module.exports = router