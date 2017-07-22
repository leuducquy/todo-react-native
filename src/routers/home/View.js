import React, { Component } from 'react';
import { View } from 'react-native';
import TodoForm from './components/TodoForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import TodoItem from './components/TodoItem';
import {
  Button,
  ListItem,
  List,
  Card,
  Icon,
  Grid,
  Col
} from "react-native-elements";
import { FlatList, ScrollView, Text } from 'react-native';
let setTodoState = false;
class Home extends Component {

  componentDidMount() {
    this.props.subscribeToNewTodos();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.viewer.viewer && nextProps.viewer.viewer.todos && !setTodoState) {
      setTodoState = true;
      nextProps.setTodos(nextProps.viewer.viewer.todos);
    }
  }
  render() {
     console.log(this.props.viewer.error);
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
                id= {item.id}
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
  todoChanges {
    op
    todo {
      id
      text
      complete
      }
  }
}
`;
const viewerQuery = gql`
query($token : String!) {
  viewer(token:$token){
    todos {
      text
      complete
      id
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
            const {op, todo} = subscriptionData.data.todoChanges;
            if(op === 'created') {
             props.ownProps.addTodo(todo);
            }else if(op === 'deleted'){
                props.ownProps.deleteTodo(todo.id);
            }
          
            return prev;
          }
        });
      }
    };
  },
});

export default getViewer(Home);