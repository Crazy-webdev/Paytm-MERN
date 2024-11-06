import mongoose from "mongoose";
import { DATABASE_URL } from "./config";


export const dbConnect=async()=>{
    function connectConfirm(){
        console.log("Connected to db")
    }
    try{
        await mongoose.connect(DATABASE_URL).then(connectConfirm)
    }catch(e){
        console.log("Error while connecting to db")
    }
}
dbConnect();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
export const User = mongoose.model('User', userSchema);
export const Account=mongoose.model('Account',accountSchema);