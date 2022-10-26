import React from "react"
import{ Card,CardImg,CardBody,CardTitle,CardText} from "reactstrap"


function RenderDish({dish}){
        if(dish!=null){return(
            <div className=" row col-12  col-md-5  m-1">
                <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
            </CardBody>

        </Card></div>
            
        )}
        else{
            return(<div></div>)
        }
    }
    
  function  RenderComments({commnts}){
                    const comm = commnts.map((commnt) => {
                return (
            <li key={commnt.id} >
            
                <p>{commnt.comment}</p>
                 <p>---{commnt.author} ,
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(commnt.date))}</p>
                </li>)
            
        })
         if(commnts!=null){return(<div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="ist-unstyled">
            {comm}
            </ul>
            </div>)}
            else{
                return(<div></div>)
            }
        
        
    };
    const DishDetail=(props)=>{
        const dish=props.dish;
        if (dish == null) {
            return (<div></div>);
        }
                
        return(
            <div className="container">
          <div className='row'>
            <RenderDish dish={dish} />
            <RenderComments commnts={dish.comments}/>                       
            </div>
            </div>
        
      )
    }


export default DishDetail

