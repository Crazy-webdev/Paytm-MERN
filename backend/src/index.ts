import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { apiRouter } from "./routes";


const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",apiRouter);

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    res.status(500).json({
        msg:"Something Broke"
    })
    return;
})

app.listen(3000);