import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const animals = {
    "Farm Animals": [
      { name: 'vaca', image: require('../../assets/images/vaca.jpg') },
      { name: 'gallina', image: require('../../assets/images/gallina.jpg') },
      { name: 'porc', image: require('../../assets/images/porc.jpg') },
    ],
    "Wild Animals": [
      { name: 'os', image: require('../../assets/images/os.jpg') },
      { name: 'ren', image: require('../../assets/images/ren.jpg') },
      { name: 'guineu', image: require('../../assets/images/guineu.jpg') },
    ],
    Pets: [
      { name: 'gat', image: require('../../assets/images/gat.jpg') },
      { name: 'gos', image: require('../../assets/images/gos.jpg') },
      { name: 'conill', image: require('../../assets/images/conill.jpg') },
    ],
  };

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const startCategory = (category) => {
    setCurrentCategory(category);
    setCurrentAnimalIndex(0);
    setScore(0);
    setShowAnswer(false);
  };

  const nextAnimal = () => {
    setShowAnswer(false);
    const animalList = animals[currentCategory];
    const nextIndex = currentAnimalIndex + 1;
    if (nextIndex < animalList.length) {
      setCurrentAnimalIndex(nextIndex);
    } else {
      alert(`Game over! Your score: ${score}`);
      setCurrentCategory(null);
    }
  };

  const revealAnswer = () => {
    setShowAnswer(true);
    setScore(score + 1); // Add 1 point for revealing the answer
  };

  return (
    <View style={styles.container}>
      {!currentCategory ? (
        <View>
          <Text style={styles.title}>Select a Category</Text>
          {Object.keys(animals).map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.button}
              onPress={() => startCategory(category)}
            >
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Quin animal és?</Text>
          <View style={styles.imageContainer}>
            <Image
              source={animals[currentCategory][currentAnimalIndex].image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          {showAnswer && (
            <Text style={styles.answer}>
              {animals[currentCategory][currentAnimalIndex].name}
            </Text>
          )}
          {!showAnswer && (
            <TouchableOpacity style={styles.button} onPress={revealAnswer}>
              <Text style={styles.buttonText}>Revela la resposta</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={nextAnimal}>
            <Text style={styles.buttonText}>Següent animal</Text>
          </TouchableOpacity>
          <Text style={styles.score}>Puntuació: {score}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF6F9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginBottom: 20,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  answer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFB6C1',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginTop: 20,
  },
});
