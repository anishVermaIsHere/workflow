"use strict";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { parsePersistedData } from "../../utils";
import useAuthStore from "../../store/auth.store";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

let isRefreshAttempted = false;

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
    const location=useLocation();
    const { user, setUser, clearUser } = useAuthStore(state=>state);
    useEffect(()=>{
        const getAuth=()=>{
            return user;
        }
        
        async function refreshAccessToken() {
            const userInfo = getAuth();
            
              if (userInfo.refreshToken) {
                const resp = await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/api/v1/auth/refresh`,
                  {},
                  {
                    headers: {
                      User_Agent: window.navigator.userAgent,
                      Authorization: `Bearer ${userInfo.refreshToken}`
                    }
                  }
                );

                setUser({ ...user, accessToken: resp.data.accessToken });
                return resp.data.accessToken;
              } else {
                throw new Error("Logout");
              }
           
          }
    
       const requestInterceptor = axiosInstance.interceptors.request.use(
            (request: InternalAxiosRequestConfig) => {
                request.headers["User-Agent"] = window.navigator.userAgent;
                const auth=getAuth();
                if (auth?.accessToken) {
                  request.headers["Authorization"] = `Bearer ${auth?.accessToken}`; 
                  document.cookie = `accessToken=${auth?.accessToken};`;
                }
                return request;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            async(err) => {
                try {
                    if(err?.response?.status === 401 && !isRefreshAttempted){
                        isRefreshAttempted=true;
                        const newAccessToken=await refreshAccessToken();
                        err.config.headers["Authorization"] = `Bearer ${newAccessToken}`; 
                        return axiosInstance(err.config);
                    }
                } catch (error) {
                    // console.log('Error', error);
                    isRefreshAttempted = false;
                    clearUser();
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
          };
    
    },[location]);
  return children;
}


export { AxiosInterceptor };
export default axiosInstance;

