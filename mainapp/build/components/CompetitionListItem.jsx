import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const CompetitionListItem = (props) => {
  return (
    <View style={styles.main}>
      <View style={styles.title}>
        <Text style={[styles.textColor, styles.titleText]} numberOfLines={4}>
          {props.item.title}
        </Text>
      </View>
      <View style={styles.description}>
        {props.item.description ? (
          <Text
            style={[styles.textColor, styles.descriptionText]}
            numberOfLines={8}
          >
            {props.item.description}
          </Text>
        ) : (
          <Text
            style={[styles.textColor, styles.descriptionText]}
            numberOfLines={8}
          >
            &#40; no description set &#41;
          </Text>
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
                <Text style={[styles.textColor3, styles.playerCountText]}>
                  {props.item.players.length - 1} + You
                </Text>
              )
            ) : (
              <Text style={[styles.textColor, styles.playerCountText]}>
                {props.item.players.length}
              </Text>
            )
          ) : (
            <Text style={styles.textColor2}>
              &#40; no players entered &#41;
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
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
    padding: 10,
    marginBottom: 20,
  },
  textColor: {
    color: "white",
    fontSize: 12,
  },
  textColor2: {
    color: "#5E5E5E",
    fontSize: 12,
  },
  textColor3: {
    color: "#F3914B",
  },
  title: {
    alignItems: "flex-start",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 10,
  },
  description: {
    alignItems: "flex-start",
    flex: 1,
    paddingRight: 10,
    flexWrap: "wrap",
  },
  players: {
    alignItems: "flex-start",
    flex: 1,
    maxHeight: 60,
  },
  playersContainer: {
    flexGrow: 1,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  titleText: {
    color: "#00F083",
    fontSize: 14,
  },
  descriptionText: {
    color: "#5E5E5E",
    fontSize: 9,
  },
  playerCountText: {
    fontSize: 18,
  },
});
