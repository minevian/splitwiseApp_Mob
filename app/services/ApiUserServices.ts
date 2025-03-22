import {  ICreateGroupResponse, ICreateNewGroupRequest, IGetAllGroupsResponse, IGetGroupByIdResponse, IUpdateProfileImageResponse } from "@/constants/Common";
import apiMultimediaClient from "./MultimediaClientApi";
import apiClient from "./ApiClient";


export const handleProfileImage = async (
    data: FormData
) => {
    const response = await apiMultimediaClient.post<IUpdateProfileImageResponse>(
        "/uploadprofile",
        data
    );
    return response.data
}

export const handleCreateNewGroup= async (
    data: ICreateNewGroupRequest
) => {
    const response = await apiClient.post<ICreateGroupResponse>(
        "/createGroup",
        data
    );
    return response.data
}

export const fetchAllGroups = async (createdBy: string) => {
    const response = await apiClient.get<IGetAllGroupsResponse>(
      `/group/${createdBy}`
    );
    return response.data;
  };
  
  export const fetchGroupsById = async (groupId: string) => {
    const response = await apiClient.get<IGetGroupByIdResponse>(
      `/groupById/${groupId}`
    );
    return response.data;
  };
  