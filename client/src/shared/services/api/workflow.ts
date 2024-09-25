"use strict";
import axiosInstance from "../AxiosInterceptor";
import { CreateWorkflowType, WorkflowType } from "../../types";

const URL=`${import.meta.env.VITE_BASE_URL}/api/v1/workflow`;
const auth = JSON.parse(localStorage.getItem('auth') || '{}').state.user  || null;

export const workflowAPI={
    async create(data: CreateWorkflowType){
       return await axiosInstance({
            method: 'POST',
            url: `${URL}/`,
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`
            },
            data
        });
    },
    async update(data: WorkflowType, workflowId: string){
        return await axiosInstance({
            method: 'PUT',
            url: `${URL}/${workflowId}`,
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`
            },
            data
        });
    },
    async fetch(){
        return await axiosInstance({
            method: 'GET',
            url: `${URL}`,
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`
            },
        });
    },
    async fetchById(workflowId: string){
        return await axiosInstance({
            method: 'GET',
            url: `${URL}/${workflowId}`,
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`
            }
        });
    },
    async delete(workflowId: string){
        return await axiosInstance({
            method: 'DELETE',
            url: `${URL}/${workflowId}`,
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`
            }
        })
    }
};

