import React from "react";
import { Image, View, StyleSheet, Pressable } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#101116",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 100,
    width: 100,
  },
});

const SplashScreen = () => {
  const logo = require("../../assets/logo2.gif");

  return (
    <View style={styles.main}>
      <Pressable onPress={() => console.log("Pressed")}>
        <Image source={logo} style={styles.logo} />
      </Pressable>
    </View>
  );
};

export default SplashScreen;
