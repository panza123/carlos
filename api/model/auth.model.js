import mongoose from "mongoose";


const userShema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum:["admin", "user"]
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps: true
})

const User = mongoose.model("User", userShema);

export default User