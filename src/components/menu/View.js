import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,Text } from 'react-native';
import { Button, ListItem, List } from "react-native-elements";
import { Actions } from 'react-native-router-flux';
export default class Menu extends Component {

  render() {
    console.log('props menu',this.props);
    
   let email  = '';
   if(this.props.user && this.props.user.email){
    email  = this.props.user.email;
   }
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
            title={<Text>{email}</Text>}
           />
          <ListItem
          key = {
            -3
          }
          title = 'Logout'
          onPress = {
            () => {
              this.props.logout();
            }
          }
          />
        </List>
      </View>
    );
  }
}


