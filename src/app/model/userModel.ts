export interface UserModel{
    _id: string,
    name: string,
    email: string,
    phone?:string,
    password?: string,
    gender: string,
    isActive?: boolean,
    userPic?: string
    isAdmin?: boolean
}

export interface UserStateModel{
    userList: UserModel[],
    user: UserModel,
    loggedUser: UserModel,
    errMsg: String
}

export interface EditUserModel{
    _id: string,
    name: string,
    email: string,
    phone:string,
    gender: string,
    isActive: boolean,
    isAdmin: boolean
}