const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    visitorId :{type:mongoose.Schema.Types.ObjectId, ref:'Visitor'},
    hostId :{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    appointmentDate:{type:Date, required:true},
    appointmentTime:{type:String, required:true},
    purpose:{type:String, required:true},
    status:{type:String, enum:['pending','approved' , 'rejected'], default:'pending'}
})

const Appointment = mongoose.model('Appointment' , appointmentSchema)

module.exports = Appointment