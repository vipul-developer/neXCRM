import { SIGNIN_USER } from "../../../../Action/ActionTypes";

export default function(state={},action){
    switch(action.type){
        case SIGNIN_USER:
            return { ...state, loginSuccess: action.payload }
        default:
            return state
    }
}