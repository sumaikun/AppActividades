import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Wallpaper from './Login/Wallpaper';
import Logo from './Login/Logo';
import Form from './Login/Form';
import ButtonSubmit from './Login/ButtonSubmit';


export default class LoginScreen extends Component {


  constructor(props) {
    super();
    this.state = {
      username:"",
      password:"",
    };


    //Las referencias son para poder por medio de un puntero hacerle reset a los inputs


    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();

    console.log(this.usernameRef);

    this.ModifyLoginState = this.ModifyLoginState.bind(this);
    this.CheckLogin = this.CheckLogin.bind(this);
    this.ClearLoginForm = this.ClearLoginForm.bind(this);
  }

  ModifyLoginState(key,val) {
    console.log("En login screen "+key+"  "+val);
    this.setState({[key]: val});
  }

  ClearLoginForm(){
    console.log("Clearing Login Form");
    this.usernameRef.current.clear();
    this.passwordRef.current.clear();
  }

  CheckLogin(){

    console.log("Check login");

    let data = JSON.stringify({
      username:this.state.username,
      password:this.state.password,
    });

    console.log(data);

    let request = fetch("http://10.0.2.2:5000/sigtest-1a06d/us-central1/LoginDemo", {
           method: "POST",
           headers: {
             'content-type': 'application/json'
           },
           body: data
     });

     return request;

  }


  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form  usernameRef={this.usernameRef} passwordRef={this.passwordRef}  ModifyLoginState={this.ModifyLoginState} />
        <ButtonSubmit ClearLoginForm={this.ClearLoginForm} ModifyLoginState={this.ModifyLoginState} CheckLogin={this.CheckLogin} parent_form={this} />
      </Wallpaper>
    );
  }
}
