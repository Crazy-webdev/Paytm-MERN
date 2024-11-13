import { NextFunction, Request, Response, Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" 
import { signupInput,signinInput,updateInput } from "@aryanbhat2/common"
import { Account, User } from "../db";
import { JWT_SECRET } from "../config";
import { authMiddleware } from "../middleware";
export const userRouter=Router();

userRouter.post("/signup",async(req:Request,res:Response):Promise<void>=>{
    try{
        const payload=req.body;
        if(!payload){
            res.status(400).json({
                msg:"Please fill all the required fields"
            })
            return;
        }
        const parsedPayload=signupInput.safeParse(payload);
        if(!parsedPayload.success){
            res.status(400).json({
                msg:"Please check if the inputs are correct"
            })
            return;
        }
        const checkUser= await User.findOne({
            username:payload.username
        })
        if(checkUser){
            res.status(409).json({
                msg:"Email address is already in use"
            })
            return;
        }
        const saltRounds:number=10;
        const hashedPassword = await bcrypt.hash(payload.password,saltRounds);

        const createUser=await User.create({
            username:payload.username,
            firstName:payload.firstName,
            lastName:payload.lastName,
            password:hashedPassword
        })

        const userId=createUser._id;

        const initialBalance=await Account.create({
            userId,
            balance:Math.ceil((1+Math.random())*10000000)
        })

        const token =jwt.sign({userId},JWT_SECRET);
        res.status(200).json({
            msg:"User created successfully",
            token
        })
    }catch(e){
        console.error("err",e);
        res.status(500).json({
            msg:"Server error"
        })
        return;
    }
})

userRouter.post("/signin",async(req:Request,res:Response):Promise<void>=>{
    try{
        const payload=req.body;
        if(!payload){
            res.status(400).json({
                msg:"Please fill all the required fields"
            })
            return;
        }
        const parsedPayload=signinInput.safeParse(payload);
        if(!parsedPayload.success){
            res.status(400).json({
                msg:"Please check if the inputs are correct"
            })
            return;
        }

        const checkExistingUser=await User.findOne({
            username:payload.username
        })
        if(!checkExistingUser){
            res.status(404).json({
                msg:"User not found"
            })
            return;
        }
        const checkPassword=await bcrypt.compare(payload.password,checkExistingUser.password);
        if(!checkPassword){
            res.status(401).json({
                msg:"Invalid password"
            })
            return;
        }
        console.log(checkExistingUser);
        const token=jwt.sign({userId:checkExistingUser._id},JWT_SECRET)
        res.status(200).json({
            msg:"Login successful",
            token
        })
        
    }catch(e){
        console.error("err",e);
        res.status(500).json({
            msg:"Server error"
        })
        return;
    }
})


userRouter.put("/update",authMiddleware,async(req:Request,res:Response):Promise<void>=>{

    try{
        const payload=req.body;
        if(!payload){
            res.status(400).json({
                msg:"Please fill all the required fields"
            })
            return;
        }
        const parsedPayload=updateInput.safeParse(payload);
        if(!parsedPayload.success){
            res.status(400).json({
                msg:"Please check if the inputs are correct"
            })
            return;
        }
        const findUser=await User.updateOne({
            _id:req.userId
        },payload)
        
        res.status(200).json({
            msg:"Updated successfully",
            payload
        })
    }catch(e){
        console.error("err",e);
        res.status(500).json({
            msg:"Server error"
        })
        return;
    }
})

userRouter.get("/bulk",authMiddleware,async(req:Request,res:Response):Promise<void>=>{

    try{
        const filter = req.query.filter || "";

        const users = await User.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [{
                        firstName: {
                            "$regex": filter
                        }
                    }, {
                        lastName: {
                            "$regex": filter
                        }
                    }]
                }
            ]
        });

        res.status(200).json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
        }))
    })
    }catch(e){
        console.error("err",e);
        res.status(500).json({
            msg:"Server error"
        })
        return;
    }
})