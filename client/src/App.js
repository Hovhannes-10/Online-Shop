import React,{Component ,Fragment} from 'react';
import { Route ,Switch} from 'react-router-dom'

import AppNavbar from './components/AppNavbar';
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/itemModal"
import Detalis from './components/Details';
import Card from './components/Cart/Cart';
import Default from './components/Default';
import {loadUser} from "./actions/authActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from "./store";
import { getItems } from './actions/itemsActions';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getItems());
  }
  render(){
     return (
        <Fragment >
          <AppNavbar />
          <Switch>
            <Route path = '/'  component = { ShoppingList } exact/>
            <Route path= '/admin' component = { ItemModal }/> 
            <Route path= '/detalis/:id' component = { Detalis }/>
            <Route path= '/card' component = { Card }/>
            <Route component = { Default }/>
          </Switch>
        </Fragment>
    )
  }
 
}

export default App;
