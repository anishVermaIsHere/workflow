"use strict";
import { Router } from "express";
import workflowController from "../controllers/workflow.js";
import { tokenVerify } from "../middlewares/token_verify.js";
import validator from "../middlewares/validator.js";
import { workflowCreateSchema, workflowUpdateSchema } from "../validation/index.js";
import { workflowVerify } from "../middlewares/workflow_verify.js";


const workflowRouter = Router();

workflowRouter.get("/", tokenVerify, workflowController.getByUser);
workflowRouter.get("/:id", tokenVerify, workflowVerify, workflowController.getById);
workflowRouter.put("/:id", tokenVerify, workflowVerify, validator(workflowUpdateSchema), workflowController.update);
workflowRouter.delete("/:id", tokenVerify, workflowVerify, workflowController.delete);
workflowRouter.post("/", tokenVerify, validator(workflowCreateSchema), workflowController.create);
workflowRouter.post("/execute", tokenVerify, workflowVerify, workflowController.execute);

export { workflowRouter };

