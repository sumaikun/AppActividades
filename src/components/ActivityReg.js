import React, {Component} from 'react';
import { Text, View, StyleSheet, Button, ScrollView, AsyncStorage, Alert} from 'react-native';
import t from 'tcomb-form-native';
import MapView from "react-native-maps";




/*
Ejemplo de conexión entre vistas por medio de navigate

<View style={styles.container}>
  <View>
    <Text>Main</Text>
  </View>
  <View>
    <Button onPress={() => this.props.navigation.navigate("Detail")} title="Detail Page" />
  </View>
  <View style={{top:50}}>
    <Button onPress={() => this.props.navigation.openDrawer()} color="orange" title="Demo open drawer" />
  </View>
</View>

*/


let initialRegionWithMarker = null;

const Form = t.form.Form;

/*const User = t.struct({
  email: t.String,
  username: t.maybe(t.String),
  password: t.String,
  terms: t.Boolean
});*/

const RegActivity = t.struct({
  title: t.String,
  description: t.String,
});


const options = {
  fields: {
    title: {
      label: 'Titulo de la actividad',
    },
    description:
    {
         multiline: true,
         stylesheet: {
           ...Form.stylesheet,
           textbox: {
             ...Form.stylesheet.textbox,
             normal: {
               ...Form.stylesheet.textbox.normal,
               height: 150,
               textAlignVertical: 'top',
             },
             error: {
               ...Form.stylesheet.textbox.error,
               height: 200,
             },
           },
         },
     },
  },
};




class ActivityReg extends Component {

  constructor() {
    super();

    this.state = {
      lastLat: '',
      lastLong: '',
      loading:true,
      username:'',
      formValue:null,
      preloadingText:"...Cargando",
    }



    //this.titleRef = React.createRef();
    //this.descriptionRef = React.createRef();

    //console.log("I was constructed to geolocation");

    this.handleSubmit = this.handleSubmit.bind(this);

     //{c => this._form = c}
  }

  handleSubmit(){
    let value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    if(value != null)
    {
      const registryObject =
       {
         longitude:this.state.lastLong,
         latitude:this.state.lastLat,
         title:value.title,
         description:value.description,
         username:this.state.username
       };

       console.log(registryObject);

       let self = this;

       //console.log(self);

       let request = fetch("http://10.0.2.2:5000/sigtest-1a06d/us-central1/RegActivityDemo", {
              method: "POST",
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(registryObject)
        });

        request.then(function(res){
            console.log(res);
            response = JSON.parse(res._bodyText);
            if(response.status == "Error")
            {
              Alert.alert( response.message, '!Presiona para continuar!');
            }
            if(response.status == "Success")
            {
                Alert.alert( response.message, '!Presiona para continuar!');
                //Clear the form
                self.setState({
                    formValue:null,
                });
            }

        });
        request.catch(function(err){
          console.log(err);
          Alert.alert("Sucedio un error en la conexión",'!Presiona para continuar!');
          preloadingText = "Sucedio un error, ¡Verifique si le dio permiso a la app para acceder al gps!";
        });

    }
  }

  componentDidMount() {

    AsyncStorage.getItem('user_session').then((user_session) => {
      console.log(user_session);
      this.setState({ username: user_session })
      //this.setState({ username: user_session !== null })
      this.CurrentPositionMap();
    });

  }

  CurrentPositionMap(){

    navigator.geolocation.getCurrentPosition((position) => {

        console.log(position);

        this.setState({
            lastLat:position.coords.latitude,
            lastLong:position.coords.longitude,
        });

        console.log(this.state.lastLat);

        initialRegionWithMarker = <MapView
           initialRegion={{
             latitude: this.state.lastLat,
             longitude: this.state.lastLong,
             latitudeDelta: 0.0622,
             longitudeDelta: 0.0421
           }}
           style={styles.map}
         >
           <MapView.Marker
              coordinate={{latitude: this.state.lastLat,
              longitude: this.state.lastLong}}
              title={"title"}
              description={"description"}>
           </MapView.Marker>
         </MapView>;

         //render();

         this.setState({
             loading:false,
         });

      }, (error) => {
        this.state.preloadingText = "Ha sucedido un error";
        Alert.alert( '!Sucedio un error al desplegar el mapa!', '!Presiona para continuar!');
        console.log(JSON.stringify(error));
        this.CurrentPositionMap();
      },{
        //gps settings
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 10000
      });

  }

  render () {
    //console.log('render method');
    if(this.state.loading) {
         return (
           <View style={styles.container}>
            <Text>{this.state.preloadingText}</Text>
           </View>
         );
    }
    return (
      <View style={styles.formContainer}>
        <Form ref={c => this._form = c} type={RegActivity}  options={options} value={this.state.formValue} />
        {initialRegionWithMarker}
         <Button
          title="!Registrar Actividad¡"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  formContainer: {
    justifyContent: 'center',
    marginTop: 0,
    padding: "5%",
    backgroundColor: '#ffffff',
  },
  map: {
    width: "100%",
    height: "45%",
  }
});

export default ActivityReg;
