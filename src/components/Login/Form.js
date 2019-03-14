import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {  StyleSheet,  KeyboardAvoidingView,  View,  ActivityIndicator,  TouchableOpacity,  Image,} from 'react-native';
import UserInput from './UserInput';
import usernameImg from '../../images/username.png';
import passwordImg from '../../images/password.png';
import eyeImg from '../../images/eye_black.png';

export default class Form extends Component{

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      username:"",
      password:"",
    };
    this.showPassword = this.showPassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  showPassword() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  handleInputChange(key,val) {
    console.log(key+"  "+val);
    this.setState({[key]: val});
  }


  render(){
  //behavior="padding"  check how to padding properly
    return (
        <KeyboardAvoidingView behaivor="padding" style={styles.container}>
          <UserInput
            source={usernameImg}
            placeholder="Username"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            onChangeText={val => this.props.ModifyLoginState('username', val)}
            refs={this.props.usernameRef}
          />
          <UserInput
            source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={val => this.props.ModifyLoginState('password', val)}
            refs={this.props.passwordRef}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPassword}>
            <Image source={eyeImg} style={styles.iconEye} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
    );

  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

console.log(DEVICE_HEIGHT);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: DEVICE_HEIGHT*0.06,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});
