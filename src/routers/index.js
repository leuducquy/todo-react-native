import React, {Component} from 'react';
import {Router, Scene,Actions} from 'react-native-router-flux';
import {Text,Dimensions,View} from "react-native";
import Signup from "./signup";
import Login from "./login";
import Home from "./home";
import Loading from "./Loading";
import Menu from "../components/menu";
import {SideMenu,List,ListItem} from "react-native-elements";
export default class App extends Component {
  render() {

    return (
      <SideMenu
        openMenuOffset
        ={Dimensions
        .get('window')
        .width * (3 / 4)}
        isOpen={false}
        menu={<Menu />}>
        <Router>
          <Scene key="root">
            <Scene
              key="loading"
              component={Loading}
              title="Loading"
              initial={false}
              hideNavBar/>
            <Scene key="signup" component={Signup} title="Sign Up" hideNavBar/>
            <Scene key="login" component={Login} title="Login" hideNavBar/>
            <Scene key="home" component={Home} title="Home" hideNavBar/>
          </Scene>
        </Router>
      </SideMenu>
    )
  }
}