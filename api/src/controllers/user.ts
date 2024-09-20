"use strict";
import { Request, Response } from "express";
import UserModel from "../models/user.js";
import { HTTP_CODES } from "../shared/constants/index.js";
import tokenInfo from "../shared/token.js";
import encrypt from "../config/encrypt.js";
import { LoginUserType } from "../validation/index.js";
import { ApiError } from "../shared/error_handler.js";
import { NOTFOUND } from "dns";


const { SUCCESS, BAD_REQUEST, SERVER_ERROR, RESOURCE_NOT_FOUND } = HTTP_CODES;

export const userController={
    async login(req: Request<LoginUserType["body"]>, res: Response) {
        try {
            const { email, password }=req.body;
            const { tokenEncode }=tokenInfo;
            const user = await UserModel.findOne({email}).exec();
            if(user && user.email) {
                let dbPassword = user.password;
                let plainPassword = password;
                if (encrypt.comparePassword(plainPassword, dbPassword)) {
                    const { accessToken, refreshToken } = tokenEncode({ email:user.email, firstName: user.firstName, id:user.id });
                    // user.refreshToken=refreshToken;

                    return res.status(SUCCESS).json({
                        message: `Hi ${user.firstName}, welcome back`,
                        user: {
                            firstName: user.firstName,
                            lastName:user.lastName,
                            email: user.email,
                            role: user.role,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            id: user._id
                        }
                        
                    });
                } 
                else {
                    return res.status(RESOURCE_NOT_FOUND).json({ message: "Invalid credentials" });
                }
            } else {
                return res.status(RESOURCE_NOT_FOUND).json({ message: "User not exist"});
            }

        } catch (error:any) {
            console.log('API: error while login', error.message);
            throw new ApiError(SERVER_ERROR, error.message);
        }
    },
    async logout(req: Request, res: Response){
        try {
            return res.status(SUCCESS).json({ message: "Logout succesfully ", statusCode: SUCCESS });
        } catch (error: any) {
            console.log('API: error while logout', error.message);
            throw new ApiError(SERVER_ERROR, error.message);
        }
    },
    async register(){
        //...
    }
}