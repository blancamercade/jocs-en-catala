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
      {showAnswer &&
