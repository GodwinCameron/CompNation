import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { updatePlayers } from "../services/DbService";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const IndividualCompetitionScreen = (props) => {
  const [canJoin, setCanJoin] = useState(true);
  const [eventDetails, setEventDetails] = useState(null); // Set initial state to null

  const { setDeepNav, event, user } = props;

  const handleUpdatePlayers = async () => {
    const competitionId = event.id;
    const player = user.email;
    const result = await updatePlayers(competitionId, player);
    if (result) {
      console.log("Player successfully added");
      console.log(
        "User ",
        user.email,
        " is joining the competition",
        event.title
      );
    } else {
      console.error("Failed to add player");
    }
  };

  const renderBrackets = () => {
    const playerPairs = [];
    for (let i = 0; i < eventDetails.players.length; i += 2) {
      playerPairs.push({
        player1: eventDetails.players[i],
        player2: eventDetails.players[i + 1] || "Awaiting bracket victor...",
      });
    }

    return playerPairs.map((pair, index) => (
      <View key={index} style={styles.bracketPair}>
        <Text style={styles.playerBlock}>{pair.player1}</Text>
        <Text style={styles.vs}>vs.</Text>
        <Text style={styles.playerBlock}>{pair.player2}</Text>
      </View>
    ));
  };

  useEffect(() => {
    const eventRef = doc(db, "competitions", event.id);

    const unsubscribe = onSnapshot(eventRef, (doc) => {
      setEventDetails(doc.data());
    });

    return () => unsubscribe();
  }, [event.id]);

  useEffect(() => {
    if (eventDetails && eventDetails.players.includes(user.email)) {
      setCanJoin(false);
    }
  }, [eventDetails, user.email]);

  return (
    <View style={styles.main}>
      <View style={styles.topRow}>
        <Pressable onPress={() => setDeepNav("")}>
          <View style={styles.row}>
            <AntDesign name="arrowleft" size={12} color="#00F083" />
            <Text style={styles.text}>Back</Text>
          </View>
        </Pressable>
      </View>
      {eventDetails ? (
        <View style={styles.content}>
          <Text style={styles.textColor}>Event: </Text>
          <View>
            <View style={styles.title}>
              <Text style={styles.textColor}>Title: {eventDetails.title}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.textColor}>Description:</Text>
              <Text style={styles.textColor}>{eventDetails.description}</Text>
            </View>
            <View style={styles.players}></View>
          </View>
          <Text style={styles.textColor}>Competitors:</Text>
          {eventDetails.players.length > 0 ? (
            <>
              <Text style={styles.textColor}>Current Players:</Text>
              {eventDetails.players.map((player, index) =>
                player === user.email ? (
                  <Text key={index} style={styles.textColor3}>
                    {player} (You)
                  </Text>
                ) : (
                  <Text key={index} style={styles.textColor}>
                    {player}
                  </Text>
                )
              )}
            </>
          ) : (
            <Text style={styles.textColor2}>&#40; no players entered &#41;</Text>
          )}
          {canJoin ? (
            <TouchableOpacity onPress={handleUpdatePlayers}>
              <Text style={styles.joinButton}>Join Event</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.leaveButton}>Leave Event</Text>
          )}

          {eventDetails.players.length > 0 ? (
            <View style={styles.playerBrackets}>
              <Text style={styles.textColor}>Player Brackets:</Text>
              {renderBrackets()}
            </View>
          ) : (
            <Text style={styles.textColor2}>
              &#40; Player brackets require a minimum of two players to generate &#41;
            </Text>
          )}
        </View>
      ) : (
        <Text style={styles.textColor}>Loading event details...</Text>
      )}
    </View>
  );
};

export default IndividualCompetitionScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#101116",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 35,
    padding: 20,
  },
  text: {
    color: "#00F083",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 10,
    paddingTop: 40,
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
    display: "flex",
    alignItems: "center",
  },
  description: {
    display: "flex",
    alignItems: "center",
  },
  joinButton: {
    color: "white",
    backgroundColor: "#00F083",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "50%",
  },
  leaveButton: {
    color: "white",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "50%",
  },
  playerBrackets: {
    backgroundColor: "#191A1F",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  playerBlock: {
    color: "white",
    backgroundColor: "purple",
    padding: 5,
    marginHorizontal: 5,
    flex: 1,
    textAlign: "center",
  },
  bracketPair: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  vs: {
    color: "white",
    marginHorizontal: 10,
  },
});
