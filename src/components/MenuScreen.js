import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import StackNav from './SideMenu/StackNav.js';

import SideMenu from './SideMenu/SideMenu.js';

const Drawernav = DrawerNavigator({
  Item1: {
      screen: StackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});

export default class MenuScreen extends Component {
    render() {
      return (
          <Drawernav/>
      );
    }
}
