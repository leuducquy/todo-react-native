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

const textField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View>
    <FormInput onChangeText={onChange} {...otherProps} />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);
const submit = ({  text='' }, createTodo) => {
  const errors = {
    _error: 'Emty todo!'
  }

  let error = false;
  if (!text.trim()) {
    errors.email = 'Required'
    error = true;
  }
  

  if (error) {
    throw new SubmissionError(errors);
  } else {
   createTodo(text ,false);
  }
}
const TodoForm  = ({handleSubmit , createTodo}) => {
  return (
      <View>
      <FormLabel>Todo</FormLabel>
      <Field name='text' component={textField} />
     <Button 
      title='Create'
      onPress={handleSubmit(values => submit(values, createTodo))} />
      </View>
  );
}

const createTodoMutation = 
gql`mutation ($text : String! ,$complete : Boolean!,$token : String!) {
  createTodo(text : $text , complete :$complete,token: $token) {
    id
  }
}`;
const todoGraphql = graphql(createTodoMutation, {
  props: ({ ownProps, mutate }) => ({
    createTodo(text,complete) {
      console.log(ownProps);
      return mutate({
        variables: {
         token : ownProps.token,
         text,
         complete
         
        },
      })
      .then(({ data }) => {
          console.log(data);
      });
    },
  }),
});
export default reduxForm({
  form: 'todoForm',
})(todoGraphql(TodoForm));
