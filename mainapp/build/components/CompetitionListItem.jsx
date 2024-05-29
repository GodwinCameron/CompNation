import { Text, View, StyleSheet } from "react-native";

const CompetitionListItem = (props) => {
  return (
    <View style={styles.main}>
      <Text style={styles.textColor}>Event:</Text>
      {props && props.item && (
        <>
          <Text style={styles.textColor}>{props.item.title}</Text>
          <Text style={styles.textColor}>{props.item.description}</Text>
        </>
      )}
    </View>
  );
};

export default CompetitionListItem;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#191A1F",
    width: "100%",
    height: 100,
    borderRadius: 10,
    borderColor: "#00F083",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 35,
    padding: 20,
    marginBottom: 20,
  },
  textColor: {
    color: "white",
  },
});
