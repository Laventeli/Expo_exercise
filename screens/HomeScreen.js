import React from 'react';
import { Button, TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';


const idFB = '2460846114195049';

export default class HomeScreen extends React.Component {
  
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
          this.props.navigation.navigate("Main"); // send username to next screen
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
                <Text>Welcome to Photo App!</Text>
                <Text style={styles.text}>Log in to continue.</Text>
                <TouchableOpacity onPress={() => this.loginFB()}>
                  <View style={styles.fbButton}>
                  <Text style={{color: 'white'}}>Login with FB</Text>
                  </View>
                </TouchableOpacity> 
                <Button 
                    title='Login without FB'
                    onPress={() => this.props.navigation.navigate("Main")}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  text: {
    margin: 20,
  },
  fbButton: {
    margin: 20,
    width: '50%',
    borderRadius: 4,
    padding: 25,
    backgroundColor: '#3b5998',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
