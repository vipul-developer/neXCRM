import axios from "axios";
import { USER_SERVER } from "../../../../Utills/misc";
import { SIGNIN_USER } from "../../../ActionTypes";

export function singinUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                    .then(response => response.data);
        return {
            type: SIGNIN_USER,
            payload: request
        }
}