import { UserStateModel } from "src/app/model/userModel";

export const userInitialState:UserStateModel = {
    user: {
        _id: "",
        name: "",
        email: "",
        password: "",
        isActive: true,
        phone: "",
        gender: "",
        userPic: ""
    },
    loggedUser: {
        _id: "",
        name: "",
        email: "",
        password: "",
        isActive: true,
        phone: "",
        gender: "",
        userPic: ""
    },
    userList: [], 
    errMsg:''
}