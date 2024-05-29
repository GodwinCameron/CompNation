import React from "react";
import { Image, View, StyleSheet, Pressable } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

// Stack Navigation:
// const SplashScreen = ({ navigation }) => {
//     const logo = require("../../assets/logo2.gif");

//   return (
//     <View style={styles.main}>
//       <Pressable onPress={() => navigation.navigate('Login')}>
//         <Image source={logo} style={styles.logo} />
//       </Pressable>
//     </View>
//   );
// };




// React state Navigation:
const SplashScreen = ({ navigateTo }) => {

  const logo = require("../../assets/logo2.gif");

  return (
    <View style={styles.main}>
      <Pressable onPress={() => navigateTo('Login')}>
        <Image source={logo} style={styles.logo} />
      </Pressable>
    </View>
  );
};

export default SplashScreen;
