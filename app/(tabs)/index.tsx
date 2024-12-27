import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const habitats = [
  "Casa",
  "Granja",
  "Bosc",
  "Jungla",
];

export default function HabitatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tria un hàbitat</Text>
      {habitats.map((habitat) => (
        <Link
          key={habitat}
          href={`/${encodeURIComponent(habitat)}`}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{habitat}</Text>
        </Link>
      ))}
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
