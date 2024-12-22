import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function App() {
  // List of animals with their Catalan names and image sources
  const animals = [
    { name: 'gat', image: require('../../assets/images/gat.jpg') },
    { name: 'gos', image: require('../../assets/images/gos.jpg') },
    { name: 'cavall', image: require('../../assets/images/cavall.jpg') },
    { name: 'peix', image: require('../../assets/images/peix.jpg') },
    { name: 'ocell', image: require('../../assets/images/ocell.jpg') },
  ];

  // State to track the current animal
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Handle next animal
  const nextAnimal = () => {
    setShowAnswer(false);
    setCurrentAnimal((prev) => (prev + 1) % animals.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quin animal és?</Text>
      <Image source={animals[currentAnimal].image} style={styles.image} />
      {showAnswer && <Text style={styles.answer}>{animals[currentAnimal].name}</Text>}
      <Button title="Què és això?" onPress={() => setShowAnswer(true)} />
      <Button title="Següent animal" onPress={nextAnimal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  answer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});
