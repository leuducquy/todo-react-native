import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
class Loading extends Component {
    componentWillMount() {
        this.props.checkIfSignedIn();
    }
    render() {
        return (
            <Text>Loading ...</Text>
        );
    }
}
export default Loading;