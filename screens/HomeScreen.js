import React from 'react';
import { Button, Image, TouchableOpacity, Icon, StyleSheet, Text, View } from 'react-native';
import * as Facebook from 'expo-facebook';
import { FontAwesome } from '@expo/vector-icons';

const idFB = '2460846114195049';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Photo App',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'blue'
    }
  }

  loginFB = async () => {
      try {
        const {
          type,
          token
        } = await Facebook.logInWithReadPermissionsAsync(idFB, {
          permissions: ['public_profile'],
        });
        if (type === 'success') {
          alert('Login successful!');
          let username = "MS";
          this.props.navigation.navigate("Main", {
            username: username,
          } ); // send username to next screen
        } else {
          alert('Login not successful.');
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }
  
  render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome to Photo App!</Text>
                <Image
                  source={require('../assets/camera_icon.png')}
                  style={{width: 200, height: 150, marginTop: 40, marginBottom: 60}}
                />            
                <FontAwesome.Button name="facebook" onPress={() => this.loginFB()}>
                    Login with Facebook
                </FontAwesome.Button>
      
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Main')}>
                   <Text style={styles.buttonText}>Continue without login</Text>
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
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
  },
  fbButton: {
    height: 40,
    width:160,
    borderRadius:10,
    backgroundColor : "yellow",
    marginLeft :50,
    marginRight:50,
    marginTop :20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
