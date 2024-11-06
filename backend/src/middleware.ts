import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

declare global{
    namespace Express{
        interface Request{
            userId:string
        }
    }
}

export const authMiddleware= async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const authHeader=req.headers.authorization|| " ";
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            res.status(401).json({
                msg:"Incorrect credentials"
            })
            return;
        }
        const token=authHeader.split(" ")[1];
        const jwtVerify=jwt.verify(token,JWT_SECRET as jwt.Secret) as {userId:string};
        if(jwtVerify.userId){
            req.userId=jwtVerify.userId;
            next();
        }else{
            res.status(401).json({
                msg: "Invalid token payload"
            });
            return;
        }

    }catch(e){
        res.status(500).json({
            msg:"Error occured while verifying credentials"
        })
        return;
    }
}