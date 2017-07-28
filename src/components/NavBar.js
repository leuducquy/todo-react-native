import {Dimensions, View, Text, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {Icon} from 'react-native-elements';

export default(props) => (
  <View style={styles.container}>
    <Icon style={styles.icon} name='menu'/>
    <Text style={styles.title}>MyTodos
    </Text>
  </View>
)
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#75A8F5',
    paddingTop: 20,
    width,
    flexDirection: 'row'
  }

})