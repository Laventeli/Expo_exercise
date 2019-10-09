import React from 'react';
import { ScrollView, Image, Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class ImageScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('name'),
    headerTintColor: 'white',
    headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
    headerStyle: {
      backgroundColor: 'black'
    }
  })

    render() {
        console.log(this.props.navigation.getParam('uri'));
        return(
            <Image 
                style={{flex: 1, width: null, height: null, resizeMode:'stretch'}}
                source={{uri: this.props.navigation.getParam('uri')}}/>
        )            
    }
}


const styles = StyleSheet.create({
  text: {
    margin: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});