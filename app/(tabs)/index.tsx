import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const animals = [
    { name: 'gat', image: require('../../assets/images/gat.jpg') },
    { name: 'gos', image: require('../../assets/images/gos.jpg') },
    { name: 'cavall', image: require('../../assets/images/cavall.jpg') },
    { name: 'peix', image: require('../../assets/images/peix.jpg') },
    { name: 'ocell', image: require('../../assets/images/ocell.jpg') },
    { name: 'os', image: require('../../assets/images/os.jpg') },
    { name: 'ren', image: require('../../assets/images/ren.jpg') },
    { name: 'porc', image: require('../../assets/images/porc.jpg') },
    { name: 'pollet', image: require('../../assets/images/pollet.jpg') },
    { name: 'vaca', image: require('../../assets/images/vaca.jpg') },
    { name: 'ovella', image: require('../../assets/images/ovella.jpg') },
    { name: 'gallina', image: require('../../assets/images/gallina.jpg') },
    { name: 'conill', image: require('../../assets/images/conill.jpg') },
    { name: 'guineu', image: require('../../assets/images/guineu.jpg') },
    { name: 'esquirol', image: require('../../assets/images/esquirol.jpg') },
  ];

  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextAnimal = () => {
    setShowAnswer(false);
    setCurrentAnimal((prev) => (prev + 1) % animals.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quin animal és?</Text>
      <View style={styles.imageContainer}>
        <Image
          source={animals[currentAnimal].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      {showAnswer && <Text style={styles.answer}>{animals[currentAnimal].name}</Text>}
      <TouchableOpacity style={styles.button} onPress={() => setShowAnswer(true)}>
        <Text style={styles.buttonText}>QUÈ ÉS AIXÒ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={nextAnimal}>
        <Text style={styles.buttonText}>SEGÜENT ANIMAL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF6F9', // Soft pink background for a kawaii style
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
});
