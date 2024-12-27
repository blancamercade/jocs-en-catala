import { useRouter, useRoute } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const games = ["learn", "multiple-choice", "match", "pronunciation"];

export default function GameSelectionScreen() {
  const router = useRouter();
  const route = useRoute();

  // Extract habitat from the route params
  const { habitat } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hàbitat: {habitat}</Text>
      <Text style={styles.subtitle}>Tria un joc</Text>
      {games.map((game) => (
        <TouchableOpacity
          key={game}
          style={styles.button}
          onPress={() => router.push(`/${habitat}/${game}`)}
        >
          <Text style={styles.buttonText}>{game}</Text>
        </TouchableOpacity>
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
  subtitle: {
    fontSize: 20,
    color: "#FF6F61",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FFB6C1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
  },
});
