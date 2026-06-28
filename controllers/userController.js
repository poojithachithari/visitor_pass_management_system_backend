const User = require('../models/userModel')

const getAllUsers = async (req,res) => {
    try{
        const user = await User.find().select('-password')
        res.json(user)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getOneUser = async (req,res) => {
    try{
        const user = await User.findById(req.params.id).select('-password')
        res.json(user)
    }catch(err){
        res.status(500).json({message:err.message})
    }

}

const updateUser = async (req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        res.json(user)
    }catch(err){
        res.status(500).json({message:err.message})
    }    
}

const deleteUser = async( req, res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.json(user)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {getAllUsers, getOneUser, updateUser, deleteUser}