"use strict";
import axiosInstance from "../AxiosInterceptor";
import { CreateWorkflowType, WorkflowType } from "../../types";

const URL=`${import.meta.env.VITE_BASE_URL}/api/v1/workflow`;

export const workflowAPI={
    async create(data: CreateWorkflowType){
       return await axiosInstance({
            method: 'POST',
            url: `${URL}/`,
            data
        });
    },
    async udpate(data: WorkflowType, workflowId: string){
        return await axiosInstance({
            method: 'PUT',
            url: `${URL}/${workflowId}`
        });
    },
    async fetch(){
        return await axiosInstance.get(`${URL}/`);
    },
    async fetchById(workflowId: string){
        return await axiosInstance({
            method: 'GET',
            url: `${URL}/${workflowId}`,
        });
    }
};

