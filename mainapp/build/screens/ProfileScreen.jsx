import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { handleLogout } from "../services/authService";
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const profileIcon = require("../../assets/icons/profile.png");
  const logo = require("../../assets/logo2.gif");

  const { navigateTo } = props;
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const competitionsRef = collection(db, "competitions");
        const snapshot = await getDocs(competitionsRef);
        const competitionsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompetitions(competitionsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []);

  const logout = async () => {
    await handleLogout();
    navigateTo("Login");
  };

  return (
    <View style={styles.main}>
      <View style={styles.topRow}>
        <Pressable onPress={() => navigateTo("Competitions")}>
          <View style={styles.row}>
            <AntDesign name="arrowleft" size={12} color="#00F083" />
            <Text style={styles.text}>Back</Text>
          </View>
        </Pressable>
        <Text style={[styles.text, styles.spacer]}>User:</Text>
      </View>
      <Image source={profileIcon} style={styles.profileIcon} />
      <View style={styles.content}>
        <View style={styles.profileInfo}>
          <Text style={styles.text2}>Profile:</Text>
          <TouchableOpacity onPress={() => setEditing(!editing)}>
            <AntDesign name="edit" size={24} color="#00F083" />
          </TouchableOpacity>
        </View>
        {editing ? (
          <View style={styles.editingContainer}>
            <Text style={styles.text}>Editing Account Details...</Text>
          </View>
        ) : (
          <>
            {props.user.displayName ? (
              <Text style={[styles.text, styles.spacer]}>
                {props.user.displayName}
              </Text>
            ) : (
              <Text style={[styles.text2, styles.spacer]}>
                Display name not set
              </Text>
            )}
            <Text style={[styles.userEmail, styles.text2]}>{props.user.email}</Text>
            <Text style={styles.text2}>Wins to Loses history:</Text>
            <View style={styles.historyBlock}>
              <View style={styles.match}>
                <Text>Win</Text>
              </View>
              <View style={styles.match}>
                <Text>Win</Text>
              </View>
              <View style={styles.match}>
                <Text>Win</Text>
              </View>
              <View style={styles.match2}>
                <Text>Loss</Text>
              </View>
              <View style={styles.match}>
                <Text>Win</Text>
              </View>
            </View>
            <Text style={styles.text2}>Competitions:</Text>
            <View>
              {loading ? (
                <Image source={logo} style={styles.logo} />
              ) : competitions.length > 0 ? (
                competitions.map((competition) =>
                  competition.players.includes(props.user.email) ? (
                    <Text key={competition.id} style={styles.text3}>
                      {competition.title} (Joined)
                    </Text>
                  ) : (
                    <Text key={competition.id} style={styles.text2}>
                      {competition.title}
                    </Text>
                  )
                )
              ) : (
                <Text style={styles.text2}>No competitions available</Text>
              )}
            </View>
            <View style={styles.accountActions}>
              <TouchableOpacity onPress={logout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

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
  text2: {
    color: "#5E5E5E",
  },
  text3: {
    color: "#F3914B",
  },
  spacer: {
    marginRight: "auto",
    marginLeft: 95,
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
  profileIcon: {
    height: 100,
    width: 100,
    marginTop: 50,
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 15,
    paddingTop: 40,
  },
  userEmail: {
    fontSize: 20,
    marginBottom: 20,
  },
  Input: {
    backgroundColor: "#1E1E24",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    border: "1px solid #00F083",
    borderColor: "#00F083",
    borderWidth: 2,
    color: "#00F083",
  },
  button: {
    backgroundColor: "#00F083",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "30%",
    alignItems: "center",
  },
  buttonText: {
    color: "#101116",
  },
  accountActions: {
    marginTop: "auto",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    justifyContent: "flex-end",
  },
  logo: {
    height: 30,
    width: 30,
  },
  historyBlock: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#191A1F",
    height: 50,
    width: "100%",
    marginBottom: 20,
    padding: 10,
  },
  match: {
    backgroundColor: "green",
    height: 20,
    width: "12%",
  },
  match2: {
    backgroundColor: "red",
    height: 20,
    width: "12%",
  },
  editingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
