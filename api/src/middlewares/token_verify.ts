import tokenObject, { TOKEN } from "../shared/utils/token/token.js";
import { HTTP_CODES } from "../shared/constants/index.js";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../shared/error_handler.js";

const {UNAUTHORIZE}=HTTP_CODES;

export function tokenVerify(req: Request,res: Response, next: NextFunction){
    try {
        const token: string = req.headers['authorization']?.split(' ')[1] || req.cookies?.accessToken;
        const isVerified=tokenObject.tokenDecode(token,TOKEN['ACCESS_TOKEN'], req);
        if(isVerified){
            next();
        } else {
            res.status(UNAUTHORIZE).json({message:resMessage.readMessage("user","unauthorize")});
        }
    } catch (error) {
        res.status(UNAUTHORIZE).json({ message: "Unauthorized" });
    }
}

