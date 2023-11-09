import { UserModel } from "./userModel";

export interface CustomToken{
    token:string;
    user:UserModel;
}