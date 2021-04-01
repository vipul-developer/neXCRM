import { SIGNIN_USER,AUTH_USER } from "../../../Action/ActionTypes";

export default function(state={},action){
    switch(action.type){
        case SIGNIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        default:
            return state
    }
}