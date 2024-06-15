import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { updatePlayers } from "../services/DbService";
import { useEffect, useState } from "react";

const IndividualCompetitionScreen = (props) => {
  const [canJoin, setCanJoin] = useState(true);
  // const [reloadFlag, setReloadFlag] = useState(false);
  const { navigateTo, event, user } = props;

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
    for (let i = 0; i < event.players.length; i += 2) {
      playerPairs.push({
        player1: event.players[i],
        player2: event.players[i + 1] || "Awaiting bracket victor...",
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
    if (event.players.includes(user.email)) {
      setCanJoin(false);
    }
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.topRow}>
        <Pressable onPress={() => navigateTo("Competitions")}>
          <View style={styles.row}>
            <AntDesign name="arrowleft" size={12} color="#00F083" />
            <Text style={styles.text}>Back</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.textColor}>Event: </Text>
        <View>
          <View style={styles.title}>
            {event && (
              <Text style={styles.textColor}> Title: {event.title}</Text>
            )}
          </View>
          <View style={styles.description}>
            <Text style={styles.textColor}>Description:</Text>
            {event && <Text style={styles.textColor}>{event.description}</Text>}
          </View>
          <View style={styles.players}></View>
        </View>
        <Text style={styles.textColor}>Competitors:</Text>
        {event && event.players.length > 0 ? (
          <>
            <Text style={styles.textColor}>Current Players:</Text>
            {event.players.map((player, index) =>
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
          <TouchableOpacity onPress={() => handleUpdatePlayers()}>
            <Text style={styles.joinButton}>Join Event</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.leaveButton}>Leave Event</Text>
        )}

        {event.players.length > 0 ? (
          <View style={styles.playerBrackets}>
            <Text style={styles.textColor}>Player Brackets:</Text>
            {renderBrackets()}
          </View>
        ) : (
          <Text style={styles.textColor2}>
            &#40; Player brackets require a minimun of two players to generate
            &#41;
          </Text>
        )}
      </View>
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
