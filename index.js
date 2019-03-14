/** @format */

/*import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);*/

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
import {name as appName} from './app.json';
import Main from './src/components/Main';


export default class loginAnimation extends Component<Props> {
  render() {
    return (
        <View style={styles.container}>
            <Main/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#F5FCFF",
  }
});

AppRegistry.registerComponent(appName,() => loginAnimation);
