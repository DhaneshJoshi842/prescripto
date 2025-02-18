
// api for adding doctor 

import validator from "validator"
import bycrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import { json } from "express"
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file
        console.log("hello");
        console.log(imageFile)

        if (!email || !name || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            // console.log({ name, email, password, speciality, degree, experience, about, fees, address })
            console.log("idhar bhi");
            console.log(req.body);
            console.log(req.file);
            return res.json({ success: false, message: "Missing Details" })
        }
        // validating email format 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating string password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing doctor password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        // upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;
        console.log(imageUrl);
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: "Doctor Added" })

    }
    catch (error) {
        console.log("idhar");
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Api for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to get all doctors list for admin pannel

const allDoctors=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export { addDoctor, loginAdmin,allDoctors}