"use strict";
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { HTTP_CODES } from "../shared/constants/index.js";


const validator = (schema: AnyZodObject) =>(req: Request, res: Response, next: NextFunction) => {
    // try {
    console.log(req.body);
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
      
    // } catch (error: any) {
    //   return res.status(HTTP_CODES.BAD_REQUEST).send(error.error);
    // }
  };

export default validator;
