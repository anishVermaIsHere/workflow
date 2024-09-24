"use strict";
import { Router } from "express";
import workflowController from "../controllers/workflow.js";
import { tokenVerify } from "../middlewares/token_verify.js";
import validator from "../middlewares/validator.js";
import { workflowCreateSchema } from "../validation/index.js";


const workflowRouter = Router();

workflowRouter.get("/", tokenVerify, workflowController.getByUser);
workflowRouter.get("/:id", tokenVerify, workflowController.getById);
workflowRouter.post("/", tokenVerify, validator(workflowCreateSchema), workflowController.create);

export { workflowRouter };

