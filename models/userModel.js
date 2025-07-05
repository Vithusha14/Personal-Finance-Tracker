import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image : {
        type:String,
       default:"null"
    },
    verifyOtp :{type:String,default:''},
    verifyOtpExpireAt :{type:Number,default:0},
    isAccountVerified :{type:Boolean,default:false},
    resetOtp :{type:String,default:''},
    resetOtpExpireAt :{type:Number,default:0},
    currency :{ type : String , default : "LKR"},
    
    

})

const UserModel =mongoose.models.user || mongoose.model('user',userSchema) //we will use this as reference 
export default UserModel;