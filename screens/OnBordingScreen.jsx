import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserName, getUserName } from '../utils/storage';
const OnBordingScreen = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const USER_KEY = 'userName';

  // Save user name to AsyncStorage
  const saveName = async (userName) => {
    saveUserName(userName)
  };

  // Load user name from AsyncStorage before the page renders
  const loadName = async () => {
    try {
      const savedName = await getUserName();
      console.log("name :", saveName);
      if (savedName) {
        setName(savedName);
        console.log('Name loaded from AsyncStorage:', savedName);
      }
    } catch (error) {
      console.error('Failed to load name:', error);
    } finally {
      setLoading(false); // Stop loading once data is loaded
    }
  };

  useEffect(() => {
    loadName(); // Load data on component mount
  }, []);

  const handleSave = () => {
    saveName(name); // Save current name to AsyncStorage
  };

  if (loading) {
    // Show a loading spinner while data is being loaded
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Save Name" onPress={handleSave} />
      {name ? <Text style={styles.result}>Hello, {name}!</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  result: {
    fontSize: 20,
    marginTop: 16,
  },
});

export default OnBordingScreen;
