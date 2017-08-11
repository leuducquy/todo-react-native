import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {reducer as formReducer} from 'redux-form'; // ES6
import login from "./login";
import token from "./token";
import todos from "./todos";
import isOpen from "./sidemenu";
import user from "./user";
import todoList from "./todoList";
export const rootReducer = combineReducers({form: formReducer, login, token, user,todos,isOpen,todoList});