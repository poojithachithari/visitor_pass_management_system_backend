const express = require('express')
const protect = require('../middleware/authMiddleware')
const router = express.Router()
const {getAllAppointments,getOneAppointment,getEmpAppointments,createAppointment,updateAppointment,deleteAppointment} = require('../controllers/appointmentController')
const authorize = require('../middleware/roleMiddleware')

router.get('/',protect,authorize('admin','employee','security'),getAllAppointments)
router.get('/host/:hostId',protect,authorize('admin','employee'),getEmpAppointments)
router.get('/:id',protect,authorize('admin','employee'),getOneAppointment)
router.post('/',protect,authorize('admin','employee'),createAppointment)
router.put('/:id',protect,authorize('admin','employee'),updateAppointment)
router.delete('/:id',protect,authorize('admin'),deleteAppointment)

module.exports = router