import {  IUpdateProfileImageResponse } from "@/constants/Common";
import apiMultimediaClient from "./MultimediaClientApi";


export const handleProfileImage = async (
    data: FormData
) => {
    const response = await apiMultimediaClient.post<IUpdateProfileImageResponse>(
        "/uploadprofile",
        data
    );
    return response.data
}