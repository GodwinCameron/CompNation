import { Text, View, StyleSheet, ScrollView, Pressable, TouchableOpacity } from "react-native";
import CompetitionListItem from "../components/CompetitionListItem";
import React, { useCallback, useEffect, useState } from "react";
import { getAllCompetitions } from "../services/DbService";
import { AntDesign } from "@expo/vector-icons";

const CompetitionsScreen = (props) => {

    const admin = true;

    const { navigateTo } = props;

    const [listItems, setListItems] = useState([]);

  useEffect(
    useCallback(() => {
      handleGettingData();

      return () => {
        // Do something when screen is out of focus
      };
    }),
    []
  );

    const handleGettingData = async () => {
        var listItems = await getAllCompetitions();
        setListItems(listItems);
    }


  return (
    <View style={styles.main}>
      <Text style={styles.textColor}>Competitions:</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
      {listItems != [] ? (
          listItems.map((item, index) => (
            <TouchableOpacity
            style={styles.fullWidth}
              key={index}
              onPress={() => console.log(props.user.email, " Joined the ",item.title," event!")}
            >
              <CompetitionListItem item={item} />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No Competitions yet...</Text>
        )}
        <CompetitionListItem />
        <CompetitionListItem />
        {admin && <Pressable onPress={() => navigateTo("EventPlan")}><AntDesign name="pluscircleo" size={24} color="#00F083" /></Pressable>}
        
      </ScrollView>
    </View>
  );
};

export default CompetitionsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#101116",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 35,
    padding: 20,
    paddingTop: 50,
  },
  scroll: {
    width: 340,
    alignItems: "center",
  },
  textColor: {
    color: "#5E5E5E",
    marginBottom: 20,
  },
  fullWidth: {
    width: "100%",
  },
});
