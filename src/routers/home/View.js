import React, { Component } from 'react';
import { View } from 'react-native';
import TodoForm from './components/TodoForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import TodoItem from './components/TodoItem';
import App from '../../'
import {
  Button,
  ListItem,
  List,
  Card,
  Icon,
  Grid,
  Col,
  SideMenu
} from "react-native-elements";
import { FlatList, ScrollView, Text } from 'react-native';
let setTodoList = false;
class Home extends Component {


  componentDidMount() {
    this.props.subscribeToNewTodos();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.viewer.viewer && nextProps.viewer.viewer.todoList && !setTodoList) {
     
      
      setTodoList = true;
      this.props.setTodoList(nextProps.viewer.viewer.todoList);
      this.props.setUser({
        email: nextProps.viewer.viewer.email
      } );
    }
  }
  render() {
    return (
      <View>
        <TodoForm {...this.props} />
        <Button
          title='Go to login'
          onPress={() => Actions.login({})}
        />
        {this.props.todos &&
          <ScrollView>
            {this.props.todos.map((item, key) =>
              <TodoItem
                token={this.props.token}
                id={item.id}
                key={key}
                text={item.text}
                complete={item.complete}
              />
            )}
          </ScrollView>
        }
      </View>

    );
  }
}
const subscriptionGraphql = gql`
subscription{
  todoListChanges {
    op
    todoList {
      name
      todos {
        id 
        text
        complete
      }
      }
  }
}
`;
const viewerQuery = gql`
query($token : String!) {
  viewer(token:$token){
    email
   todoList{
     name
    todos {
      text
      complete
      id
    }
  }
  }
}
`;

const getViewer = graphql(viewerQuery, {
  name: 'viewer',
  options: ({ token }) => ({
    variables: {
      token,
    },
  }),
  props: props => {
    return {
      viewer: props.viewer,
      subscribeToNewTodos: params => {
        return props.viewer.subscribeToMore({
          document: subscriptionGraphql,
          updateQuery: (prev, { subscriptionData }) => {
            const { op, todoList } = subscriptionData.data.todoListChanges;
             if (op === 'created') {
              props.ownProps.addTodoList(todoList);
            } else if (op === 'deleted') {
              console.log('delete subctiption');

              props.ownProps.deleteTodo(todo.id);
            }
            else if (op === 'updated') {
              console.log("subcript update", todo);
              props.ownProps.updateTodo(todo);
            }
            // if (op === 'created') {
            //   props.ownProps.addTodo(todo);
            // } else if (op === 'deleted') {
            //   console.log('delete subctiption');

            //   props.ownProps.deleteTodo(todo.id);
            // }
            // else if (op === 'updated') {
            //   console.log("subcript update", todo);
            //   props.ownProps.updateTodo(todo);
            // }

            return prev;
          }
        });
      }
    };
  },
});

export default getViewer(Home);