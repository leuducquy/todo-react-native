import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Icon,
  Grid,
  Col
} from "react-native-elements";
import { Text } from 'react-native';
export default class TodoItem extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    text: PropTypes.string,
    complete: PropTypes.boolean,
  };
  render() {
    const { text,complete } = this.props;
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
                onPress={() => console.log('hello')} /></Col>
          </Grid>
        </Card>
    );
  }
}



