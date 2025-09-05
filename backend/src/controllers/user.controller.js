import { User } from "../models/user.model.js";

const register=async(req,res)=>{
    const {username,email,password}=req.body;

    const user=await User.findOne({email});
    if(user){
        return res.json({status: 400, message: "User already exists"});
    }

    const newUser=await User.create({username,email,password});

    res.json({status: 201, message: "User created successfully", user: newUser});
}

const login=async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username});

    if(!user){
        return res.json({status: 400, message: "User not found"});
    }

    const isPasswordCorrect=await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        return res.json({status: 400, message: "Invalid password"});
    }
    const token=await user.setUser();
    res.cookie("accessToken",token,{
        httpOnly: true,
        secure: true,
        maxAge: 3600000
    });
    res.json({status: 200, message: "User logged in successfully", user: user});
}

export {register,login};