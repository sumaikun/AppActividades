import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { Keyboard, StyleSheet,  TouchableOpacity,  Text,  Animated,  Easing,  Image,  Alert,  View,  AsyncStorage} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import loading from '../../images/loading.gif';
import Toast from 'react-native-simple-toast';



const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor() {
    super();

     this.state = {
       isLoading: false,
     };

     this.buttonAnimated = new Animated.Value(0);
     this.growAnimated = new Animated.Value(0);
     this._onPress = this._onPress.bind(this);
     this._enterApp = this._enterApp.bind(this);
     this.saveItem = this.saveItem.bind(this);
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  _enterApp(){
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      Actions.menuScreen();
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);

    //Reset Form
    this.props.ModifyLoginState("username","");
    this.props.ModifyLoginState("password","");
    this.props.ClearLoginForm();

  }

  _onPress() {

   console.log("Button pressed");

   let loginrequest = this.props.CheckLogin();

   let response;

   let self = this;

   // Hide that keyboard!
   Keyboard.dismiss();

   loginrequest.then(function(res){
        console.log(res);
        response = JSON.parse(res._bodyText);
        console.log(response);
        Toast.show(response.message, Toast.LONG);
        if(response.status == "Success")
        {
          //console.log(self.props);

          //Es mejor pasar una referencia completa del objeto
            //console.log(self.props.parent_form.state.username);
          self.saveItem('user_session', self.props.parent_form.state.username)
          self._enterApp();
        }
   });
   loginrequest.catch(function(err){console.log(err);Toast.show("Sucedio un error en la conexión", Toast.LONG);});

 }



 _onGrow() {
   Animated.timing(this.growAnimated, {
     toValue: 1,
     duration: 200,
     easing: Easing.linear,
   }).start();
 }

 render() {
   const changeWidth = this.buttonAnimated.interpolate({
     inputRange: [0, 1],
     outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
   });
   const changeScale = this.growAnimated.interpolate({
     inputRange: [0, 1],
     outputRange: [1, MARGIN],
   });

     return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={loading} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
    );

  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
