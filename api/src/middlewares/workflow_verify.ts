
"use strict";
import { HTTP_CODES } from "../shared/constants/index.js";
import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../shared/error_handler.js";

const { BAD_REQUEST, SERVER_ERROR } =HTTP_CODES;

export function workflowVerify(req: Request, res: Response, next: NextFunction){
    try {
        const workflowId: string = req.params.id || req.body.workflowId;
        if(!isValidObjectId(workflowId)) {
            return res.status(BAD_REQUEST).json({ message: "Invalid workflow ID." });
        }
        next();
        
    } catch (error) {
        throw new ApiError(SERVER_ERROR, "Workflow ID verification failed");
    }
}

