import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';

import { StackNavigator } from  'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import ActivityReg from "../ActivityReg";
import EditReg from "../EditReg";
import ActivitiesList from "../ActivitiesList";

const MenuButton = (props) => {
	return (<TouchableOpacity style={{paddingRight: 10, paddingLeft: 15}} onPress={() => props.navigation.openDrawer()}>
              <IOSIcon name="ios-menu" size={30} />
        </TouchableOpacity>
)};

const stackNav = StackNavigator({
  Main : {
    screen: ActivityReg,
    navigationOptions: ({navigation}) => ({
      title: "Registro de la actividad",
      headerLeft:<MenuButton  navigation={navigation} />,
      //headerStyle: { paddingRight: 10, paddingLeft: 15 }
    })
  },
  Edit : {
    screen: EditReg,
    navigationOptions: ({navigation}) => ({
      title: "Ver/Editar actividad",
    
    })
  },
  List: {
    screen: ActivitiesList,
    navigationOptions: ({navigation}) => ({
      title: "Lista de actividades",
    })
  }
},{
 navigationOptions: {
		title: 'App',
    //navigationOptions: ({navigation}) => ({	headerLeft : <MenuButton  navigation={navigation} />})
 }
});

export default stackNav;
