import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Text, Dimensions, View } from "react-native";
import Signup from "./signup";
import PropTypes from 'prop-types';
import Login from "./login";
import Home from "./home";
import Loading from "./Loading";
import Menu from "../components/menu";
import { SideMenu, List, ListItem } from "react-native-elements";
import NavBar from '../components/navBar';
import * as actionCreators from './actions';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  onSideMenuChange=(isOpen) => {
    console.log('menu change');
    
    // this.setState({
    //   isOpen: isOpen
    // })
  }
  render() {

    return (
      <SideMenu
        openMenuOffset
        ={Dimensions
          .get('window')
          .width * (3 / 4)}
        isOpen={this.state.isOpen}
       
        menu={<Menu />}>
        <NavBar toggleSideMenu={() => {
          this.setState({
            isOpen: !this.state.isOpen
          })
        }} />
        <Router>
          <Scene key="root">
            <Scene
              key="loading"
              component={Loading}
              title="Loading"
              initial={false}
              hideNavBar />
            <Scene key="signup" component={Signup} title="Sign Up" hideNavBar />
            <Scene key="login" component={Login} title="Login" hideNavBar />
            <Scene key="home" component={Home} title="Home" hideNavBar />
          </Scene>
        </Router>
      </SideMenu>
    )
  }
}