import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import CompetitionListItem from "../components/CompetitionListItem";
import { AntDesign } from "@expo/vector-icons";

const CompetitionsScreen = (props) => {
  const admin = true;
  const user = props.user;
  const { navigateTo } = props;

  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const competitionsRef = collection(db, "competitions");

    const unsubscribe = onSnapshot(competitionsRef, (snapshot) => {//<-- snapshot listener, base code provided by ChatGPT
      const competitions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListItems(competitions);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEventClick = (item) => {
    props.setEvent(item);
    navigateTo("EventDetails");
  };

  const logo = require("../../assets/logo2.gif");

  return (
    <View style={styles.main}>
      <Text style={styles.textColor}>Competitions:</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {loading ? (
          <Image source={logo} style={styles.logo} />
        ) : listItems.length > 0 ? (
          listItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleEventClick(item)}
            >
              <CompetitionListItem key={index} item={item} user={user} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.textColor}>No competitions available yet...</Text>
        )}
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
        <TouchableOpacity>
          <View style={styles.passedEvents}>
          <Text style={styles.text2}>View previous events...</Text>
          </View>
          
        </TouchableOpacity>
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
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  scroll: {
    width: 340,
    alignItems: "center",
  },
  textColor: {
    color: "#5E5E5E",
    marginBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
  },
  profileIcon: {
    height: 30,
    width: 30,
  },
  text2: {
    color: "#00F083",
  },
  passedEvents: {
    marginTop: 20,
    borderColor: "#00F083",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
