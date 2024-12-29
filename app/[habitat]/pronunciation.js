import { useRouter, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Speech from "expo-speech";
import Voice from "@react-native-voice/voice"; // For speech recognition

const animals = {
  "Casa": [
    { name: "gat", image: require("../../assets/images/gat.jpg") },
    { name: "gos", image: require("../../assets/images/gos.jpg") },
    { name: "conill", image: require("../../assets/images/conill.jpg") },
    { name: "ocell", image: require("../../assets/images/ocell.jpg") },
  ],
  "Granja": [
    { name: "vaca", image: require("../../assets/images/vaca.jpg") },
    { name: "gallina", image: require("../../assets/images/gallina.jpg") },
    { name: "porc", image: require("../../assets/images/porc.jpg") },
    { name: "ovella", image: require("../../assets/images/ovella.jpg") },
    { name: "pollet", image: require("../../assets/images/pollet.jpg") },
  ],
  "Bosc": [
    { name: "os", image: require("../../assets/images/os.jpg") },
    { name: "ren", image: require("../../assets/images/ren.jpg") },
    { name: "guineu", image: require("../../assets/images/guineu.jpg") },
    { name: "esquirol", image: require("../../assets/images/esquirol.jpg") },
  ],
  "Jungla": [
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

export default function PronunciationGame({ route, navigation }) {
  const { habitat } = useGlobalSearchParams(); // Retrieve habitat from params
  const animalList = animals[habitat];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const currentAnimal = animalList[currentIndex];

  // Start Speech Recognition
  const startListening = () => {
    setIsListening(true);
    Voice.start("ca-ES"); // Start listening in Catalan
  };

  // Stop Speech Recognition and process results
  const stopListening = () => {
    Voice.stop();
    setIsListening(false);
  };

  // Process recognized words
  const onSpeechResults = (event) => {
    const spokenText = event.value[0]?.toLowerCase();
    if (spokenText === currentAnimal.name.toLowerCase()) {
      Alert.alert("Correcte!", `Has dit "${spokenText}" correctament! 🎉`, [
        {
          text: "Següent",
          onPress: nextAnimal,
        },
      ]);
    } else {
      Alert.alert(
        "Incorrecte",
        `Has dit "${spokenText}". Torna-ho a intentar!`,
        [
          {
            text: "Intenta de nou",
          },
        ]
      );
    }
  };

  // Proceed to next animal
  const nextAnimal = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < animalList.length) {
      setCurrentIndex(nextIndex);
    } else {
      Alert.alert("Felicitats!", "Has completat el joc!", [
        {
          text: "Torna als jocs",
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  // Text-to-Speech: Play the current animal's name
  const speakAnimalName = () => {
    Speech.speak(currentAnimal.name, { language: "ca-ES" });
  };

  // Initialize Voice recognition listeners
  React.useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronuncia l'animal</Text>
      <Image
        source={currentAnimal.image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{currentAnimal.name}</Text>
      <TouchableOpacity style={styles.button} onPress={speakAnimalName}>
        <Text style={styles.buttonText}>Escolta el nom</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, isListening && styles.listening]}
        onPress={isListening ? stopListening : startListening}
      >
        <Text style={styles.buttonText}>
          {isListening ? "Parant..." : "Parla"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6F61",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFB6C1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
  },
  listening: {
    backgroundColor: "#FF6F61",
  },
});
