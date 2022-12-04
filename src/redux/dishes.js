
import * as ActionTypes from "./ActionTypes"

export const Dishes=(state={isLoading:true, errorMsg:null, dishes:[]},action)=>{
    switch(action.type){
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading:true , errorMsg:null , dishes:[]}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading:false, errorMsg:action.payload , dishes:[]}

        case ActionTypes.ADD_DISHES:
            return {...state, isLoading:false, errorMsg:null, dishes:action.payload}

        default:return state
    }
}