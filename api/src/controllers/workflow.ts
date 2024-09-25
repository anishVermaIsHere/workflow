"use strict";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import WorkFlowModel from "../models/workflow.js";
import { HTTP_CODES } from "../shared/constants/index.js";
import { WFCreateType } from "../validation/index.js";
import { decodedUser } from "../shared/token.js";
import { ApiError } from "../shared/error_handler.js";


const { SUCCESS, SERVER_ERROR, CREATE, BAD_REQUEST, RESOURCE_NOT_FOUND } =  HTTP_CODES;

const workflowController={
    async getByUser(req: Request, res: Response){
        try {
            const user = decodedUser(req);
            const workflows = await WorkFlowModel.find({ user: user.id }, "-__v").sort('-createdAt');
            return res.status(SUCCESS).json(workflows);
        } catch (error: any) {
            console.log('API error while getting workflow', error);
            throw new ApiError(SERVER_ERROR, error.message);
        }  
    },
    async getById(req: Request, res: Response){
        try {
            const workflowId =  req.params.id;
            if (!isValidObjectId(workflowId)) {
                return res.status(BAD_REQUEST).json({ message: "Invalid workflow ID." });
            }
            const workflow = await WorkFlowModel.find({ _id: workflowId }, ["-__v", "-viewport._id"]);
            if(!workflow){
                return res.status(RESOURCE_NOT_FOUND).json({ message: "Workflow not found" }); 
            }
            
            return res.status(SUCCESS).json(workflow[0]);
        } catch (error: any) {
            console.log('API error while getting workflow', error);
            throw new ApiError(SERVER_ERROR, error.message);
        }  
    },
    async create(req: Request<{}, WFCreateType["body"]>, res: Response){
        try {
            const data = req.body;
            const workflow = await WorkFlowModel.create(data);
            return res.status(CREATE).json(workflow);
        } catch (error: any) {
            console.log('API error while creating workflow', error);
            throw new ApiError(SERVER_ERROR, error.message);
        }
    },
    async update(req: Request, res: Response){
        try {
            const workflowId =  req.params.id;
            const workflowData = req.body
            if (!isValidObjectId(workflowId)) {
                return res.status(BAD_REQUEST).json({ message: "Invalid workflow ID." });
            }
            const workflow = await WorkFlowModel.findOneAndUpdate({ _id: workflowId }, workflowData);
            if(!workflow){
                return res.status(RESOURCE_NOT_FOUND).json({ message: "Workflow not found" }); 
            }            
            return res.status(SUCCESS).json(workflow);
        } catch (error: any) {
            console.log('API error while updating workflow', error);
            throw new ApiError(SERVER_ERROR, error.message);
        }
    },
    async delete(req: Request, res: Response){
        try {
            const workflowId =  req.params.id;
            if (!isValidObjectId(workflowId)) {
                return res.status(BAD_REQUEST).json({ message: "Invalid workflow ID." });
            }
            const workflow = await WorkFlowModel.deleteOne({ _id: workflowId }, );
            if(!workflow){
                return res.status(RESOURCE_NOT_FOUND).json({ message: "Workflow not found" }); 
            }
            
            return res.status(SUCCESS).json({ message: "Deleted successfully "});
        } catch (error: any) {
            console.log('API error while deleting workflow', error);
            throw new ApiError(SERVER_ERROR, error.message);
        }
    }
}

export default workflowController;