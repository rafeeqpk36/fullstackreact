import React,{Component} from "react"
import{ Card,CardImg,CardBody,CardTitle,CardText,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Label,Col,Row} from "reactstrap"
import {Link} from "react-router-dom"
import {Control,LocalForm,Errors} from "react-redux-form"
import { Loading } from "./LoadingComponent"
import { baseUrl } from "../shared/baseUrl"
const required=(val)=>val&&val.length;
const maxLength=(len)=>(val)=>!(val)||(val.length<=len);
const minLength=(len)=>(val)=>(val)&&(val.length>=len);

 class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
    
        this.toggleModal=this.toggleModal.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment)
        
    };
    
    render(){
        return(<React.Fragment><Button outline  onClick={this.toggleModal}>
            <span className="fa fa-comments fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
        <Row className="form-group"> 
                            <Label htmlFor="rating" md={12}>Rating</Label>                               
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                    className='form-control'
                                    id="rating" 
                                    validators={{required}}
                                   >    
                                   <option>Please Select</option>
                                   <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors className='text-danger'
    model=".rating"
    show="touched"
    messages={{
        required:'Required'
    }}/>
                                </Col>
                            </Row>
                        <Row className="form-group">
<Label htmlFor="author" md={12}>Your Name</Label>
<Col md={12}>
    <Control.text model=".author" id="author" name="author" 
    className="form-control" placeholder="Your Name"
    validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}
    />
    <Errors className='text-danger'
    model=".author"
    show="touched"
    messages={{
        required:'Required',
        maxLength:'Must be 15 characters or less',
        minLength:'Must be greater than 2 characters'
    }}/>

</Col>
                        </Row>                    
                            
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" 
                                    name="comment" rows="6"
                                    className='form-control'
                                    validators={{required}} 
                                                                     
                                        />
                                        <Errors className='text-danger'
    model=".comment"
    show="touched"
    messages={{
        required:'Required'
    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={6}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>           
        </ModalBody>
    </Modal>
    </React.Fragment>)

    }
 }
function RenderDish({dish}){
            if(dish!=null){return(
            <div className=" row col-12  col-md-5  m-1">
                <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
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
    
  function  RenderComments({commnts,addComment,dishId}){
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
                    
                </li>
                
            
                
                )
            
        })
         if(commnts!=null){return(<div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="ist-unstyled">
            {comm}
            </ul>
            <CommentForm addComment={addComment} dishId={dishId}/>
            </div>)}
            else{
                return(<div></div>)
            }
        
        
    };
    const DishDetail=(props)=>{
        if(props.isdishLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>  
                    </div>
                </div>
            )
        }
        else if(props.isErrorMessage){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.isErrorMessage}</h4> 
                    </div>
                </div>
            )
        }
        else if(props.dish != null) {
            return(
            <div className="container">
                <div className='row'>
      <Breadcrumb>      
      <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
      <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className='col-12'>
        <h3>{props.dish.name}</h3>
        <hr/>
      </div>

    </div>
          <div className='row'>
            <RenderDish dish={props.dish} />
            <RenderComments commnts={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
            />
                               
            </div>
            
            </div>
        
      )
                  }
                  else return(<div></div>)

    }


export default DishDetail

