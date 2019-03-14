import React, {Component} from 'react';
import { Text, View, StyleSheet, Button, ScrollView, AsyncStorage, Alert} from 'react-native';
import t from 'tcomb-form-native';
import MapView from "react-native-maps";
import { NavigationActions } from 'react-navigation';



const Form = t.form.Form;

const RegActivity = t.struct({
  title: t.String,
  description: t.String,
});


const formOptions = {
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




class EditReg extends Component {

    constructor(props) {
      super(props);

      this.FormValue = {
        title: this.props.navigation.state.params.title,
        description: this.props.navigation.state.params.description,
      };

      this.mapViewItem = {
        latitude: this.props.navigation.state.params.latitude,
        longitude: this.props.navigation.state.params.longitude,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0421
      };

      this.state = {};

      this.IfAlert = this.IfAlert.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);

      console.log(this);


   }

   componentDidMount() {
   }

   handleUpdate(){

      console.log(this);

      let value = this._form.getValue(); // use that ref to get the form value
      console.log('value: ', value);


      this.IfAlert("¡Actualizar!",
      "¡Esto cambiara los valores del registro!",
      ()=>{
        console.log("edit")

      },
      ()=>{console.log("cancel")});

      console.log("update submit");
   }

   handleDelete(){
     console.log("Delete");

     this.IfAlert("!Eliminar¡",
     "!Esto cambiara los valores del registro¡",
     ()=>{
       console.log("delete")

     },
     ()=>{console.log("cancel")});

   }

   IfAlert(title,message,yesFunction,NotFunction){
     Alert.alert(
      title,
      message,
      [
        {
         text:"¿Continuar?",
         onPress:()=>{yesFunction()}
        },
        {
          text: 'Cancelar',
          onPress:()=>{NotFunction()} ,
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
   }


   render () {
     return (
       <View style={styles.formContainer}>
         <Form ref={c => this._form = c} type={RegActivity} options={formOptions}  value={this.FormValue} />
         <Button
           title="!Actualizar Actividad¡"
           onPress={this.handleUpdate}
         />
         <MapView
            initialRegion={this.mapViewItem}
            style={styles.map}
          >
            <MapView.Marker
               coordinate={{latitude: this.props.navigation.state.params.latitude,
               longitude: this.props.navigation.state.params.longitude}}
               title={this.props.navigation.state.params.title}
               description={this.props.navigation.state.params.description}>
            </MapView.Marker>
          </MapView>
          <Button
            title="Eliminar Actividad"
            onPress={this.handleDelete}
            color='#c2343c'
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

export default EditReg;
