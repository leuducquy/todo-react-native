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
import Router from './routers';
import gql from 'graphql-tag';
export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaWF0IjoxNTAwNDU5NTAzLCJleHAiOjE1MDA1NDU5MDMsImlzcyI6ImZlYXRoZXJzIn0.VufY9v-FSW04VKj-ewyEc8GZfkNyPqSRNqgxIDQ9W9g";
    // client.subscribeToMore({
    //   document: gql`
    //     subscription {
    //     viewer(token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaWF0IjoxNTAwNDU5NTAzLCJleHAiOjE1MDA1NDU5MDMsImlzcyI6ImZlYXRoZXJzIn0.VufY9v-FSW04VKj-ewyEc8GZfkNyPqSRNqgxIDQ9W9g"){
    //         todos {
    //           text,
    //           complete
    //         }
    //     }
    //   }`,
    //   variables: {},
    //   updateQuery: (prev, { subscriptionData }) => {
    //     console.log(prev);
    //         console.log(subscriptionData);
    //     // Modify your store and return new state with the new arrived data
    //   }
    // });
  }
  render() {
    return (
      <ApolloProvider client={client} store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <Router />
        </View>
      </ApolloProvider>
    );
  }
}