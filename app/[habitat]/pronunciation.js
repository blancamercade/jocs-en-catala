import { useRouter, useGlobalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import * as Speech from "expo-speech";
import Voice from "@react-native-voice/voice";

const requestMicrophonePermission = async () => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "This app needs access to your microphone.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // iOS
};

const animals = {
  Casa: [
    { name: "gat", image: require("../../assets/images/gat.jpg") },
    { name: "gos", image: require("../../assets/images/gos.jpg") },
    { name: "conill", image: require("../../assets/images/conill.jpg") },
    { name: "ocell", image: require("../../assets/images/ocell.jpg") },
  ],
  // Add other habitats...
};

export default function PronunciationGame() {
  const { habitat } = useGlobalSearchParams();
  const router = useRouter();
  const animalList = animals[habitat];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");

  const currentAnimal = animalList[currentIndex];

  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      const spokenWord = event.value ? event.value[0].toLowerCase() : "";
      setSpokenText(spokenWord);
      if (spokenWord === currentAnimal.name.toLowerCase()) {
        Alert.alert("Correcte!", `Has dit ${spokenWord} correctament!`);
      } else {
        Alert.alert(
          "Incorrecte",
          `Has dit ${spokenWord}. La resposta correcta és ${currentAnimal.name}.`
        );
      }
    };
    Voice.onSpeechError = (error) => {
      Alert.alert("Error", `Speech recognition error: ${error.message}`);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [currentAnimal]);

  const startListening = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      Alert.alert("Error", "Microphone permission is required.");
      return;
    }
    try {
      console.log("Starting listening...");
      setIsListening(true);
      await Voice.start("ca-ES");
    } catch (error) {
      Alert.alert("Error", `Error starting listening: ${error.message}`);
    }
  };

  const stopListening = async () => {
    try {
      console.log("Stopping listening...");
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      Alert.alert("Error", `Error stopping listening: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronuncia l'animal</Text>
      <Image
        source={currentAnimal.image}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => Speech.speak(currentAnimal.name, { language: "ca-ES" })}
      >
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
      <Text style={styles.feedback}>{spokenText && `Has dit: ${spokenText}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  image: { width: 200, height: 200, marginBottom: 20 },
  button: {
    backgroundColor: "#FFB6C1",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: { color: "#FFF", fontSize: 16 },
  listening: { backgroundColor: "#FF6F61" },
  feedback: { marginTop: 20, fontSize: 16 },
});
