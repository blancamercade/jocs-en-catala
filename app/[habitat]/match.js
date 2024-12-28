import React, { useState } from "react";
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
};

const { width } = Dimensions.get("window");

export default function MatchGame({ route }) {
  const { habitat } = route.params;
  const animalList = animals[habitat];

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [matches, setMatches] = useState([]);

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
    matches.some((match) => match.imageIndex === index || match.name === name);

  const isGameComplete = matches.length === animalList.length;

  if (isGameComplete) {
    Alert.alert("Felicitats!", "Has completat el joc!", [
      {
        text: "Tornar als jocs",
        onPress: () => route.navigation.navigate(`/${habitat}`),
      },
    ]);
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
          {animalList
            .map((animal) => animal.name)
            .sort(() => Math.random() - 0.5)
            .map((name, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleNamePress(name)}
                style={[
                  styles.nameContainer,
                  selectedName === name && styles.selected,
                ]}
                disabled={isMatched(null, name)}
              >
                <Text style={styles.name}>{name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        {matches.map((match, index) => (
          <Line
            key={index}
            x1={50}
            y1={match.imageIndex * 100 + 50}
            x2={width - 50}
            y2={match.nameIndex * 100 + 50}
            stroke="red"
            strokeWidth="2"
          />
        ))}
      </Svg>
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
});
