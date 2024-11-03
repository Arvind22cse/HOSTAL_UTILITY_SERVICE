import mongoose from "mongoose";
import Signup from "../models/signup.model.js";
export const create_account=async(req,res)=>{
    const data=req.body;
    if(!data.name||!data.email||!data.password){
        return res.status(400).json({success:false,message:"Please provide all fields"});
    }
    const newdata=new Signup(data)
    try{
        await newdata.save();
        res.status(201).json({success:true,data:newdata});
    }
    catch(err){
        console.error(err);
        res.status(500).json({success:false,message:"Server Error"});

    }
};