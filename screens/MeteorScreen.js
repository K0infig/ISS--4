import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import axios from "axios";

export default class MeteorScreen extends React.Component{

  constructor(props){
    super(props);
    this.state={
      meteor:{}
    }
  }

  getMeteors =()=>{

    axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=8yimrXwcKIq4ggsqk7dJYbzmn6f6GYxhP51lQraa")
    .then(response =>{
        this.setState({meteor: response.data.near_earth_objects})
    })
    .catch(error =>{
        Alert.alert(error.message)
    })

  }

  componentDidMount(){
    this.getMeteors();
  }
  render(){
    if (Object.keys(this.state.meteor).length === 0) {
      return (
          <View
              style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
              }}>
              <Text>Loading...</Text>
          </View>
      )
  }
  else{
    var meteor_array = Object.keys(this.state.meteor).map(meteor_date =>{
      return this.state.meteor[meteor_date]
    })

    let meteors =[].concat.apply([],meteor_array)

    meteors.forEach(function (element) {
      let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
      let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
      element.threat_score = threatScore;
  });
    return(
      <View
              style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
              }}>
              <Text> Meteor Screen Loaded!</Text>
          </View>

    )
  }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
