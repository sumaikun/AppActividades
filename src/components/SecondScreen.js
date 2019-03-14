import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import {  StyleSheet,  View,  Image,  TouchableOpacity,  Animated,  Easing,} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import { DrawerNavigator } from 'react-navigation';

import StackNav from './StackNav.js';

import SideMenu from './SideMenu.js';

import arrowImg from '../images/left-arrow.png';

const SIZE = 40;


const Drawernav = DrawerNavigator({
  Item1: {
      screen: StackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});

export default class MenuScreen extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this._onPress = this._onPress.bind(this);
    this.growAnimated = new Animated.Value(0);
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});

    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      Actions.pop();
    }, 500);
  }

  render() {
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });

    return (
        <Drawernav/>
    );
  }
}
