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
          console.log(data);
      });
    },
  }),
});
export default reduxForm({
  form: 'signup',
})(signGraphql(signup));