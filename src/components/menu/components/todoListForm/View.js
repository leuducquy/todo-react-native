import React, { Component } from 'react';
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
        {touched && error && <FormValidationMessage>{error}</FormValidationMessage>}
    </View>
);
const submit = ({ name = '' }, createTodoList) => {
    const errors = {
        _error: 'Emty todo!'
    }

    let error = false;
    if (!name.trim()) {
        errors.email = 'Required'
        error = true;
    }


    if (error) {
        throw new SubmissionError(errors);
    } else {
        createTodoList(name, false);
    }
}
const TodoListForm = ({ handleSubmit, createTodoList }) => {
    return (
        <View>
            <FormLabel>add TodoList</FormLabel>
            <Field name='text' component={textField} />
            <Button
                title='Create'
                onPress={handleSubmit(values => submit(values, createTodoList))} />
        </View>
    );
}

const createTodoMutation =
gql`mutation ($name: String!,$token : String!) {
  createTodoList(name : $name ,token: $token) {
    name
  }
}`;
const todoListGraphql = graphql(createTodoMutation, {
    props: ({ ownProps, mutate }) => ({
        createTodo(text, complete) {
            return mutate({
                variables: {
                    token: ownProps.token,
                    name
                },
            }).then(data => {
                console.log(data);
            })

        },
    }),
});
export default reduxForm({
    form: 'todoListForm',
})(todoListGraphql(TodoListForm));
