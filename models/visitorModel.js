const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String , required:true},
    phone:{type:String, required:true},
    address:{type:String, required:true},
    photo:{type:String, required:true},
    purposeOfVisit:{type:String, required:true},
    hostId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    status:{type:String, enum:['pending','checked-in','checked-out'], default:'pending'}


})

const Visitor = mongoose.model('Visitor',visitorSchema)
module.exports = Visitor