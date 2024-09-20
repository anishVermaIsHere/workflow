"use strict";
import tokenObject, { decodedUser, TOKEN } from "../shared/token.js";
import { HTTP_CODES } from "../shared/constants/index.js";
import { NextFunction, Request, Response } from "express";

const {UNAUTHORIZE}=HTTP_CODES;

export function tokenVerify(req: Request,res: Response, next: NextFunction){
    try {
        const token: string = req.headers['authorization']?.split(' ')[1] || req.cookies?.accessToken;
        const isVerified=tokenObject.tokenDecode(token,TOKEN['ACCESS_TOKEN'], req);
        if(isVerified){
           const user = decodedUser(req);
           req.body.user=user.id;
            next();
        } else {
            res.status(UNAUTHORIZE).json({message: "Unauthorized user"});
        }
    } catch (error) {
        res.status(UNAUTHORIZE).json({ message: "Unauthorized" });
    }
}

