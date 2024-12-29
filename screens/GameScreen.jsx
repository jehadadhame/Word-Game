import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Button, Pressable } from 'react-native';
import { place_words_on_grid } from '../utils/migrate_words';
import { saveCurrentLevel, saveGameScore } from '../utils/storage';
// to solve the issue of the grid changing on every render
import { useMemo } from 'react';

const GameScreen = ({ route, navigation }) => {
  const GAME_TIME = 5 * 60;
  const { words, level } = route.params;
  const grid = useMemo(() => place_words_on_grid(words), [words]);
  const [curen_word, setWord] = useState("");
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [correctCells, setCorrectCells] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(GAME_TIME);
  const [gameEnd, setGameEnd] = useState(false);
  console.log(words);

  const update_level = async () => {
    await saveCurrentLevel(level + 1)
  }

  const save_score = async () => {
    const finish_time = GAME_TIME - timer
    await saveGameScore(finish_time, words)
  }
  useEffect(() => {
    const handleGameEnd = async () => {
      if (gameEnd) {
        await save_score();
        await update_level();
      }
    };
    handleGameEnd();
  }, [gameEnd]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);

    if (timer <= 0) {
      alert("Time's up!");
      navigation.goBack();
    }
    return () => clearInterval(interval);
  })
  return (
    <View style={styles.container}>
      <Text>Time: {timer}</Text>
      <View style={styles.grid} >
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((letter, colIndex) => (
              <Pressable key={rowIndex + "_" + colIndex}
                onPress={() => {
                  setFeedback("");
                  setWord(curen_word + letter);
                  if (curen_word.length == 0) {
                    setSelectedCells([rowIndex + "_" + colIndex]);
                    return;
                  }
                  else {
                    let last_cell = selectedCells[selectedCells.length - 1];
                    let [last_row, last_col] = last_cell.split("_");
                    row_diff = rowIndex - parseInt(last_row);
                    col_diff = colIndex - parseInt(last_col);
                    if (row_diff >= 0 && col_diff >= 0 && row_diff <= 1 && col_diff <= 1) {
                      setSelectedCells([...selectedCells, rowIndex + "_" + colIndex]);
                    } else {
                      setSelectedCells([]);
                      setWord("");
                    }

                  }
                }}>
                <View id={rowIndex + "_" + colIndex}
                  style={
                    correctCells.includes(`${rowIndex}_${colIndex}`) ?
                      styles.correctCells
                      : selectedCells.includes(`${rowIndex}_${colIndex}`)
                        ? styles.selectedCells
                        : styles.cell
                  }>
                  <Text style={styles.cellText}>{letter}</Text>
                </View>
              </Pressable>
            ))}
          </View>

        ))}
      </View>
      {feedback !== "" && (
        <Text style={{ color: 'red' }}>{feedback}</Text>
      )}
      <Button title="Submit" onPress={() => {
        if (words.includes(curen_word.toLowerCase())) {
          setFoundWords([...foundWords, curen_word]);
          setCorrectCells([...correctCells, ...selectedCells]);
          if (foundWords.length == words.length - 1) {
            setFeedback("You have found all the words");
            setGameEnd(true)
            navigation.goBack()
          }
        } else {
          // return feedback to the user that the word is not correct
          setFeedback("The word is not correct");
        }
        setSelectedCells([]);
        setWord("");
        console.log(curen_word);
      }
      } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  grid: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 30,
    height: 30,
    margin: 2,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  selectedCells: {
    width: 30,
    height: 30,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: '#FFA500',
  },
  correctCells: {
    width: 30,
    height: 30,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: '#00FF00',
  },
  cellText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default GameScreen;