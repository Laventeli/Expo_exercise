import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class MainScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.text}
                    title="Take a photo"
                />
                <Button style={styles.text}
                    title="Show gallery"
                />
                <Button style={styles.text}
                    title="Go Back"
                    onPress={() => this.props.navigation.navigate("Home")}
                />
            </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
