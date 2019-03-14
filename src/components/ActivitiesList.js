import React, {Component} from 'react';
import {  Text,  TouchableHighlight,
  View,  StyleSheet, AsyncStorage, FlatList, TouchableOpacity, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation';

class ActivitiesList extends Component {



   constructor(){
     super();
     console.log("Activity being constructed");
     this.state = {
       userActivitiesList:[],
       loading:true,
       preloadingText:"...Cargando",
     }


  }


  GetUserActivityList(){

    let self = this;

    AsyncStorage.getItem('user_session').then((user_session) => {
      console.log(user_session);
      this.setState({ username: user_session });



      let request = fetch("http://10.0.2.2:5000/sigtest-1a06d/us-central1/GetActivitiesDemo", {
            method: "POST",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({ username: user_session })
      });

      request.then(function(res){
          console.log(res);

          let response = JSON.parse(res._bodyText);

          if(response.status == "Success")
          {
            console.log(JSON.parse(response.dataset));

            self.setState({
                loading:false,
                userActivitiesList:JSON.parse(response.dataset),
            });

            console.log(self.state.userActivitiesList);

            console.log("Try to iterate");


            // Object to array
            self.state.userActivitiesList.forEach((activity)=>{
                console.log(activity);
                //let day  = new Date(activity.time);
                //console.log(day);
                //console.log(day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate());
                //console.log(Object.keys(activity));
            });
          }
          else
          {
              Alert.alert("Ocurrio un error obteniendo los datos",'!Verifique su conexión a internet!');
          }

      });
      request.catch((err)=>{
        console.log(err);
        Alert.alert("Sucedio un error en la conexión",'!Presiona para continuar!');
        this.GetUserActivityList();
    });

    }).catch((err) => {
        console.log("Cant ger user session")
        console.log(err);
    });


  }

   componentDidMount() {
      console.log("preconfig");
      this.GetUserActivityList();
   }


   _onPress(row){
        console.log(row);

       const navigateAction =  NavigationActions.navigate({
         routeName: 'Edit',
         params:row, 
       });

       this.props.navigation.dispatch(navigateAction);
   }

   _parseDate(date){
      let day = new Date(date);
      return day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate()
   }

    render () {
      if(this.state.loading) {
           return (
             <View style={styles.container}>
              <Text>{this.state.preloadingText}</Text>
             </View>
           );
      }
      return (
        <FlatList
          data={this.state.userActivitiesList}
          renderItem={({item, separators}) => (
            <TouchableHighlight
              onPress={() => this._onPress(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={{
                backgroundColor: 'white',
                flex:1,
                justifyContent: 'center',
                height: 100,
                borderWidth: 1,
                borderColor: 'red',
               }}>
                <View  style={{alignItems:'flex-start',marginLeft:50}}>
                  <Text style={styles.userIndicatorText}>
                       {this.state.username}
                  </Text>
                  <Text style={styles.titleText}>
                       {item.title}
                  </Text>
                </View>
                <View style={{alignItems:'flex-end',marginRight:40}}>
                  <Text style={styles.dateIndicatorText}>
                      {this._parseDate(item.time)}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  titleText: {
   fontSize: 15,
   fontWeight: 'bold',
 },
  userIndicatorText: {
    fontSize: 15,
  },
  dateText: {
    fontSize: 25,
  }
});

export default ActivitiesList;
