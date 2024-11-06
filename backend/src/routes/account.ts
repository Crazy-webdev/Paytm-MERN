import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { Account } from "../db";
import mongoose from "mongoose";
import { transferInput } from "@aryanbhat2/common";

export const accountRouter=Router();

accountRouter.get("/balance",authMiddleware,async(req:Request,res:Response):Promise<void>=>{
    try{
        const userId=req.userId;
        const account=await Account.findOne({
            userId
        })
        if(!account){
            res.status(500).json({
                msg:"Error while accessing account"
            })
            return;
        }
        const balance=account.balance/100;

        res.status(200).json({
            balance
        })

    }catch(e){
        console.error("err",e);
        res.status(500).json({
            msg:"Error occured while getting user balance"
        })
        return;
    }
})

accountRouter.post("/transfer",authMiddleware,async(req:Request,res:Response):Promise<void>=>{
   try{
        const session=await mongoose.startSession();
        session.startTransaction();
        const payload=req.body;
        const parsedPayload=transferInput.safeParse(payload);

        if(!parsedPayload.success){
            res.status(400).json({
                msg:"Please check if the inputs are correct"
            })
            return;
        }
        const {amount,to}=payload;
        const account=await Account.findOne({
            userId:req.userId
        }).session(session);
        if(!account){
            await session.abortTransaction();
            res.status(404).json({
                msg:"Error finding account"
            })
            return;
        }

        if(account.balance/100<amount){
            await session.abortTransaction();
            res.status(400).json({
                msg:"Insufficient Balance"
            })
            return;
        }

        const toAccount=await Account.findOne({userId:to}).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            res.status(400).json({
                msg: "Invalid account"
            });
            return;
        }

        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount*100}}).session(session);
        await Account.updateOne({userId:to},{$inc:{balance:amount*100}}).session(session);

        await session.commitTransaction();
        res.status(200).json({
            msg:"Transfer successful"
        })

    }catch(e){
        console.error("err",e);
        res.status(500).json({
            msg:"Server issue"
        })
        return;
    }
})