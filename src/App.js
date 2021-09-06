import './App.css';
import React from 'react';
import HomePage from './Components/HomePage';
import {Switch, Route} from  'react-router-dom';
import BoardLists from './Components/BoardLists';
import Header from './Components/Header';
import {connect} from 'react-redux'
import _ from 'lodash'


class App extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    console.log("------------------------ app update ---------------------",!_.isEqual(nextProps, this.props));
    console.log(nextProps);
    return !_.isEqual(nextProps, this.props);
  }
  

  componentDidUpdate(prevProps, prevState){
    console.log("------in App comp did update----------")
    console.log(prevProps)
    console.log(this.props)
    console.log(!_.isEqual(this.props.state, prevProps.state))
    if(!_.isEqual(this.props.state, prevProps.state)){
        let localDB = JSON.parse(localStorage.getItem("state_kanbanboard") || "{}");
        console.log(localDB);
      
        let ModifiedLocalDB = this.props.state;
        console.log(ModifiedLocalDB);
        localStorage.setItem("state_kanbanboard",JSON.stringify(ModifiedLocalDB))
        console.log(JSON.parse(localStorage.getItem("state_kanbanboard") || "{}"))
    }
}

  render (){
    return(
      //conditional rendering Login or Homepage
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/board/:id/:listid?/:cardid?" component={BoardLists} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("In App map to state props", state)
  return {state}
}

export default connect(mapStateToProps)(App);