import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Photo App',
    headerTintColor: 'white',
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1 
    },
    headerStyle: {
      backgroundColor: 'black'
    }
  }
    render() {
        return (
            <View style={styles.container}>
            {(this.props.navigation.getParam('username'))
              ? <Text style={styles.text}>Hello {this.props.navigation.getParam('username')}!</Text>
              : <Text style={styles.text}>Hello!</Text>}
                <Ionicons name='md-camera' size={100}/>
                <TouchableOpacity style={styles.button} activeOpacity={.7}
                    onPress={() => this.props.navigation.navigate('Camera')}>
                    <Text style={styles.buttonText}>Take a photo</Text>
                </TouchableOpacity>
                <Ionicons name='md-image' size={100}/>
                <TouchableOpacity style={styles.button} activeOpacity={.7}
                    onPress={() => this.props.navigation.navigate('Gallery')}>
                    <Text style={styles.buttonText}>Show gallery</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#f5958e',
    elevation: 2,
    height: 60,
    width: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 20,
  },
  buttonText: {
    fontSize: 20, 
    color: 'white', 
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
