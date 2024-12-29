import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../constants/storage';

const CURENT_LEVEL = 'currentLevel';
const USER_NAME = 'userNamee';
const Game_Score = 'gameScore';

export const saveUserName = async (name) => {
    try {
        await AsyncStorage.setItem(USER_NAME, name);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const getUserName = async () => {
    try {
        return await AsyncStorage.getItem(USER_NAME);
    } catch (e) {
        console.log(e);
    }
}

export const saveCurrentLevel = async (level) => {
    try {
        await AsyncStorage.setItem(CURENT_LEVEL, level)
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const increaseCurrentLevel = async () => {
    try {
        level = await getCurrentLevel()
        await AsyncStorage.setItem(CURENT_LEVEL, level)
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getCurrentLevel = async () => {
    try {
        return await AsyncStorage.getItem(CURENT_LEVEL);
    } catch (e) {
        console.log(e)
        return false;
    }
}



export const saveGameScore = async (finish_time, words) => {
    try {
        let gameScores = await AsyncStorage.getItem(Game_Score);
        gameScores = gameScores ? JSON.parse(gameScores) : [];
        const newScore = {
            finish_time: finish_time,
            words: words,
            date: new Date().toISOString(),
        };
        gameScores.push(newScore);
        await AsyncStorage.setItem(Game_Score, JSON.stringify(gameScores));

        return true;
    } catch (e) {
        console.log('Error saving game score:', e);
        return false;
    }
};


export const getGameScores = async () => {
    try {
        const gameScores = await AsyncStorage.getItem(Game_Score);
        return gameScores ? JSON.parse(gameScores) : [];
    } catch (e) {
        console.log('Error retrieving game scores:', e);
        return [];
    }
};
