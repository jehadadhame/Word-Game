import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getGameScores } from '../utils/storage';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const retrievedScores = await getGameScores();
      const sortedScores = retrievedScores.sort((a, b) => a.finish_time - b.finish_time);
      setScores(sortedScores);
    };
    fetchScores();
  }, []);

  const renderScoreItem = ({ item, index }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.finishTime}>Time: {item.finish_time} sec</Text>
      <Text style={styles.words}>Words: {item.words.join(', ')}</Text>
      <Text style={styles.date}>Date: {new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {scores.length > 0 ? (
        <FlatList
          data={scores}
          renderItem={renderScoreItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noScoresText}>No scores available!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  scoreItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  finishTime: {
    fontSize: 16,
    color: '#666',
  },
  words: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  noScoresText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
});

export default Leaderboard;
