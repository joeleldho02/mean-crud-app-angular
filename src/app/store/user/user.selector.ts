import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserStateModel } from "src/app/model/userModel";

const getUserState = createFeatureSelector<UserStateModel>('user');

export const getUserList = createSelector(getUserState, (state)=>{
    return state.userList;
}) 

export const getuser = createSelector(getUserState, (state)=>{
    return state.user;
}) 