import React from 'react';
import {Text, StyleSheet, View, StatusBar} from 'react-native';
import {Button} from "react-native-elements";
import 'rxjs';
import {ApolloProvider} from 'react-apollo';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import store from './store';
import Router from './routers';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';
import {getToken,saveToken} from './helper';
import {WEBSOCKET_ENDPOINT, GRAPHQL_ENDPOINT} from './Constant';
let TOKEN = "";
const wsClient = new SubscriptionClient(WEBSOCKET_ENDPOINT, {reconnect: true});
const networkInterface = createNetworkInterface({uri: GRAPHQL_ENDPOINT});
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }
      
      req.options.headers.authorization = TOKEN;
      next();
    }
  }
]);
networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    
    if (response.status === 401) {
      saveToken('');
      Actions.login();
      
    }
    next();
  }
}]);
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);
export const client = new ApolloClient({networkInterface: networkInterfaceWithSubscriptions});

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidmount() {
    if (!this.props.token) {
      getToken().then(token => {
        TOKEN = token;
      });
    } else {
      TOKEN = this.props.token;
    }

  }
  render() {
    return (
      <ApolloProvider client={client} store={store}>
        <View style={{
          flex: 1
        }}>
          <StatusBar/>
          <Router/>
        </View>
      </ApolloProvider>
    );
  }
}