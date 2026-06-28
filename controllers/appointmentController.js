const Appointment = require('../models/appointmentModel')
const { sendApprovalEmail } = require('../config/emailConfig')
const getAllAppointments = async (req,res)=>{
    try{
        const appointment = await Appointment.find().populate('visitorId', 'name').populate('hostId', 'userName')
        res.json(appointment)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getOneAppointment = async (req,res)=>{
    try{
        const appointment = await Appointment.findById(req.params.id)
        res.json(appointment)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getEmpAppointments = async (req,res)=>{
    try{
        const appointment = await Appointment.find({hostId: req.params.hostId})
        res.json(appointment)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const createAppointment = async (req,res)=>{
    try{
        const appointment = await Appointment.create(req.body)
        res.json(appointment)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const updateAppointment = async(req,res)=>{
    try{
        await Appointment.findByIdAndUpdate(req.params.id, req.body)
        const appointment = await Appointment.findById(req.params.id)
            .populate('visitorId', 'name email')
            .populate('hostId', 'userName email')
        
        if(req.body.status === 'approved'  && appointment.visitorId && appointment.hostId){
            await sendApprovalEmail(
                appointment.visitorId.email,
                appointment.visitorId.name,
                appointment.appointmentDate,
                appointment.appointmentTime
            )
            await sendApprovalEmail(
                appointment.hostId.email,
                appointment.hostId.userName,
                appointment.appointmentDate,
                appointment.appointmentTime
            )
        }
        res.json(appointment)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const deleteAppointment = async (req,res)=>{
    try{
        const appointment = await Appointment.findByIdAndDelete(req.params.id)
        res.json(appointment)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports = {getAllAppointments, getOneAppointment,getEmpAppointments, createAppointment,updateAppointment,deleteAppointment}