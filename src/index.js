import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Button } from "react-native-elements";
import 'rxjs';
import { client } from './reducers/index';
import { ApolloProvider } from 'react-apollo';
import store from './store';
import Router from './routes';

export default class AppContainer extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <View style={{ flex: 1 }}>
        <StatusBar />
       <Router />
      </View>
      </ApolloProvider>
    );
  }
}