import * as ActionTypes from "./ActionTypes"


export const Leaders=(state={isLoading:true, errorMsg:null, leaders:[]},action)=>{
    switch(action.type){
        case ActionTypes.LEAD_LOADING:
            return {...state, isLoading:true , errorMsg:null , leaders:[]}

        case ActionTypes.LEAD_FAILED:
            return {...state, isLoading:false, errorMsg:action.payload , leaders:[]}

        case ActionTypes.ADD_LEAD:
            return {...state, isLoading:false, errorMsg:null, leaders:action.payload}
        default:return state
    }
}