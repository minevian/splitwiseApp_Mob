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
    profileImage: string;
    userId:string
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
    createdAt: string;
    profileImage: string;
  }
  | null
}

export interface ICreateNewGroupRequest {
  groupName: string;
  createdBy: string;
  members: {     
    userName: string;
    email: string;
    amountPaid: number;
    owes: number;
    gets: number;
  }[];
}


export interface ICreateGroupResponse{
  success: boolean;
  message: string;
  group:
  |
  {
    groupName: string,
    createdBy:string,
    members: [
      { 
        userName: string,
        email: string,
        amountPaid:number | 0,
        owes:number | 0,
        gets:number | 0,
       },
  
    ],
    totalAmount:number,
    expenses: [
      {
        description: string,
        amount: number,
        paidBy: string
      },
  
    ]
    _id: string,
    createdAt: string,
    __v: Number
  
  }
  | null
}




export interface IGetAllGroupsResponse{
  success: boolean;
  groups:
  |
  {
    totalAmount:number,
    _id: string,
    groupName: string,
    createdBy:string,
    members: [
      { 
        userName: string,
        email: string,
       _id:string
       },
  
    ],
   
    expenses: [
      {
        description: string,
        amount: number,
        paidBy: string,
        _id:string,
        date:string
      },
  
    ]
  
    createdAt: string,
    __v: Number
  
  }
  | null
}

export interface IGetGroupByIdResponse{
  success: boolean;
  group:
  |
  {
    totalAmount:number,
    _id: string,
    groupName: string,
    createdBy:string,
    members: [
      { 
        userName: string,
        email: string,
       _id:string
       },
  
    ],
   
    expenses: [
      {
        description: string,
        amount: number,
        paidBy: string,
        _id:string,
        date:string
      },
  
    ]
  
    createdAt: string,
    __v: Number
  
  }
  | null
}

export interface IGetExpenseDetailResponse{
  success: boolean;
  message:string,
  settlements:
  |
  {
    totalAmount:number,
    _id: string,
    groupName: string,
    createdBy:string,
    members: [
      { 
        userName: string,
        email: string,
       _id:string
       },
  
    ],
   
    expenses: [
      {
        description: string,
        amount: number,
        paidBy: string,
        _id:string,
        date:string
      },
  
    ]
  
    createdAt: string,
    __v: Number
  
  }
  | null
}