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
  Casa: [
    { name: "gat", image: require("../../assets/images/gat.jpg") },
    { name: "gos", image: require("../../assets/images/gos.jpg") },
    { name: "conill", image: require("../../assets/images/conill.jpg") },
    { name: "ocell", image: require("../../assets/images/ocell.jpg") },
  ],
  // Add other categories here...
};

export default function PronunciationGame({ route, navigation }) {
  const { habitat } = route.params; // Retrieve habitat from params
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
