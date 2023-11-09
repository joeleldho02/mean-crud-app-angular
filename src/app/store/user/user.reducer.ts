import { UserStateModel } from "src/app/model/userModel";
import { userInitialState } from "./user.state";
import { createReducer, on } from "@ngrx/store";
import { addUserFail, addUserSuccess, deleteUserSuccess, getUserFail, getUserSuccess, getUsersFail, getUsersSuccess, loginUserSuccess, putUserFail, putUserSuccess } from "./user.actions";

const _UserReducer = createReducer(
    userInitialState,
    on(getUsersSuccess, (state, action)=>{
        return {
            ...state,
            userList:[...action.users],
            errMsg:''
        }
    }),
    on(getUsersFail, (state, action)=>{
        return {
            ...state,
            userList:[],
            errMsg:action.errMsg
        }
    }),
    on(getUserSuccess, (state, action)=>{
        return {
            ...state,
            user:action.user,
            errMsg:''
        }
    }),
    on(getUserFail, (state, action)=>{
        return {
            ...state,
            errMsg:action.errMsg
        }
    }),
    on(addUserSuccess, (state, action)=>{
        return {
            ...state,
            userList:[...state.userList, action.user],
            errMsg:''
        }
    }),
    on(addUserFail, (state, action)=>{
        return {
            ...state,
            errMsg:action.errMsg
        }
    }),
    on(putUserSuccess, (state, action)=>{
        const updatedList = state.userList.map(user =>{
            return user._id === action.user._id ? action.user : user;
        })
        return {
            ...state,
            // userList: updatedList,
            userList:[...state.userList, action.user],
            errMsg:''
        }
    }),
    on(putUserFail, (state, action)=>{
        return {
            ...state,
            errMsg:action.errMsg
        }
    }),
    on(deleteUserSuccess, (state, action)=>{
        const updatedList = state.userList.filter(user =>{
            return user._id !== action.user._id;
        })
        return {
            ...state,
            userList: updatedList,
            errMsg:''
        }
    }),
    on(loginUserSuccess, (state, action)=>{
        return {
            ...state,            
            loggedUser:action.user,
            errMsg:''
        }
    }),
);

export function UserReducer (state: any, action: any){
    return _UserReducer(state, action);
}