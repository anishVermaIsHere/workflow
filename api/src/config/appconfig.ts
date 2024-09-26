"use strict";
import dotenv from 'dotenv';
dotenv.config();

const appConfig={
    port: process.env.SERVER_PORT!,
    corsOrigin: process.env.CORS_ORIGIN!,
    dbUri: process.env.DB_URI!,
    reqUri: process.env.REQUEST_CATCHER_URL!,
    appName: process.env.APP_NAME!,
    salt: process.env.SALT!,
    accessTokenKey: process.env.ACCESS_TOKEN_SEC_KEY!,
    refreshTokenKey: process.env.REFRESH_TOKEN_SEC_KEY!,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY!,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY!,

};

export default appConfig;