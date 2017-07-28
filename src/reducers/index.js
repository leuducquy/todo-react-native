import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {reducer as formReducer} from 'redux-form'; // ES6
import login from "./login";
import token from "./token";
import todos from "./todos";
export const rootReducer = combineReducers({form: formReducer, login, token, todos});