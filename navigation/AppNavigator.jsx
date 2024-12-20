// Import necessary libraries
// import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import Leaderboard from '../screens/Leaderboard';
import Settings from '../screens/Settings';

// Create a Stack Navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home" // Set the initial screen
                screenOptions={{
                    headerShown: false, // Hide the header for custom ones if needed
                }}
            >
                {/* Define your routes/screens here */}
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="Leaderboard" component={Leaderboard} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
