import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { createNewCompetition } from "../services/DbService";

const EventPlannerScreen = (props) => {
  const { navigateTo } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    console.log("Creating event...");
    var players = [];
    var competition = { title, description, players };
    var success = await createNewCompetition(competition);
    if (success) {
      navigateTo("Competitions");
    } else {
      alert("Failed to create event");
      console.log("Failed to create event");
    }
  };

  return (
    <View>
      <View style={styles.spacer}>
        <Text>Event Planner Screen</Text>
        <Pressable
          onPress={() => {
            navigateTo("Competitions");
          }}
        >
          <Text style={styles.text}> &#60; Back</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.inputField}
        placeholder="Event Name"
        onChangeText={(e) => setTitle(e)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Description"
        onChangeText={(e) => setDescription(e)}
      />
      <Button title="Create Event" onPress={handleCreate} />
    </View>
  );
};

export default EventPlannerScreen;

const styles = StyleSheet.create({
  spacer: {
    marginTop: 50,
  },
  text: {
    marginBottom: 50,
    color: "blue",
  },
  inputField: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
});
