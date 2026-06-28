const mongoose = require('mongoose')

const passSchema = new mongoose.Schema({
    visitorId:{type:mongoose.Schema.Types.ObjectId, ref:'Visitor'},
    appointmentId:{type:mongoose.Schema.Types.ObjectId, ref:'Appointment'},
    qrcode:{type:String},
    validFrom:{type:Date , required:true},
    validUntil:{type:Date, required:true},
    status:{type:String, enum:['active', 'expired','cancelled'],default:'active'}
})

const Pass = mongoose.model("Pass", passSchema)

module.exports = Pass