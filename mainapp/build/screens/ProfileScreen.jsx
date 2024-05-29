import { Text, Image, View, StyleSheet, Pressable, Button } from "react-native";
import { handleLogout } from "../services/authService";
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const logo = require("../../assets/logo2.png");

  const { navigateTo } = props;

  const logout = () => {
    handleLogout();
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
      </View>
      <Pressable onPress={() => navigateTo("Splash")}>
        <Image source={logo} style={styles.logo} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.textColor}> Profile:</Text>
        <Text style={[styles.textColor, styles.userEmail]}>
          {props.user.email}
        </Text>
        <Button
          title="Logout"
          onPress={logout}
          color="#00F083"
          style={styles.button}
        />
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
  logo: {
    height: 50,
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
    marginBottom: 200,
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
});
