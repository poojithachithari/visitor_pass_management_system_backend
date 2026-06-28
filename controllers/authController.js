const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req,res)=>{
    try{
        const {userName,email,password,role} = req.body
        const hashedpassword = await bcrypt.hash(password,10)
        const user = await User.create({
            userName,email,role,password:hashedpassword
        })
        const { password: _, ...userWithoutPassword } = user.toObject()
        const token = jwt.sign({
            id:user._id,role:user.role
        }, process.env.JWT_SECRET)

        res.json({user: userWithoutPassword,token})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const loginUser = async (req,res) =>{
    try{
        const {email,password} = req.body

        const user = await User.findOne({email:email})
        if(!user) return res.status(404).json({message:'User not Found'})
        const passwords = await bcrypt.compare(password,user.password)
        if(!passwords) return res.status(401).json({message:'Password not found'})
        const { password: _, ...userWithoutPassword } = user.toObject()
        const token = jwt.sign(
            {id:user._id,role:user.role}, 
            process.env.JWT_SECRET
        )
        res.json({user: userWithoutPassword,token})

    }catch(err){res.status(500).json({message:err.message})}
}

const logoutUser = async (req,res)=>{
    res.json({message: 'Logged out Successfully'})
}

module.exports= {createUser,loginUser,logoutUser}