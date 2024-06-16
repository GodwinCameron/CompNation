import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  concludeEvent,
  updatePlayers,
  updateWinners,
} from "../services/DbService";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const IndividualCompetitionScreen = (props) => {
  const [canJoin, setCanJoin] = useState(true);
  const [eventDetails, setEventDetails] = useState(null); // Set initial state to null
  const [selectedWinners, setSelectedWinners] = useState({});

  const { setDeepNav, event, user } = props;

  const handleUpdatePlayers = async (updateType) => {
    const competitionId = event.id;
    const player = user.email;

    if (updateType === "remove") {
      console.log("Removing player");
      const result = await updatePlayers(competitionId, player, true);
      if (result) {
        console.log("Player successfully removed");
        console.log(
          "User ",
          user.email,
          " is leaving the competition",
          event.title
        );
        setCanJoin(true);
      } else {
        console.error("Failed to remove player");
      }
    } else if (updateType === "add") {
      const result = await updatePlayers(competitionId, player);
      if (result) {
        console.log("Player successfully added");
        console.log(
          "User ",
          user.email,
          " is joining the competition",
          event.title
        );
        setCanJoin(false);
      } else {
        console.error("Failed to add player");
      }
    } else {
      console.error("Error updating players");
    }
  };

  const handleSelectWinner = (bracketIndex, player) => {
    setSelectedWinners((prevWinners) => ({
      ...prevWinners,
      [bracketIndex]: player,
    }));
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
        <TouchableOpacity
          style={[
            styles.playerBlock,
            selectedWinners[index] === pair.player1 &&
              styles.selectedPlayerBlock,
          ]}
          onPress={() => handleSelectWinner(index, pair.player1)}
        >
          <Text style={styles.playerBlockText}>{pair.player1}</Text>
        </TouchableOpacity>
        <Text style={styles.vs}>vs.</Text>
        <TouchableOpacity
          style={[
            styles.playerBlock,
            selectedWinners[index] === pair.player2 &&
              styles.selectedPlayerBlock,
          ]}
          onPress={() => handleSelectWinner(index, pair.player2)}
        >
          <Text style={styles.playerBlockText}>{pair.player2}</Text>
        </TouchableOpacity>
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

  const electWinners = () => {
    console.log("Submitting winners...");
    // console.log(selectedWinners);
    const competitionId = event.id;
    const winners = Object.values(selectedWinners);
    console.log("Winners: ", winners);
    updateWinners(competitionId, winners);
    concludeEvent(competitionId);
  };

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
            <Text style={styles.textColor2}>
              &#40; no players entered &#41;
            </Text>
          )}
          {eventDetails.concluded ? null : canJoin ? (
            <TouchableOpacity onPress={() => handleUpdatePlayers("add")}>
              <Text style={styles.joinButton}>Join Event</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleUpdatePlayers("remove")}>
              <Text style={styles.leaveButton}>Leave Event</Text>
            </TouchableOpacity>
          )}

          {eventDetails.players.length > 0 ? (
            <View style={styles.playerBrackets}>
              <Text style={styles.textColor}>Player Brackets:</Text>
              {renderBrackets()}
              {Object.keys(selectedWinners).length ===
                eventDetails.players.length / 2 &&
                !eventDetails.concluded && (
                  <View style={styles.submitWinnersButton}>
                    <TouchableOpacity onPress={() => electWinners()}>
                      <Text style={styles.joinButton}>Submit Winners</Text>
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          ) : (
            <Text style={styles.textColor2}>
              &#40; Player brackets require a minimum of two players to generate
              &#41;
            </Text>
          )}
          {eventDetails.winners && eventDetails.winners.length > 0 ? (
            <View>
              <Text style={styles.textColor}>Winners:</Text>
              {eventDetails.winners.map((winner, index) => (
                <Text key={index} style={styles.textColor3}>
                  {winner}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.textColor2}>
              &#40; No winners have been selected yet &#41;
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
    backgroundColor: "#101116",
    padding: 5,
    marginHorizontal: 5,
    flex: 1,
    textAlign: "center",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#00F083",
  },
  playerBlockText: {
    color: "white",
    fontSize: 10,
  },
  selectedPlayerBlock: {
    backgroundColor: "#00F083",
    borderColor: "#FFFFFF",
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
  submitWinnersButton: {
    alignItems: "flex-end",
  },
});
