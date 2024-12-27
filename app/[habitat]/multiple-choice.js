import { useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

const animals = {
  "Animals de casa": [
    { name: "gat", image: require("../../assets/images/gat.jpg") },
    { name: "gos", image: require("../../assets/images/gos.jpg") },
    { name: "conill", image: require("../../assets/images/conill.jpg") },
    { name: "ocell", image: require("../../assets/images/ocell.jpg") },
  ],
  "Animals de granja": [
    { name: "vaca", image: require("../../assets/images/vaca.jpg") },
    { name: "gallina", image: require("../../assets/images/gallina.jpg") },
    { name: "porc", image: require("../../assets/images/porc.jpg") },
    { name: "ovella", image: require("../../assets/images/ovella.jpg") },
  ],
  "Animals de bosc": [
    { name: "os", image: require("../../assets/images/os.jpg") },
    { name: "guineu", image: require("../../assets/images/guineu.jpg") },
    { name: "ren", image: require("../../assets/images/ren.jpg") },
    { name: "esquirol", image: require("../../assets/images/esquirol.jpg") },
  ],
  "Animals de jungla": [
    { name: "elefant", image: require("../../assets/images/elefant.jpg") },
    { name: "tigre", image: require("../../assets/images/tigre.jpg") },
    { name: "cocodril", image: require("../../assets/images/cocodril.jpg") },
    { name: "lleó", image: require("../../assets/images/lleo.jpg") },
  ],
};

export default function MultipleChoiceGame() {
  const { habitat } = useGlobalSearchParams(); // Get the selected habitat
  const animalList = animals[habitat];
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState(generateOptions());

  function generateOptions() {
    const correctAnimal = animalList[currentAnimalIndex];
    const allOptions = [correctAnimal.name];
    while (allOptions.length < 4) {
      const randomAnimal =
        animalList[Math.floor(Math.random() * animalList.length)];
      if (!allOptions.includes(randomAnimal.name)) {
        allOptions.push(randomAnimal.name);
      }
    }
    return allOptions.sort(() => Math.random() - 0.5); // Shuffle options
  }

  function handleAnswer(selectedOption) {
    const correctAnimal = animalList[currentAnimalIndex];
    if (selectedOption === correctAnimal.name) {
      setScore(score + 1);
      Alert.alert("Correcte!", `La resposta és: ${correctAnimal.name}`);
    } else {
      Alert.alert("Incorrecte", `Era: ${correctAnimal.name}`);
    }

    const nextIndex = currentAnimalIndex + 1;
    if (nextIndex < animalList.length) {
      setCurrentAnimalIndex(nextIndex);
      setOptions(generateOptions());
    } else {
      Alert.alert("Fi del joc!", `Has encertat ${score + 1} de ${animalList.length} animals.`);
      setCurrentAnimalIndex(0);
      setScore(0);
      setOptions(generateOptions());
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quin animal és?</Text>
      <View style={styles.imageContainer}>
        <Image
          source={animalList[currentAnimalIndex].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.score}>Puntuació: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF6F9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6F61",
    marginBottom: 20,
  },
  imageContainer: {
    width: 250,
    height: 250,
    marginBottom: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#FF6F61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
  },
  score: {
    fontSize: 20,
    color: "#FF6F61",
    marginTop: 20,
  },
});
