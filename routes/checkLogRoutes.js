const express = require('express')
const protect = require('../middleware/authMiddleware')
const router = express.Router()
const {getAllCheckLogs,getOneCheckLog,createCheckLog,updateCheckLog, getChecklogByPassId} = require('../controllers/checkLogController')
const authorize = require('../middleware/roleMiddleware')

router.get('/', protect,authorize('security','admin'),getAllCheckLogs)
router.get('/pass/:passId',protect,authorize('admin','security'),getChecklogByPassId)
router.get('/:id', protect,authorize('security','admin'),getOneCheckLog)
router.post('/',protect,authorize('security','admin'),createCheckLog)
router.put('/:id',protect,authorize('admin','security'),updateCheckLog)

module.exports = router