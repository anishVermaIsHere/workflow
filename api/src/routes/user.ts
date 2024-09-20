"use strict";
import { Router } from "express";
import { userController } from "../controllers/user.js";


const userRouter = Router();

userRouter.post("/", userController.login);
userRouter.post("/logout", userController.logout);

export { userRouter };