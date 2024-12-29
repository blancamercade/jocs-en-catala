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
  Granja: [
    { name: "vaca", image: require("../../assets/images/vaca.jpg") },
    { name: "gallina", image: require("../../assets/images/gallina.jpg") },
    { name: "porc", image: require("../../assets/images/porc.jpg") },
    { name: "ovella", image: require("../../assets/images/ovella.jpg") },
    { name: "pollet", image: require("../../assets/images/pollet.jpg") },
  ],
  Bosc: [
    { name: "os", image: require("../../assets/images/os.jpg") },
    { name: "ren", image: require("../../assets/images/ren.jpg") },
    { name: "guineu", image: require("../../assets/images/guineu.jpg") },
    { name: "esquirol", image: require("../../assets/images/esquirol.jpg") },
  ],
  Jungla: [
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

export default function PronunciationGame() {
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
      Alert.alert("Error", `Error starting listening: ${error.message}`);
      setIsListening(false);
    }
  };

  // Stop Speech Recognition
  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      Alert.alert("Error", `Error stopping listening: ${error.message}`);
    }
  };

  // Process recognized words
  const onSpeechResults = (event) => {
    const spokenWord = event.value ? event.value[0].toLowerCase() : "";
    setSpokenText(spokenWord);

    const isCorrect = spokenWord === currentAnimal.name.toLowerCase();
    Speech.speak(
      isCorrect
        ? `Correcte! Has pronunciat ${currentAnimal.name} correctament!`
        : `Incorrecte! La resposta correcta és ${currentAnimal.name}.`,
      { language: "ca-ES" }
    );

    setTimeout(() => {
      if (isCorrect) nextAnimal();
    }, 2000);
  };

  // Initialize Voice recognition listeners
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = (error) => {
      Alert.alert("Error", `Speech recognition error: ${error.message}`);
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
          Has dit: {spokenText}.
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
