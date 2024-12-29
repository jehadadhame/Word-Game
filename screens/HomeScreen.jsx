import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getCurrentLevel, saveCurrentLevel } from '../utils/storage'
import { RouteName } from '../constants/routeName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import words_level from '../final_word.json';

const HomeScreen = ({ navigation }) => {
  const [level, setLevel] = useState(0)

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const storedLevel = await AsyncStorage.getItem("currentLevel");
        if (storedLevel !== null) {
          setLevel(parseInt(storedLevel, 10));
        }
      } catch (error) {
        console.error("Failed to fetch level from storage:", error);
      }
    };

    fetchLevel();
  })
  const get_level_words = () => {
    words = decode
    return
  }
  console.log(typeof (navigation));
  return (
    <View style={styles.container}>
      <Text >level : {level}</Text>
      <Text style={styles.title}>Welcome to the Word Game!</Text>
      <Button
        title="Start Game"
        onPress={() =>
          navigation.navigate(RouteName.GameScreen, {
            words: get_level_words(),
          })
        }
      />
      <Button
        title="Leaderboard"
        onPress={() => navigation.navigate(RouteName.LeaderboardScreen)}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title="back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;

