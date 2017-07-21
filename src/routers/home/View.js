import React, { Component } from 'react';
import { View } from 'react-native';
import TodoForm from './components/TodoForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import { Button, ListItem, List } from "react-native-elements";
import { FlastList } from 'react-native';

class Home extends Component {

  componentDidMount() {
    console.log(this.props);
    this.props.subscribeToNewTodos();
  }
  componentWillReceiveProps(nextProps) {

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
          <List>
            {
              this.props.todos.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.text}
                />
              ))
            }
          </List>
      }
      </View>

    );
  }
}
const subscriptionGraphql = gql`
subscription{
  todoAdded {
    id
    text
    complete
  }
}
`;
const viewerQuery = gql`
query($token : String!) {
  viewer(token:$token){
    todos {
      text
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
            console.log(subscriptionData);
            props.ownProps.addTodo(subscriptionData.data.todoAdded);
            return prev;
          }
        });
      }
    };
  },
});

export default getViewer(Home);