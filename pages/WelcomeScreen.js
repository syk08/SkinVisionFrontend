import React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity,ImageBackground } from 'react-native';
import Logo from '../pages/components/Logo';
import LoginScreen from './LoginScreen';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default function WelcomeScreen({ navigation }) {
    console.log(navigation)
  return (
    <ImageBackground
      source={require('../assets/bg_2.png')}
      resizeMode="repeat"
      style={styles.background}//resizeMode="repeat"
      
    >
    <View style={styles.container}>
      <Logo />
      <Header title="Skin-Disease Detection App" />
      <Text style={styles.welcomeText}>Welcome to SkinIFY.</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.startButtonText}>Let's Get Started!</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  
    background: {
        flex: 1,
        width:'100%',
        backgroundColor: '#fff', // Ensures the background image covers the entire screen
      },
  
  
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    //backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#4CAF50', // Change background color as needed
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    margin: 20,
  },
  title: {
    fontSize: 30, // Increase font size for better visibility
    fontWeight: 'bold',
    color: '#1689b8', // Set text color to white for better contrast
  },
  welcomeText: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
    color: '#e0dc60',
  },
  startButton: {
    backgroundColor: '#ed4c6c', // Button background color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5, // Rounded corners
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18, // Increase font size
    color: '#fff', // Set text color to white
    fontWeight: 'bold',
  },
});