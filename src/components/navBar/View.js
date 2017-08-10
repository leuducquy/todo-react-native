import { Dimensions, View, Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
export default class NavBar extends Component {

  static propTypes = {
    toggleSideMenu : PropTypes.func
  }
 
 
  render() {
    return (<View style={styles.container}>
      <Icon onPress={() => this.props.toggleSideMenu()} style={styles.icon} name='menu' />
      <Text style={styles.title}>MyTodos
    </Text>
    </View>)
  }

}


const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#75A8F5',
    paddingTop: 20,
    width,
    flexDirection: 'row'
  }

})