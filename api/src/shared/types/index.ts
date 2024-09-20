"use strict";
import { Request } from "express";
interface IToken {
    tokenEncode: (payload: {email: string; firstName:string; id: string; }) => { accessToken: string; refreshToken: string};
    tokenDecode: (token: string, tokenType: string, req?: Request<any> ) => boolean;
}

interface IEncrypt {
    SALT: number;
    hashPassword: (plainPassword: string) => string;
    comparePassword: (plainPassword: string, dbPassword: string) => boolean;
}

export {
    IToken,
    IEncrypt
}