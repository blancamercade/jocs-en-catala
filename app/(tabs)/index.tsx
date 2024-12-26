import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

const Stack = createStackNavigator();

const animals = {
  "Animals de casa": [
    { name: 'gat', image: require('./assets/images/gat.jpg') },
    { name: 'gos', image: require('./assets/images/gos.jpg') },
    { name: 'conill', image: require('./assets/images/conill.jpg') },
    { name: 'ocell', image: require('./assets/images/ocell.jpg') },
  ],
  "Animals de granja": [
    { name: 'vaca', image: require('./assets/images/vaca.jpg') },
    { name: 'gallina', image: require('./assets/images/gallina.jpg') },
    { name: 'porc', image: require('./assets/images/porc.jpg') },
    { name: 'ovella', image: require('./assets/images/ovella.jpg') },
    { name: 'pollet', image: require('./assets/images/pollet.jpg') },
  ],
  "Animals de bosc": [
    { name: 'os', image: require('./assets/images/os.jpg') },
    { name: 'ren', image: require('./assets/images/ren.jpg') },
    { name: 'guineu', image: require('./assets/images/guineu.jpg') },
    { name: 'esquirol', image: require('./assets/images/esquirol.jpg') },
  ],
  "Animals de jungla": [
    { name: 'elefant', image: require('./assets/images/elefant.jpg') },
    { name: 'tigre', image: require('./assets/images/tigre.jpg') },
    { name: 'tucà', image: require('./assets/images/tuca.jpg') },
    { name: 'lemur', image: require('./assets/images/lemur.jpg') },
    { name: 'mico', image: require('./assets/images/mico.jpg') },
    { name: 'lleó', image: require('./assets/images/lleo.jpg') },
    { name: 'cocodril', image: require('./assets/images/cocodril.jpg') },
    { name: 'serp', image: require('./assets/images/serp.jpg') },
  ],
};

const HabitatScreen = ({ navigation }) => {
  const habitats = Object.keys(animals);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tria un hàbitat</Text>
      {habitats.map((habitat) => (
        <TouchableOpacity
          key={habitat}
          style={styles.button}
          onPress={() => navigation.navigate('GameSelection', { habitat })}
        >
          <Text style={styles.buttonText}>{habitat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const GameSelectionScreen = ({ route, navigation }) => {
  const { habitat } = route.params;
  const games = ["Learn", "Multiple Choice", "Match", "Pronunciation"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hàbitat: {habitat}</Text>
      <Text style={styles.subtitle}>Tria un joc</Text>
      {games.map((game) => (
        <TouchableOpacity
          key={game}
          style={styles.button}
          onPress={() =>
            navigation.navigate(`${game}Game`, { habitat })
          }
        >
          <Text style={styles.buttonText}>{game}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const LearnGameScreen = ({ route }) => {
  const { habitat } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentAnimal = animals[habitat][currentIndex];

  const nextAnimal = () => {
    const nextIndex = (currentIndex + 1) % animals[habitat].length;
    setCurrentIndex(nextIndex);
  };

  const speakAnimalName = () => {
    Speech.speak(currentAnimal.name, { language: 'ca-ES' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estàs aprenent: {habitat}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={currentAnimal.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.answer}>{currentAnimal.name}</Text>
      <TouchableOpacity style={styles.button} onPress={speakAnimalName}>
        <Text style={styles.buttonText}>Escolta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={nextAnimal}>
        <Text style={styles.buttonText}>Següent</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Habitat">
        <Stack.Screen name="Habitat" component={HabitatScreen} />
        <Stack.Screen name="GameSelection" component={GameSelectionScreen} />
        <Stack.Screen name="LearnGame" component={LearnGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  subtitle: {
    fontSize: 20,
    color: '#FF6F61',
    marginBottom: 15,
  },
  imageContainer: {
    width: 250,
    height: 250,
    marginBottom: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  answer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F61',
    textAlign: 'center',
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
