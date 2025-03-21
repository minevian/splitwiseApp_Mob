export interface IRegisterUserResponse {
  success: boolean;
  message: string;
  data:
  |
  {
    name: string;
    email: string

  }
  | null
}

export interface IRegisterUserRequest {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string
}

export interface IRegisterUser {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string
}

export interface IGetOtp {
  email: string
}

export interface IGetOtpRespone {
  success: boolean;
  message: string;
  data:
  |
  {
    otp: string
  }
  | null
}

export interface IverifyOtp {
  email: string;
  otp: string
}

export interface IVerifyOtpResponse {
  success: boolean;
  message: string;
  data:
  |
  {
    email: string
  }
  | null
}

export interface IGetUserData {
  email: string
}

export interface IGetUserDataRespone {
  success: boolean;
  message: string;
  data:
  |
  {
    userName: string;
    email: string;
    phoneNumber: string;
    createdDate: string;
    profileImage:string;
  }
  | null
}

export interface ILoginUserRequest {
  email: string;
  password: string
}
export interface ILoginUserResponse {
  success: boolean;
  message: string;
  data:
  |
  {
    userId: string;
    email: string;
    userName: string;
    
  }
  | null
}

export interface IUpdateProfileImageRequest {
  email: string;
  Image: File;
}

export interface IUpdateProfileImageResponse {
  success: boolean;
  message: string;
  data:
  |
  {
    userName: string;
    phoneNumber: string;
    email: string;
    createdAt:string;
    profileImage:string
  }
  | null
}