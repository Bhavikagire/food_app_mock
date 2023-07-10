const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user");

const register = async (req,res) => {

    try {
        const {name, email, password, address} = req.body;

        const alreadyuser = await User.findOne({email});
        if(alreadyuser){
            return res.status(40).json({"msg":'Email is Already registered'})
        }
        if(!name || !email || !password || !address){
            res.send("missing require property")
        }

        const hashpass = await bcrypt.hash(password, 5);

        const newUser = new User({name, email, password:hashpass, address});
        await newUser.save()

        return res.status(201).json({"msg":"user registerd successfully"})
    } catch (error) {
        console.log("error in internal", error)
        return res.status(500).json({"msg":"internal error","error":error})
    }
}


const login = async(req,res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(403).json({'message': 'Invalid Email or User not exist'});
        }

        const passwordcheck = await bcrypt.compare(password, user.password)
        if (!passwordcheck ) {
            return res.status(403).json({'message':'Incorrect Password! Please Try again'})
        }
        const token = jwt.sign({userId:user._id}, "masai", {expiresIn:"1h"});
        return res.status(200).json({"msg":"login success","token":token})
    } catch (error) {
   console.log("error in login",error)
     return res.status(500).json({"msg":"something wrong","error":error})

    }
}


const resetpassword = async (req,res)=>{
    try {
        const {id} = req.params;
        const {currentpassword, newpassword} = req.body;

        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({"msg":"user not found"})
        }

        const checkpassword = await bcrypt.compare(currentpassword, user.password)
        if(!checkpassword){
            return  res.status(409).json({"msg":"current password is incorrect!"})
        }
        const hashpassword = await bcrypt.hash(newpassword, 5);
        user.password = hashpassword
        await user.save()

        res.status(200).json({"msg":"reset password sucessfully"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({"msg":"Something went Wrong!","err":error})
        
    }
}
module.exports = {register,
login,
resetpassword}
