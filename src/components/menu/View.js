import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,Text } from 'react-native';
import { Button, ListItem, List } from "react-native-elements";
import { Actions } from 'react-native-router-flux';
import TodoListForm from './components/todoListForm';
export default class Menu extends Component {

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ededed',
          paddingTop: 50
        }}>
        <List containerStyle={{
          marginBottom: 20
        }}>
          <ListItem
            key={-2}
            title={<Text>{this.props.user.email || ''}</Text>}
           />
          <ListItem
          key = {
            -3
          }
          title = 'Logout'
          onPress = {
            () => {
              this.props.logout();
              Actions.login();
            }
          }
          />
          <ListItem
          key = {
            -4
          }
          title = 'Sign up'
          onPress = {
            () => {
              Actions.signup({});
            }
          }
          />
          <TodoListForm />
        </List>
      </View>
    );
  }
}


