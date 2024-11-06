import { Router } from "express";
import { userRouter } from "./user";
import { accountRouter } from "./account";

export const apiRouter=Router();

apiRouter.use("/user",userRouter);
apiRouter.use("/account",accountRouter);