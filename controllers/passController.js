const Pass = require('../models/passModel')
const QRCode = require('qrcode')

const getAllPasses = async(req,res)=>{
    try{
        const pass = await Pass.find()
        res.json(pass)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getOnePass = async(req,res)=>{
    try{
        const pass =await Pass.findById(req.params.id)
        res.json(pass)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getPassbyVisitorId = async (req,res)=>{
    try{
        const pass = await Pass.findOne({visitorId:req.params.visitorId})
        res.json(pass)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const createPass = async(req,res)=>{
    try{
        const pass = await Pass.create(req.body)
        const qrCode = await QRCode.toDataURL(pass._id.toString())
        await Pass.findByIdAndUpdate(pass._id,{qrcode:qrCode})
        const updatedPass = await Pass.findById(pass._id)
        res.json(updatedPass)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const updatePass = async(req,res)=>{
    try{
        const pass = await Pass.findByIdAndUpdate(req.params.id,req.body)
        res.json(pass)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {getAllPasses,getPassbyVisitorId,getOnePass,createPass,updatePass}