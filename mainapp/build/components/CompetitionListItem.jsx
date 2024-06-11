import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { updatePlayers } from "../services/DbService";

const CompetitionListItem = (props) => {
  console.log(props.item);

  const handleUpdatePlayers = async () => {
    const competitionId = props.item.id;
    const player = props.user.email;
    const result = await updatePlayers(competitionId, player);
  if (result) {
    console.log("Player successfully added");
    console.log("User ", props.user.email," is joining the competition", props.item.title);
  } else {
    console.error("Failed to add player");
  }
  }

  // const handleUpdatePlayers = async () => {
  //   console.log(
  //     "User ",
  //     props.user.email,
  //     " is joining the competition",
  //     props.item.title
  //   );
  // };

  return (
    <TouchableOpacity onPress={handleUpdatePlayers}>
      <View style={styles.main}>
        <View style={styles.title}>
          <Text style={styles.textColor}>Event:</Text>
          {props && props.item && (
            <>
              <Text style={styles.textColor}>{props.item.title}</Text>
            </>
          )}
        </View>
        <View style={styles.description}>
          <Text style={styles.textColor}>Description:</Text>
          {props && props.item && (
            <>
              <Text style={styles.textColor}>{props.item.description}</Text>
            </>
          )}
        </View>
        <View style={styles.players}>
          {props && props.item && props.item.players.length > 0 ? (
            <>
              <Text style={styles.textColor}>Current Players:</Text>
              {props.item.players.map((player, index) => (
                <Text key={index} style={styles.textColor}>
                  {player}
                </Text>
              ))}
            </>
          ) : (
            <>
              <Text style={styles.textColor2}>
                &#40; no players entered &#41;
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CompetitionListItem;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#191A1F",
    width: "100%",
    height: 100,
    borderRadius: 10,
    borderColor: "#00F083",
    borderWidth: 1,
    justifyContent: "flex-start",
    fontSize: 35,
    padding: 20,
    marginBottom: 20,
  },
  textColor: {
    color: "white",
  },
  textColor2: {
    color: "#5E5E5E",
  },
  title: {
    display: "flex",
    width: "20%",
    alignItems: "center",
  },
  description: {
    display: "flex",
    width: "30%",
    alignItems: "center",
  },
  players: {
    display: "flex",
    width: "50%",
    alignItems: "center",
  },
});
