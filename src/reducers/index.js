import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { reducer as formReducer } from 'redux-form';  // ES6
import {AsyncStorage} from 'react-native';
import Login from "./login";
const networkInterface = createNetworkInterface({ uri: 'http://localhost:3030/graphql' });
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
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    AsyncStorage.getItem('@rntodo:token')
      .then(myToken => {
        console.log(myToken);
         req.options.headers.authorization = myToken;
      })
      .then(next)  // call next() after authorization header is set.
      .catch(err => console.log(err)); 
  },
}]);
export const client = new ApolloClient({
  networkInterface,
});
export const rootReducer = combineReducers({
  apollo: client.reducer(),
  form :formReducer,
  Login
});