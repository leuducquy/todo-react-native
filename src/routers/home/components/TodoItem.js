import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Icon,
  Grid,
  Col
} from "react-native-elements";
import { gql, graphql } from '../../../Constant';
import { Text } from 'react-native';

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    complete: PropTypes.boolean,
    token: PropTypes.string,
  }
  render() {
    const { text, complete, id, token } = this.props;
    return (
      <Card>
        <Grid>
          <Col size={75}>
            <Text>{text}</Text>
          </Col>
          <Col style={{ marginRight: 0 }} size={25}>
            <Icon
              name='clear'
              color='#f50'
              onPress={() => this.props.deleteTodo(id,token)} /></Col>
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
export default deleteTodoGraphql(TodoItem);
