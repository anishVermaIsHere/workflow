"use strict";
import axiosInstance from "../AxiosInterceptor";
import { WorkflowType } from "../../types";

const URL=`${import.meta.env.VITE_BASE_URL}/api/v1/workflow`;

export const workflowAPI={
    async create(data: WorkflowType){
       return await axiosInstance({
            method: 'POST',
            url: `${URL}/`,
            data
        });
    }
};