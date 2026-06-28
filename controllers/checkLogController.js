const CheckLog = require('../models/checkLogModel')

const getAllCheckLogs = async(req,res)=>{
    try{
        const checkLog = await CheckLog.find()
        res.json(checkLog)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getOneCheckLog = async(req,res)=>{
    try{
        const checkLog = await CheckLog.findById(req.params.id)
        res.json(checkLog)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getChecklogByPassId = async(req,res)=>{
    try{
        const checkLog = await CheckLog.findOne({passId: req.params.passId})
        res.json(checkLog)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const createCheckLog = async(req,res)=>{
    try{
        const checkLog = await CheckLog.create(req.body)
        res.json(checkLog)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const updateCheckLog = async(req,res)=>{
    try{
        const checkLog = await CheckLog.findByIdAndUpdate(req.params.id,req.body)
        res.json(checkLog)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {getAllCheckLogs,getChecklogByPassId,getOneCheckLog,createCheckLog,updateCheckLog}