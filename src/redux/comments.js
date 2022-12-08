import * as ActionTypes from "./ActionTypes"
export const Comments=(state={errorMsg:null, comments:[]},action)=>{
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading:false, errorMsg:null, comments:action.payload}
            case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading:false, errorMsg:action.payload , comments:[]}

        case ActionTypes.ADD_COMMENT:
            var comment=action.payload;
            comment.id=state.comments.length;
            comment.date=new Date().toISOString();
            return {...state, comments:state.comments.concat(comment)};

        default:return state
    }
}