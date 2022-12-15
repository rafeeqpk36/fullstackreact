import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addComment=(comment)=>({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
})
 export const postComment=(dishId,rating,author,comment)=>(dispatch)=>{
    const newComment={
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
     }
     newComment.date=new Date().toISOString()
     return fetch(baseUrl + 'comments',{
        method:'POST',
        body:JSON.stringify(newComment),
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'same-origin'
     })
     .then(response=>{if(response.ok){
        return response
    }
else{ var error=new Error("Error" + response.status + ':' + response.statusText);
error.response=response;
throw error;
}}, error=>{ var errormessage=new Error(error.message)
 throw errormessage})
    .then(response=>response.json())
    .then(response=>dispatch(addComment(response)))
    .catch(error=>{console.log('Post Comments',error.message);alert('your comment could not be posted \nError:'+ error.message);})
 }
export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading(true));
    return fetch(baseUrl+ 'dishes')
    .then(response=>{if(response.ok){
        return response
    }
else{ var error=new Error("Error" + response.status + ':' + response.statusText);
error.response=response;
throw error;
}}, error=>{ var errormessage=new Error(error.message)
 throw errormessage})
    .then(response=>response.json())
    .then(dishes=>dispatch(addDishes(dishes)))
    .catch(error=>dispatch(dishesFailed(error.message)))
}

export const dishesLoading=()=>({
    type:ActionTypes.DISHES_LOADING
})
export const dishesFailed=(errormessage)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errormessage
})  

export const addDishes=(dishes)=>({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
})

export const fetchComments=()=>(dispatch)=>{
     return fetch(baseUrl+'comments')
     .then(response=>{if(response.ok){
        return response
    }
else{ var error=new Error("Error" + response.status + ':' + response.statusText);
error.response=response;
throw error;
}}, error=>{ var errormessage=new Error(error.message)
 throw errormessage})
    .then(response=>response.json())
    .then(comments=>dispatch(addComments(comments)))
    .catch(error=>dispatch(commentsFailed(error.message)))
}

export const commentsFailed=(errormessage)=>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errormessage
})  

export const addComments=(comments)=>({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
})

export const fetchLead=()=>(dispatch)=>{
    dispatch(leadLoading(true));
    return fetch(baseUrl+'leaders')
    .then(response=>{if(response.ok){
        return response
    }
else{ var error=new Error("Error" + response.status + ':' + response.statusText);
error.response=response;
throw error;
}}, error=>{ var errormessage=new Error(error.message)
 throw errormessage})
    .then(response=>response.json())
    .then(lead=>dispatch(addLead(lead)))
    .catch(error=>dispatch(leadFailed(error.message)))
}

export const leadLoading=()=>({
    type:ActionTypes.LEAD_LOADING
})
export const leadFailed=(errormessage)=>({
    type:ActionTypes.LEAD_FAILED,
    payload:errormessage
})  

export const addLead=(lead)=>({
    type:ActionTypes.ADD_LEAD,
    payload:lead
})
export const fetchPromos=()=>(dispatch)=>{
    dispatch(promosLoading(true));
    return fetch(baseUrl+'promotions')
    .then(response=>{if(response.ok){
        return response
    }
else{ var error=new Error("Error" + response.status + ':' + response.statusText);
error.response=response;
throw error;
}}, error=>{ var errormessage=new Error(error.message)
 throw errormessage})
    .then(response=>response.json())
    .then(promos=>dispatch(addPromos(promos)))
    .catch(error=>dispatch(promosFailed(error.message)))
}

export const promosLoading=()=>({
    type:ActionTypes.PROMOS_LOADING
})
export const promosFailed=(errormessage)=>({
    type:ActionTypes.PROMOS_FAILED,
    payload:errormessage
})  

export const addPromos=(promos)=>({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
})

 export const postFeedback=(firstname,lastname,telnum,email,agree,contactType,message)=>(dispatch)=>{
    const newFeedback={
        firstname:firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        agree:agree,
        contactType:contactType,
        message:message
     }
     newFeedback.date=new Date().toISOString()
     return fetch(baseUrl + 'feedbacks',{
        method:'POST',
        body:JSON.stringify(newFeedback),
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'same-origin'
     })
     .then(response=>{if(response.ok){
        return response
    }
else{ var error=new Error("Error" + response.status + ':' + response.statusText);
error.response=response;
throw error;
}}, error=>{ var errormessage=new Error(error.message)
 throw errormessage})
    .then(response=>response.json())
    .then(response=>{alert('your feedback is' + JSON.stringify(response))})
    .catch(error=>{console.log('Post Feedbacks',error.message);alert('your feedback could not be posted \nError:'+ error.message);})
 }
