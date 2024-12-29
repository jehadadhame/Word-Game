import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
} from "react-native";

const GRID_SIZE = 5; // 5x5 grid
const CELL_SIZE = Dimensions.get("window").width / GRID_SIZE; // Dynamic cell size

const LeaderboardScreen = () => {
  const [selectedCells, setSelectedCells] = useState([]); // To store the selected path
  const [word, setWord] = useState(""); // Final word formed

  const grid = Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) => String.fromCharCode(65 + row * GRID_SIZE + col))
  );

  const startCell = useRef(null); // Tracks where the gesture started
  const currentDirection = useRef(null); // Tracks the direction of selection

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // Enable responder on touch start
      onPanResponderGrant: (evt) => handleTouch(evt.nativeEvent), // Initial touch
      onPanResponderMove: (evt) => handleTouch(evt.nativeEvent), // Dragging gesture
      onPanResponderRelease: finalizeWord, // Gesture complete
    })
  ).current;

  const handleTouch = ({ locationX, locationY }) => {
    // Calculate row and column based on touch location
    const col = Math.floor(locationX / CELL_SIZE);
    const row = Math.floor(locationY / CELL_SIZE);

    // Ignore touches outside the grid
    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return;

    const cell = { row, col, letter: grid[row][col] };

    // Handle first touch
    if (!startCell.current) {
      startCell.current = cell;
      currentDirection.current = null; // Reset direction
      setSelectedCells([cell]);
      return;
    }

    // Validate direction and path
    if (validatePath(cell)) {
      setSelectedCells((prev) => {
        if (!prev.some((c) => c.row === cell.row && c.col === cell.col)) {
          return [...prev, cell];
        }
        return prev;
      });
    }
  };

  const validatePath = (cell) => {
    const { row, col } = cell;
    const lastCell = selectedCells[selectedCells.length - 1];

    // Calculate direction on first move
    if (!currentDirection.current) {
      const dRow = row - startCell.current.row;
      const dCol = col - startCell.current.col;

      if (
        (dRow === 0 && dCol !== 0) || // Horizontal
        (dCol === 0 && dRow !== 0) || // Vertical
        (Math.abs(dRow) === Math.abs(dCol)) // Diagonal
      ) {
        currentDirection.current = { dRow: Math.sign(dRow), dCol: Math.sign(dCol) };
      } else {
        return false; // Invalid direction
      }
    }

    // Validate cell is in the correct direction
    const { dRow, dCol } = currentDirection.current;
    const isValid =
      row === lastCell.row + dRow && col === lastCell.col + dCol;

    return isValid;
  };

  const finalizeWord = () => {
    const formedWord = selectedCells.map((cell) => cell.letter).join("");
    setWord(formedWord);

    // Reset state for the next selection
    startCell.current = null;
    currentDirection.current = null;
    setSelectedCells([]);
  };

  const renderGrid = () => {
    return grid.flat().map((letter, index) => {
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;
      const isSelected = selectedCells.some(
        (cell) => cell.row === row && cell.col === col
      );

      return (
        <View
          key={index}
          style={[
            styles.cell,
            isSelected && styles.selectedCell,
          ]}
        >
          <Text style={styles.cellText}>{letter}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.grid}>{renderGrid()}</View>
      <Text style={styles.wordDisplay}>Word: {word}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: CELL_SIZE * GRID_SIZE,
    backgroundColor: "#eee",
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedCell: {
    backgroundColor: "gold",
  },
  cellText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  wordDisplay: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LeaderboardScreen;
