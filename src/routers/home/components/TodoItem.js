import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Icon,
  Grid,
  Col
} from "react-native-elements";
import { gql, graphql , compose } from '../../../Constant';
import { Text } from 'react-native';

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    complete: PropTypes.bool,
    token: PropTypes.string,
  }
  render() {
    const { text, complete, id, token } = this.props;
    let textStyle = {};
    if(complete){
      textStyle.textDecorationLine ='line-through';
    }
    return (
      <Card>
        <Grid>
          <Col
           onPress ={() => this.props.updateTodo(id,text,!complete,token)}
           size={75}>
            <Text
            style ={textStyle}
            >{text}
            </Text>
          </Col>
          <Col style={{ marginRight: 0 }} size={25}>
            <Icon
              name='clear'
              color='#f50'
              onPress={() => this.props.deleteTodo(id, token)} /></Col>
        </Grid>
      </Card>
    );
  }
}
const deleteTodoMutation =
  gql`mutation ($id: String!, $token: String!) {
  deleteTodo(id: $id, token: $token) {
   id
  }
}`;
const updateTodoMutation =
  gql`mutation ($id: String!,$text: String!, $complete: Boolean!, $token: String!) {
  updateTodo(id: $id,text : $text , complete : $complete, token: $token) {
  id
  text
  complete
  }
}`;
const deleteTodoGraphql = graphql(deleteTodoMutation, {
  props: ({ ownProps, mutate }) => ({
    deleteTodo(id, token) {
      return mutate({
        variables: {
          id,
          token,
        },
      })
        .then(data => {

        }).catch(err => {
          //  ownProps.loginFailed(err);
        });
    },
  }),
});
const updateTodoGraphql = graphql(updateTodoMutation, {
  props: ({ ownProps, mutate }) => ({
    updateTodo(id,text,complete, token) {
      return mutate({
        variables: {
          id,
          text,
          complete,
          token,
        },
      }).then(data => {
        }).catch(err => {
            console.log('update error', err);
        });
    },
  }),
});
export default compose(deleteTodoGraphql,updateTodoGraphql)(TodoItem);
