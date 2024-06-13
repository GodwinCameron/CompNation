import { Text, Image, View, StyleSheet, Pressable, Button, TouchableOpacity } from "react-native";
import { handleLogout } from "../services/authService";
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const profileIcon = require("../../assets/icons/profile.png");

  const { navigateTo } = props;

  const logout = () => {
    // handleLogout();
    // navigateTo("Login");
    console.log(props.user);
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
      </View>
      <Pressable onPress={() => navigateTo("Splash")}>
        <Image source={profileIcon} style={styles.profileIcon} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.textColor}> Profile:</Text>
        <Text style={[styles.textColor, styles.userEmail]}>
          {props.user.email}
        </Text>
        <Text style={styles.textColor}> Competitions:</Text>
        <View style={styles.accountActions}>
        <TouchableOpacity
          onPress={logout}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    width: "100%",
    padding: 15,
    paddingTop: 40,
  },
  textColor: {
    color: "#5E5E5E",
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
});
