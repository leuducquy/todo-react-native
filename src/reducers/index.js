import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { reducer as formReducer } from 'redux-form';  // ES6
import {AsyncStorage} from 'react-native';
import login from "./login";
import token from "./token";
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';



async function getToken() {
  try {
  const value = await AsyncStorage.getItem('@rntodo:token');
  if (value !== null){
    // We have data!!
    console.log(value);
    return value;
  }
} catch (error) {
  return "";
}
}
const wsClient = new SubscriptionClient(`ws://localhost:5000/`, {
    reconnect: true,
    connectionParams: {
        // Pass any arguments you want for initialization
    }
});
const networkInterface = createNetworkInterface({ uri: 'http://localhost:3000/graphql' });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    next();
    // AsyncStorage.getItem('@rntodo:token')
    //   .then(myToken => {
    //     console.log(myToken);
    //      req.options.headers.authorization = myToken;
    //   })
    //   .then(next)  // call next() after authorization header is set.
    //   .catch(err => console.log(err)); 
  },
}]);
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);
export const client = new ApolloClient({
  networkInterface : networkInterfaceWithSubscriptions
});
export const rootReducer = combineReducers({
  apollo: client.reducer(),
  form :formReducer,
  login,
  token,
});