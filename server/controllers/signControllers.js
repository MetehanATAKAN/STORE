import express from "express";
import SignUp from "../models/SignUp.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const sign = async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = await SignUp.findOne({ email: email });
   
    if (user) {
        return res.status(409).json({ message: 'User already exists' })
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new SignUp({
            name,
            email,
            password: hashPassword,
        });
        const savedNewUser = await newUser.save();
        return res.status(201).json({status:true,message:'Created'})

    } catch (error) {
        next(error);
    }
}

export const login = async (req,res,next) => {
    console.log(process.env.TOKEN_KEY);
    const {email, password} = req.body;

    const user = await SignUp.findOne({email:email});

    if(!user) return res.status(409).json({status:false,message:'User is not registered'});

    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword) return res.status(409).json({status:false,message:'Password is incorrect'});

    const token = jwt.sign({name:user.name},process.env.TOKEN_KEY,{expiresIn:'1d'});
    res.cookie('token',token,{httpOnly:false,maxAge:360000});
    return res.status(200).json({status:true,message:'Login successful',token:token,userInfo:user})
}