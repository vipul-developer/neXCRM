import { AUTH_USER } from "../../../../Action/ActionTypes";

export default function(state={},action){
    switch(action.type){
        case AUTH_USER:
            return { ...state, auth: action.payload }
        default:
            return state
    }
}