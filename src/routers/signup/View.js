import React from 'react';
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


const passwordField = ({ input: { onChange, ...otherProps }, meta: { touched, error } }) => (
  <View>
    <FormInput onChangeText={onChange} {...otherProps} secureTextEntry />
    { touched && error &&  <FormValidationMessage>{ error }</FormValidationMessage> }
  </View>
);

const submit = ({  email='', password='' }, signUp) => {
  const errors = {
    _error: 'Login failed!'
  }

  let error = false;
  if (!email.trim()) {
    errors.email = 'Required'
    error = true;
  }
  if (!password.trim()) {
    errors.password = 'Required'
    error = true;
  }

  if (error) {
    throw new SubmissionError(errors);
  } else {
   signUp( email, password);
  }
}

const signup = ({ handleSubmit, signUp }) => (
 <View style= {{flex : 1 , justifyContent :"center" }}>
    <FormLabel>Email</FormLabel>
    <Field name='email' component={textField} />
    <FormLabel>Password</FormLabel>
    <Field name='password' component={passwordField} />
    <Button 
      title='Sign up'
      onPress={handleSubmit(values => submit(values, signUp))} />
  </View>
);
const sigupMutation = 
gql`mutation ($email: String!, $password: String!) {
  signUp(email: $email, password: $password) {
    id
  }
}`;
const signGraphql = graphql(sigupMutation, {
  props: ({ ownProps, mutate }) => ({
    signUp(email, password) {
      return mutate({
        variables: {
          email,
          password,
        },
      })
      .then(({ data }) => {
        debugger;
          console.log(data);
      });
    },
  }),
});
export default reduxForm({
  form: 'signup',
})(signGraphql(signup));