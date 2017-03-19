import React, { Component } from 'react'
import {
  View,
  Text,
  Alert,
  Picker,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import TextField from 'react-native-md-textinput'

const dismissKeyboard = require('dismissKeyboard');

export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      seconds:'0',
      convertedNumber:0,
      format: 12,
    }
  }

  render(){
    console.log("App state: ",this.state);
    return(
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()} style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to the Seconds Conversion!
          </Text>
          <View style={styles.TextFields}>
            <TextField
            label={"Seconds"}
            highlightColor={'#00BCD4'}
            keyboardType={'numeric'}
            value={this.state.seconds}
            onChangeText={(seconds)=>this.setState({seconds:seconds})}/>
            <Picker
              style={styles.Picker}
              selectedValue={this.state.format}
              onValueChange={(format)=>this.setState({format:format})}>
              <Picker.Item label="12 Hours" value={12} />
              <Picker.Item label="24 Hours" value={24} />
            </Picker>
          </View>

          <View style={styles.Results}>
            <Text>{this.convert()}</Text>
          </View>
          <View style={styles.Credits}>
            <Text style={styles.CreditsText}>
              Made by Luis Rizo
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  convert = () => {
    var seconds = parseInt(this.state.seconds);
    console.log("Seconds: ", seconds);
    var format = this.state.format;
    var hours = 0, minutes = 0, secs = 0, days = 0;
    var convertedNumber = 0;
    while (seconds>0) {
      if (seconds >= 60) {
        minutes++;
        seconds = seconds - 60;
        if (minutes>=60) {
          hours++;
          minutes=0;
        }
        //This will add one day if these conditions are
        //met
        if (hours===format && (minutes>0 || seconds > 0) ) {
          hours = 0;
          days++;
          continue;
        }else if (hours > format) {
          days++;
          hours = 0;
          continue;
        }
      }else {
        secs = seconds;
        seconds = 0;
      }
    }

    //These 3 lines add a 0 to the number if the number is
    //Less than 2 digits.
    //This is just for presentation purposes.
    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);
    secs = ('0' + secs).slice(-2);

    //Returns the result as a string
    return days + " days " + hours + ":" + minutes + ":" + secs;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    paddingTop:50,
    backgroundColor: '#F5FCFF',
  },
  TextFields:{
    justifyContent:'flex-start',
  },
  welcome: {
    alignSelf:'center',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  Results:{
    marginTop:100,
    alignItems:'center',
    justifyContent:'flex-start',
  },
  Picker: {
    maxHeight:70,
    margin:20,
  },
  Credits:{
    alignSelf:'center',
    marginTop:80,
  },
  CreditsText:{
    fontSize:15,
  }
});





/*
Just in case I mess something up; Backup:


if (seconds<60) {
  secs = seconds;
  seconds = 0;
  continue;
}else if(seconds>=60 && seconds <=3600) { //If seconds is greater than 1 minute
  minutes++;
  seconds = seconds - 60;
  continue;
}else if (seconds>=(60*60)) { //If seconds is greater than 1 hour
  hours++;
  switch (format) {
    case 12:
      if (hours === 12 && minutes >= 60 && secs >= 60) {
        hours = 0;
        minutes = 0;
        secs = 0;
        days++;
      }else if (hours > 12) {
        hours = 0;
        days++;
      }
      break;
    case 24:
      if (hours === 24 && minutes >= 60 && secs >= 60) {
        hours = 0;
        minutes = 0;
        secs = 0;
        days++;
      }else if (hours > 24) {
        hours = 0;
        days++;
      }
    default:

  }
  seconds=seconds-(60*60);
  continue;
}


*/
