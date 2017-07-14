import React , {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements'
import { Field, reduxForm, SubmissionError } from 'redux-form';

class Home extends Component {
  render() {
    return (
    <Text>Hello react native</Text>
    );
  }
}

const createTodoMutation = 
gql`mutation ($text: String!, $complete: Boolean) {
  createTodo(text: $text, complete: $complete) {
    id
  }
}`;
const createTodoGraphql = graphql(createTodoMutation, {
  props: ({ ownProps, mutate }) => ({
    createTodo(text, complete) {
      return mutate({
        variables: {
          email,
          password,
        },
      })
      .then(({ data }) => {
          console.log(data);
      });
    },
  }),
});
export default createTodoGraphql(Home);