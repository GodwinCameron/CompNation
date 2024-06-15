import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const CompetitionListItem = (props) => {
  console.log(props.item);

  return (
    // <TouchableOpacity onPress={handleUpdatePlayers}>
    <>
      <View style={styles.main}>
        <View style={styles.title}>
          <Text style={styles.textColor}>Event:</Text>
          {props.item && (
            <Text style={styles.textColor}>{props.item.title}</Text>
          )}
        </View>
        <View style={styles.description}>
          <Text style={styles.textColor}>Description:</Text>
          {props.item && (
            <Text style={styles.textColor}>{props.item.description}</Text>
          )}
        </View>
        <View style={styles.players}>
          <Text style={styles.textColor}>Current Players:</Text>
          <ScrollView contentContainerStyle={styles.playersContainer}>
            {props.item.players.length > 0 ? (
              props.item.players.includes(props.user.email) ? (
                props.item.players.length === 1 ? (
                  <Text style={styles.textColor3}>Only You</Text>
                ) : (
                  <Text style={styles.textColor3}>
                    {props.item.players.length - 1} + You
                  </Text>
                )
              ) : (
                <Text style={styles.textColor}>
                  {props.item.players.length}
                </Text>
              )
            ) : (
              <Text style={styles.textColor2}>&#40; no players entered &#41;</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </>
    // </TouchableOpacity>
  );
};

export default CompetitionListItem;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    backgroundColor: "#191A1F",
    width: "100%",
    height: 100,
    borderRadius: 10,
    borderColor: "#00F083",
    borderWidth: 1,
    justifyContent: "flex-start",
    padding: 20,
    marginBottom: 20,
  },
  textColor: {
    color: "white",
  },
  textColor2: {
    color: "#5E5E5E",
  },
  textColor3: {
    color: "#F3914B",
  },
  title: {
    width: "20%",
    alignItems: "center",
  },
  description: {
    width: "30%",
    alignItems: "center",
  },
  players: {
    width: "50%",
    alignItems: "center",
    maxHeight: 60,
  },
  playersContainer: {
    flexGrow: 1,
  },
});
