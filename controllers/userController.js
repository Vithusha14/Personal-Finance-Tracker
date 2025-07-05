import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import transporter from "../mailtrap/nodemailer.js";

//Create User Controller
export const register = async (req, res) => {

    const {name,email,password, currency} = req.body;

    if(!name || !email || !password ){
        return res.status(400).json({success:false, message:"All fields are required"});
    }

    try {

        const existingUser = await UserModel.findOne({email});

        if(existingUser){
            return res.status(400).json({success:false, message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({name,email,password:hashedPassword, currency})

        await user.save();
        
        //notification 
        transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Registration Confirmation",
            text: 'Welcome to our app, ${username}! Your account has been successfully created',
          })

      const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        res.cookie('token',token,{
           httpOnly:true,
           secure:process.env.NODE_ENV === "production",
           sameSite:process.env.NODE_ENV === "production" ? "none" : "strict",
           maxAge:7*24*60*60*1000
      })

        res.status(201).json({success:true, message:"User created successfully"});



    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}


//Login User Controller
export const login = async (req, res) => {

    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({success:false, message:"Email and Password are required"});
    }

    try {

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({success:false, message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({success:false, message:"Incorrect Password"});
        }

       const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

       res.cookie('token',token,{
           httpOnly:true,
           secure:process.env.NODE_ENV === "production",
           sameSite:process.env.NODE_ENV === "production" ? "none" : "strict",
           maxAge:7*24*60*60*1000
       })

        res.status(200).json({success:true, message:"Login successful"});
        
    } catch (error) {
        res.status(500).json({success:false, message:"Login Failed..."});
    }
}


export const logout = async (req,res) =>{
    try {
        res.clearCookie('token',{
         httpOnly:true,
         secure:process.env.NODE_ENV === "production",
         sameSite:process.env.NODE_ENV === "production" ? "none" : "strict",
         maxAge:7*24*60*60*1000 });

        clearTokenCookie(res);

        return res.status(200).json({success:true, message:"Logged Out..."});
        
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}


export const resetPassword = async (req, res) => {
    try {
        const token = req.headers['x-reset-token']; // Get reset token from headers
        const { newPassword } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Reset token is required in headers" });
        }

        // Find user by reset token and check if it is still valid
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // Ensure token is not expired
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password and clear reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Password reset failed", error: error.message });
    }
};


//control our crud operations using mongoose 