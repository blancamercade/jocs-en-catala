import { useGlobalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Svg, { Line } from "react-native-svg";

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
  ],
  Bosc: [
    { name: "os", image: require("../../assets/images/os.jpg") },
    { name: "guineu", image: require("../../assets/images/guineu.jpg") },
    { name: "ren", image: require("../../assets/images/ren.jpg") },
    { name: "esquirol", image: require("../../assets/images/esquirol.jpg") },
  ],
  Jungla: [
    { name: "elefant", image: require("../../assets/images/elefant.jpg") },
    { name: "tigre", image: require("../../assets/images/tigre.jpg") },
    { name: "cocodril", image: require("../../assets/images/cocodril.jpg") },
    { name: "lleó", image: require("../../assets/images/lleo.jpg") },
  ],
};

const { width } = Dimensions.get("window");

export default function MatchGame() {
  const { habitat } = useGlobalSearchParams();

  // Ensure animalList is defined
  const animalList = animals[habitat] || [];

  const [shuffledNames, setShuffledNames] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (animalList.length > 0) {
      // Shuffle names once when the component mounts
      setShuffledNames(
        animalList
          .map((animal) => animal.name)
          .sort(() => Math.random() - 0.5)
      );
    }
  }, [animalList]);

  const handleImagePress = (index) => {
    setSelectedImage(index);
    if (selectedName !== null && animalList[index].name === selectedName) {
      setMatches([...matches, { imageIndex: index, name: selectedName }]);
      setSelectedImage(null);
      setSelectedName(null);
    }
  };

  const handleNamePress = (name) => {
    setSelectedName(name);
    if (selectedImage !== null && animalList[selectedImage].name === name) {
      setMatches([...matches, { imageIndex: selectedImage, name }]);
      setSelectedImage(null);
      setSelectedName(null);
    }
  };

  const isMatched = (index, name) =>
    matches.some(
      (match) => match.imageIndex === index || match.name === name
    );

  const isGameComplete = matches.length === animalList.length;

  useEffect(() => {
    if (isGameComplete && animalList.length > 0) {
      Alert.alert("Felicitats!", "Has completat el joc!", [
        {
          text: "Tornar als jocs",
          onPress: () => console.log("Navigate back"),
        },
      ]);
    }
  }, [isGameComplete]);

  if (animalList.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No s'han trobat animals per aquest hàbitat</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fes coincidir els animals</Text>
      <View style={styles.gameContainer}>
        <View style={styles.column}>
          {animalList.map((animal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(index)}
              style={[
                styles.imageContainer,
                isMatched(index, null) && styles.matched,
                selectedImage === index && styles.selected,
              ]}
              disabled={isMatched(index, null)}
            >
              <Image
                source={animal.image}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.column}>
          {shuffledNames.map((name, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleNamePress(name)}
              style={[
                styles.nameContainer,
                isMatched(null, name) && styles.matched,
                selectedName === name && styles.selected,
              ]}
              disabled={isMatched(null, name)}
            >
              <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F9",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6F61",
    textAlign: "center",
    marginBottom: 20,
  },
  gameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  column: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  nameContainer: {
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFB6C1",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    color: "#FFF",
  },
  selected: {
    borderColor: "blue",
    borderWidth: 2,
  },
  matched: {
    backgroundColor: "#90EE90",
  },
});
