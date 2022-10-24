import React,{Component} from "react"
import{ Card,CardImg,CardImgOverlay,CardBody,CardTitle,CardText} from "reactstrap"


class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {      
        };

    }
    
    renderDish(dish){
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
    
    renderComments(commnts){
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
    render(){
        const dish=this.props.choosenDish;
        if (dish == null) {
            return (<div></div>);
        }
        const dishdetail=this.renderDish(dish);
        const commentslist=this.renderComments(dish.comments)
        
        return(
          <div className='row'>
            {dishdetail}  
            {commentslist}                       
            </div>
        
      )
    }
}

export default DishDetail

