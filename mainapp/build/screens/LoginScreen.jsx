import { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { handleLogin } from "../services/authService";




// State Navigation:
// const LoginScreen = ({ navigation }) => {
//     const logo = require("../../assets/logo2.png");
  
//     return (
//       <View style={styles.main}>
//         <Pressable onPress={() => navigation.navigate('Splash')}>
//           <Image source={logo} style={styles.logo} />
//         </Pressable>
//         <View style={styles.content}>
//           <Text style={styles.textColor}> Login</Text>
//           <TextInput
//             placeholder="Username"
//             placeholderTextColor="#5E5E5E"
//             style={styles.Input}
//           ></TextInput>
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#5E5E5E"
//             style={styles.Input}
//             secureTextEntry={true}
//           ></TextInput>
//           <Pressable onPress={() => console.log("Uh-oh! Forgotten Password!")}>
//             <Text style={{ color: "#00F083", marginTop: 20, marginBottom: 20 }}>
//               Forgot your password?
//             </Text>
//           </Pressable>
//           <Button title="Login" color="#00F083" style={styles.button} />
//           <Pressable onPress={() => navigation.navigate('Register')}>
//             <Text
//               style={{
//                 color: "#00F083",
//                 marginTop: 20,
//                 textDecorationLine: "underline",
//               }}
//             >
//               New here? Register now!
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };



// React state Navigation:
const LoginScreen = ({ navigateTo }) => {
  const logo = require("../../assets/logo2.png");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    handleLogin(email, password);
  }

  return (
    <View style={styles.main}>
      <Pressable onPress={() => navigateTo("Splash")}>
        <Image source={logo} style={styles.logo} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.textColor}> Login</Text>
        <TextInput
          placeholder="Email"
          onChangeText={(e) => setEmail(e)}
          placeholderTextColor="#5E5E5E"
          style={styles.Input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          onChangeText={(e) => setPassword(e)}
          placeholderTextColor="#5E5E5E"
          style={styles.Input}
          secureTextEntry={true}
        ></TextInput>
        <Pressable onPress={() => console.log("Uh-oh! Forgotten Password!")}>
          <Text style={{ color: "#00F083", marginTop: 20, marginBottom: 20 }}>
            Forgot your password?
          </Text>
        </Pressable>
        <Button title="Login" onPress={login} color="#00F083" style={styles.button} />
        <Pressable onPress={() => navigateTo("Register")}>
          <Text
            style={{
              color: "#00F083",
              marginTop: 20,
              textDecorationLine: "underline",
            }}
          >
            New here? Register now!
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;





const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#101116",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 35,
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