import React, { Component } from 'react';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import {connect} from "react-redux"
import { postComment,postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLead} from '../redux/ActionCreators';
import {actions} from "react-redux-form"
import {TransitionGroup, CSSTransition} from "react-transition-group"

const mapStateToProps=state=>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders,
    feedbacks:state.feedbacks
  }
}

const mapDispatchToProps=(dispatch)=>({
  postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},
  fetchComments:()=>{dispatch(fetchComments())},
  fetchPromos:()=>{dispatch(fetchPromos())},
  fetchLead:()=>{dispatch(fetchLead())},
  postFeedback:(firstname,lastname,telnum,email,agree,contactType,message)=>dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message))
})
class Main extends Component {
  

  componentDidMount(){
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchPromos()
    this.props.fetchLead()
  }
  
  render() {
    const HomePage=()=>{
      return(<Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]} 
      dishesLoading={this.props.dishes.isLoading}
      dishesErrorMessage={this.props.dishes.errorMsg}
      promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
      promosLoading={this.props.promotions.isLoading}
      promosErrorMessage={this.props.promotions.errorMsg}
      leader={this.props.leaders.leaders.filter((lea)=>lea.featured)[0]}
      leadLoading={this.props.leaders.isLoading}
      leadErrorMessage={this.props.leaders.errorMsg}/>)
    }
    const DishWithId=({match})=>{
      return(<DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]} 
      isdishLoading={this.props.dishes.isLoading}
      isErrorMessage={this.props.dishes.errorMsg}       
      comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
      commentsErrorMessage={this.props.comments.errorMsg}
      postComment={this.props.postComment}
      />)
    }
    const FeedbacksDetail=()=>{
      return(<Contact       
      resetFeedbackForm={this.props.resetFeedbackForm}
      postFeedback={this.props.postFeedback}
      />)
    }
    return (
      <div >
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus"  component={FeedbacksDetail}/>
          <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}/>}/>
          <Redirect to="/home"/>
                </Switch>
                </CSSTransition>
                </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));