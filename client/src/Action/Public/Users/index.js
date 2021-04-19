import axios from "axios";
import { USER_SERVER } from "../../../Utills/misc";
import { SIGNIN_USER,AUTH_USER,LOGOUT_USER } from "../../ActionTypes";

export function singinUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                    .then(response => response.data);
        return {
            type: SIGNIN_USER,
            payload: request
        }
}
export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
                    .then(response => response.data);
        return {
            type: AUTH_USER,
            payload: request
        }
}
export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
                    .then(response => response.data);
        return {
            type: LOGOUT_USER,
            payload: request
        }
}