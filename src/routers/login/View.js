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

const submit = ({  email='', password='' }, login) => {
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
   login( email, password);
  }
}

const loginApp = ({ handleSubmit, login }) => (
 <View style= {{flex : 1 , justifyContent :"center" }}>
    <FormLabel>Email</FormLabel>
    <Field name='email' component={textField} />
    <FormLabel>Password</FormLabel>
    <Field name='password' component={passwordField} />
    <Button 
      title='login'
      onPress={handleSubmit(values => submit(values, login))} />
  </View>
);
const loginMutation = 
gql`mutation ($email: String!, $password: String!) {
  login(email: $email, password: $password) {
   token
  }
}`;
const loginGraphql = graphql(loginMutation, {
  props: ({ ownProps, mutate }) => ({
    login(email, password) {
      return mutate({
        variables: {
          email,
          password,
        },
      })
      .then( data  => {
          ownProps.loginSucceeded(data.data.login.token);
           ownProps.addTokenToProps(data.data.login.token);
      }).catch(err =>{
         ownProps.loginFailed(data);
      });
    },
  }),
});
export default reduxForm({
  form: 'loginApp',
})(loginGraphql(loginApp));