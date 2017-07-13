import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
// import { Provider } from 'react-redux';
// import 'rxjs';

// import store from './store';
// import Router from './routes';

export default class AppContainer extends React.Component {
  render() {
    return (
      //   <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar />
        <Button
          raised
          icon={{ name: 'home', size: 32 }}
          buttonStyle={{ backgroundColor: 'red', borderRadius: 10 }}
          textStyle={{ textAlign: 'center' }}
          title={`Welcome to\nReact Native Elements`}
        />
      </View>
      //   </Provider>
    );
  }
}