const mongoose =require ('mongoose')

const checkLogSchema = new mongoose.Schema({
    visitorId:{type:mongoose.Schema.Types.ObjectId,ref:'Visitor'},
    passId:{type:mongoose.Schema.Types.ObjectId,ref:'Pass'},
    checkInTime:{type:Date, required:true},
    checkOutTime:{type:Date, default:null},
    date:{type:Date,required:true}
})

const CheckLog = mongoose.model('CheckLog', checkLogSchema)

module.exports = CheckLog