"use strict";
import axiosInstance from "../AxiosInterceptor";

const URL=`${import.meta.env.VITE_BASE_URL}/api/v1/auth`;

export const authAPI={
    async login(data: any){
       return await axiosInstance({
            method: 'POST',
            url: `${URL}/`,
            data
        });
    },
    async logout(){
        return await axiosInstance.post(`${URL}/logout`, {});
    }
};