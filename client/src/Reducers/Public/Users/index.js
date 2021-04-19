import { SIGNIN_USER,AUTH_USER,LOGOUT_USER } from "../../../Action/ActionTypes";

export default function(state={},action){
    switch(action.type){
        case SIGNIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        default:
            return state
    }
}