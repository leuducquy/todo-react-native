import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View,Text } from 'react-native';
class Loading extends Component {
    componentWillMount() {
        this.props.checkIfSignedIn();
    }
    render() {
        return (
            <View>
            <Text>Loading ...</Text>
            </View>
        );
    }
}
export default Loading;