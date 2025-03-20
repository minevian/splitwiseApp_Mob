import { IGetOtp,
     IGetOtpRespone,
      IGetUserData,
      IGetUserDataRespone,
      IRegisterUserRequest, 
      IRegisterUserResponse,
       IverifyOtp,
        IVerifyOtpResponse } from '@/constants/Common';

import apiClient from './ApiClient'

export const updateRegisterUsers = async (
    data: IRegisterUserRequest
) => {
    const response = await apiClient.post<IRegisterUserResponse>(
        "/register",
        data
    );
    return response.data
}

export const getGenerateOtp = async(
    data:IGetOtp
) => {
    const response = await apiClient.post<IGetOtpRespone>(
        "/getOtp",data
    );
    return response.data
}

export const verifyOtp = async(data:IverifyOtp)=>{
    const respone = await  apiClient.post<IVerifyOtpResponse>(
        "/verifyOtp",data
    );
    return respone.data
}

export const getUserData = async(
    data:IGetUserData
) => {
    const response = await apiClient.post<IGetUserDataRespone>(
        "/getUserGetails",data
    );
    return response.data
}