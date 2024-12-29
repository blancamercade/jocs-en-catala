import { useRouter, useGlobalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Speech from "expo-speech";
import Voice from "@react-native-voice/voice";

const animals = {
  Casa: [
    { name: "gat", image: require("../../assets/images/gat.jpg") },
    { name: "gos", image: require("../../assets/images/gos.jpg") },
    { name: "conill", image: require("../../assets/images/conill.jpg") },
    { name: "ocell", image: require("../../assets/images/ocell.jpg") },
  ],
  // Add other habitats...
};

export default function PronunciationGame({ route }) {
  const { habitat } = useGlobalSearchParams();
  const router = useRouter();
  const animalList = animals[habitat];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");

  const currentAnimal = animalList[currentIndex];

  // Start Speech Recognition
  const startListening = async () => {
    try {
      setIsListening(true);
      setSpokenText(""); // Reset spoken text
      await Voice.start("ca-ES"); // Start listening in Catalan
    } catch (error) {
      Alert.alert("Error", "No s'ha pogut iniciar l'escolta.");
      setIsListening(false);
    }
  };

  // Stop Speech Recognition
  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      Alert.alert("Error", "No s'ha pogut aturar l'escolta.");
    }
  };

  // Process recognized words
  const onSpeechResults = (event) => {
    const spokenWord = event.value ? event.value[0].toLowerCase() : "";
    setSpokenText(spokenWord);

    setTimeout(() => {
      const isCorrect = spokenWord === currentAnimal.name.toLowerCase();
      Speech.speak(
        isCorrect
          ? `Correcte! Has pronunciat ${currentAnimal.name} correctament!`
          : `Incorrecte! La resposta correcta és ${currentAnimal.name}.`,
        { language: "ca-ES" }
      );
    }, 1500);
  };

  // Initialize Voice recognition listeners
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = (error) => {
      Alert.alert("Error", "Hi ha hagut un problema amb l'escolta.");
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Proceed to the next animal
  const nextAnimal = () => {
    if (currentIndex < animalList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSpokenText("");
    } else {
      Alert.alert("Felicitats!", "Has completat el joc!", [
        {
          text: "Torna als jocs",
          onPress: () => router.push("/game-selection"),
        },
      ]);
    }
  };

  // Play the animal's name
  const playAnimalName = () => {
    Speech.speak(currentAnimal.name, { language: "ca-ES" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronuncia l'animal</Text>
      <Image
        source={currentAnimal.image}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} onPress={playAnimalName}>
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
      {spokenText && (
        <Text style={styles.feedback}>
          Has dit: {spokenText}. {spokenText === currentAnimal.name ? "Correcte!" : ""}
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={nextAnimal}>
        <Text style={styles.buttonText}>Següent</Text>
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
  feedback: {
    fontSize: 18,
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
});
