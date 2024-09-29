"use strict";
import io from "../index.js";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import WorkFlowModel from "../models/workflow.js";
import { HTTP_CODES } from "../shared/constants/index.js";
import {
  WFCreateType,
  WFCSVDataType,
  WFGetByIdType,
  WFUpdateType,
} from "../validation/index.js";
import { decodedUser } from "../shared/token.js";
import { ApiError } from "../shared/error_handler.js";
import axios from "axios";
import appConfig from "../config/appconfig.js";

const { SUCCESS, SERVER_ERROR, CREATE, BAD_REQUEST, RESOURCE_NOT_FOUND } =
  HTTP_CODES;

const workflowController = {
  async getByUser(req: Request, res: Response) {
    try {
      const user = decodedUser(req);
      const workflows = await WorkFlowModel.find(
        { user: user.id },
        "-__v"
      ).sort("-createdAt");
      return res.status(SUCCESS).json(workflows);
    } catch (error: any) {
      console.log("API error while getting workflow", error);
      throw new ApiError(SERVER_ERROR, error.message);
    }
  },
  async getById(req: Request<WFGetByIdType["params"], {}>, res: Response) {
    try {
      const workflowId = req.params.id;
      const workflow = await WorkFlowModel.find({ _id: workflowId }, [
        "-__v",
        "-viewport._id",
      ]);
      if (!workflow) {
        return res
          .status(RESOURCE_NOT_FOUND)
          .json({ message: "Workflow not found" });
      }

      return res.status(SUCCESS).json(workflow[0]);
    } catch (error: any) {
      console.log("API error while getting single workflow", error);
      throw new ApiError(SERVER_ERROR, error.message);
    }
  },
  async create(req: Request<{}, WFCreateType["body"]>, res: Response) {
    try {
      const data = req.body;
      const workflow = await WorkFlowModel.create(data);
      return res.status(CREATE).json(workflow);
    } catch (error: any) {
      console.log("API error while creating workflow", error);
      throw new ApiError(SERVER_ERROR, error.message);
    }
  },
  async update(
    req: Request<WFUpdateType["params"], WFUpdateType["body"], {}>,
    res: Response
  ) {
    try {
      const workflowId = req.params.id;
      const workflowData = req.body;
      const workflow = await WorkFlowModel.findOneAndUpdate(
        { _id: workflowId },
        workflowData
      );
      return res.status(SUCCESS).json(workflow);
    } catch (error: any) {
      console.log("API error while updating workflow", error);
      throw new ApiError(SERVER_ERROR, error.message);
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const workflowId = req.params.id;
      if (!isValidObjectId(workflowId)) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Invalid workflow ID." });
      }
      const workflow = await WorkFlowModel.deleteOne({ _id: workflowId });
      return res.status(SUCCESS).json({ message: "Deleted successfully " });
    } catch (error: any) {
      console.log("API error while deleting workflow", error);
      throw new ApiError(SERVER_ERROR, error.message);
    }
  },
  async execute(req: Request<{}, WFCSVDataType["body"]>, res: Response) {
    try {
      const { workflowId, rows, columns } = req.body;
      const workflow = await WorkFlowModel.findById({ _id: workflowId });
          
          if (!workflow) {
            return res
              .status(RESOURCE_NOT_FOUND)
              .json({ message: "Workflow not found" });
          }
    
          if (workflow) {
            let finalData!: any;
            let status!:{
              step: number,
              progress: number,
              total: number
            };

              for (const node of workflow.nodes) {
              switch ((node as any).data.label) {
                case "Filter Data":
                    status={ step: 1, progress: 25, total: 4 };
                    await emitProgressWithDelay(status);
                    finalData = formatDataIntoRowsAndCols(rows, columns);        
                    break;
                case "Wait":
                    status={ ...status, step: 2, progress: 50 };
                    await emitProgressWithDelay(status, 4000);
                    break;
                case "Convert Format":
                    status={ ...status, step: 3, progress: 75 };
                    await emitProgressWithDelay(status);
                    finalData = convertingDataIntoJSON(finalData);
                    break;
                case "Send POST Request":
                    status={ ...status, step: 4, progress: 100 };
                    await emitProgressWithDelay(status);
                    requestToCatcher(`${appConfig.reqUri}/test`, finalData);
                    break;
              }              
            };

            return res.status(SUCCESS).json({ message: "Workflow execution successful", data: finalData });
          }


    } catch (error: any) {
      console.log("API error while executing workflow", error);
      throw new ApiError(SERVER_ERROR, error.message);
    }
  },
};


async function emitProgressWithDelay(
  status: { step: number, progress: number, total: number }, 
  delay?: number
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delay)); 
  io.emit('progressUpdate', status); 
}

async function requestToCatcher (url: string, data?: any){
   return await axios.post(url, data);
};

function wait(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function convertingDataIntoJSON(data:any){ 
  return JSON.stringify({ data }) ;
};

function formatDataIntoRowsAndCols(rows: string[], columns: string[]) {
  return rows
    .map((row: string) => {
      if (!row.trim()) return null;
      const values = row.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) as string[];

      if (!values || values.length !== columns.length) {
        return null;
      }
      const cleanValues = values.map((item) =>
        item.replace(/(^"|"$)/g, "").trim()
      );

      return columns.reduce(
        (object: Record<string, any>, header: string, index: number) => {
            const value = cleanValues[index];
            object[header.toLowerCase()] = typeof value === 'string' ? value.toLowerCase() : value;
          return object;
        },
        {}
      );
    })
    .filter(Boolean);
};

export default workflowController;




// alternative approach 


// formattedData.map((row: any) =>{
//     return Object.fromEntries(
//         Object.entries(row).map(([key, value]) => [
//             key, 
//             typeof value === "string" ? value.toLowerCase() : value 
//         ])
//     );
// }


