import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import CompetitionListItem from "../components/CompetitionListItem";
import { AntDesign } from "@expo/vector-icons";

const CompetitionsScreen = (props) => {
  const admin = true;
  const user = props.user;
  const { navigateTo } = props;

  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const competitionsRef = collection(db, "competitions");

    const unsubscribe = onSnapshot(competitionsRef, (snapshot) => {
      //<-- snapshot listener, base code provided by ChatGPT
      const competitions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListItems(competitions);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.main}>
      <Pressable onPress={() => navigateTo("Profile")}>
        <AntDesign name="profile" size={24} color="#00F083" />
      </Pressable>
      <Text style={styles.textColor}>Competitions:</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {listItems.length > 0 ? (
          listItems.map((item, index) => (
            <CompetitionListItem key={index} item={item} user={user} />
          ))
        ) : (
          <Text>No Competitions yet...</Text>
        )}
        <CompetitionListItem/>
        {/* <CompetitionListItem/>
        <CompetitionListItem/>
        <CompetitionListItem/>
        <CompetitionListItem/>
        <CompetitionListItem/>
        <CompetitionListItem/>
        <CompetitionListItem/> */}

        {admin && (
          <Pressable onPress={() => navigateTo("EventPlan")}>
            <AntDesign name="pluscircleo" size={24} color="#00F083" />
          </Pressable>
        )}
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
});
