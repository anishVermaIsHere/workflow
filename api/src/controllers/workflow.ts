import { Request, Response } from "express";
import WorkFlowModel from "../models/workflow.js";
import { HTTP_CODES } from "../shared/constants/index.js";


const { SUCCESS, CREATE } =  HTTP_CODES;

const workflowController={
    async getByUser(req: Request, res: Response){
        try {
            const id =  req.params.id;
            const userId =  'user_354jtlslsfs';
            const workflow = await WorkFlowModel.find({ user: id });

            // if(workflow && workflow._id){
                return res.status(SUCCESS).json(workflow);
            // }
        } catch (error: any) {
            console.log('API error while getting workflow', error);
            throw new Error(error.message);
        }  
    },
    async getById(req: Request, res: Response){
        try {
            const id =  req.params.id;
            const workflow = await WorkFlowModel.find({ workflowId: id });
    
            // if(workflow && workflow._id){
                return res.status(SUCCESS).json(workflow);
            // }
          } catch (error: any) {
            console.log('API error while getting workflow', error);
            throw new Error(error.message);
          }  
    },
    async create(req: Request, res: Response){
        try {
            const data = req.body.data;
            const workflow = await WorkFlowModel.create(data);
            return res.status(CREATE).json(workflow);
        } catch (error: any) {
            console.log('API error while creating workflow', error);
            throw new Error(error.message);
        }
    },
    async delete(){

    }
}

export default workflowController;