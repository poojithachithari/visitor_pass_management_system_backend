const Visitor = require('../models/visitorModel')

const getAllVisitors = async (req,res) =>{
    try{
        const visitor = await Visitor.find()
        res.json(visitor)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getOneVisitor = async (req,res) => {
    try{
        const visitor = await Visitor.findById(req.params.id)
        res.json(visitor)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getVisitorByUserEmail = async (req,res) => {
    try {
        const visitor =  await Visitor.findOne({email: req.params.email})
        res.json(visitor)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const createVisitor = async(req,res) => {
    try{
        const visitor = await Visitor.create(req.body)
        res.json(visitor)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const updateVisitor = async (req,res) => {
    try{
        const visitor = await Visitor.findByIdAndUpdate(req.params.id,req.body)
        res.json(visitor)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const deleteVisitor = async (req,res) => {
    try{
        const visitor = await Visitor.findByIdAndDelete(req.params.id)
        res.json(visitor)
    }catch(err){
        res.status(500).json({message:err.message})
    }

}

module.exports = {getAllVisitors,getVisitorByUserEmail,getOneVisitor, createVisitor,updateVisitor,deleteVisitor}