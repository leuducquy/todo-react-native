import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {Text} from "react-native";
const basicComp =()=> (<Text>Hi</Text>)
export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={Login} title="Login" hideNavBar/>
          <Scene key="signup" component={Signup} title="Sign Up" initial={true} hideNavBar/>
        </Scene>
      </Router>
    )
  }
}