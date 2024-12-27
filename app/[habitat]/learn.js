import { useGlobalSearchParams } from "expo-router";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import * as Speech from "expo-speech";

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
    { name: "pollet", image: require("../../assets/images/pollet.jpg") },
  ],
  "Animals de bosc": [
    { name: "os", image: require("../../assets/images/os.jpg") },
    { name: "ren", image: require("../../assets/images/ren.jpg") },
    { name: "guineu", image: require("../../assets/images/guineu.jpg") },
    { name: "esquirol", image: require("../../assets/images/esquirol.jpg") },
  ],
  "Animals de jungla": [
    { name: "elefant", image: require("../../assets/images/elefant.jpg") },
    { name: "tigre", image: require("../../assets/images/tigre.jpg") },
    { name: "tucà", image: require("../../assets/images/tuca.jpg") },
    { name: "lemur", image: require("../../assets/images/lemur.jpg") },
    { name: "mico", image: require("../../assets/images/mico.jpg") },
    { name: "lleó", image: require("../../assets/images/lleo.jpg") },
    { name: "cocodril", image: require("../../assets/images/cocodril.jpg") },
    { name: "serp", image: require("../../assets/images/serp.jpg") },
    { name: "pantera negra", image: require("../../assets/images/panteranegra.jpg") },
    { name: "girafa", image: require("../../assets/images/girafa.jpg") },
  ],
};

export default function LearnGame() {
  const { habitat } = useGlobalSearchParams(); // Retrieve the selected habitat
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get the current habitat's animal list
  const animalList = animals[habitat];
  const currentAnimal = animalList ? animalList[currentIndex] : null;

  const nextAnimal = () => {
    const nextIndex = (currentIndex + 1) % animalList.length;
    setCurrentIndex(nextIndex);
  };

  const speakAnimalName = () => {
    if (currentAnimal) {
      Speech.speak(currentAnimal.name, { language: "ca-ES" }); // Catalan pronunciation
    }
  };

  if (!currentAnimal) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No animals found for this habitat</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estàs aprenent: {habitat}</Text>
      <View style={styles.imageContainer}>
        <Image source={currentAnimal.image} style={styles.image} resizeMode="contain" />
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
  answer: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6F61",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF6F61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
