import React from "react";
import { Alert, Image, TouchableOpacity, StyleSheet, Text, View} from "react-native";
import * as Facebook from "expo-facebook";
import { FontAwesome } from "@expo/vector-icons";

const idFB = '2460846114195049';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Photo App',
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'black'
    }
  };

  loginFB = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        idFB,
        {
          permissions: ["public_profile"]
        }
      );
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=name`
        );
        const json = await response.json();
        let username = json.name;
        Alert.alert('Login successful!');
        this.props.navigation.navigate('Main', {
          username: username
        });
      } else {
        Alert.alert('Login not successful.');
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Photo App!</Text>
        <Image
          source={require('../assets/camera_icon.png')}
          style={{ width: 200, height: 150, marginTop: 40, marginBottom: 60 }}
        />
        <FontAwesome.Button
          name='facebook'
          backgroundColor='#3b5998'
          size={40}
          onPress={() => this.loginFB()}
        >
          <Text style={styles.buttonFBtext}>Login with Facebook</Text>
        </FontAwesome.Button>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>Continue without login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 40
  },
  button: {
    marginTop: 20
  },
  buttonFBtext: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  buttonText: {
    fontSize: 18,
    textDecorationLine: 'underline'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
