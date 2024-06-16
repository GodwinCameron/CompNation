import { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { handleCreateUser } from "../services/authService";

// Stack Navigation:
// const RegisterScreen = ({ navigation }) => {
//     const logo = require("../../assets/logo2.png");
//     return (
//       <View style={styles.main}>
//         <Pressable onPress={() => navigation.navigate('Splash')}>
//           <Image source={logo} style={styles.logo} />
//         </Pressable>
//         <View style={styles.content}>
//           <Text style={styles.textColor}> Create an account!</Text>
//           <TextInput
//             placeholder="First Name"
//             placeholderTextColor="#5E5E5E"
//             style={styles.Input}
//           ></TextInput>
//           <TextInput
//             placeholder="Last Name"
//             placeholderTextColor="#5E5E5E"
//             style={styles.Input}
//           ></TextInput>
//           <TextInput
//             placeholder="Choose a Username"
//             placeholderTextColor="#5E5E5E"
//             style={styles.Input}
//           ></TextInput>
//           <TextInput
//             placeholder="Choose a Password"
//             placeholderTextColor="#5E5E5E"
//             style={styles.Input}
//             secureTextEntry={true}
//           ></TextInput>
//           <TextInput
//             placeholder="Repeat Password"
//             placeholderTextColor="#5E5E5E"
//             style={styles.Input}
//             secureTextEntry={true}
//           ></TextInput>
//           <Button title="Login" color="#FF00B8" style={styles.button} />
//           <Pressable onPress={() => navigation.navigate('Login')}>
//             <Text
//               style={{
//                 color: "#FF00B8",
//                 marginTop: 20,
//                 textDecorationLine: "underline",
//               }}
//             >
//               Already have an Account? Click here to Login
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     );
//   };

// React state Navigation:
const RegisterScreen = ({ authNavigate }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const register = () => {

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!firstName || !lastName || !email || !username || !password) {
      alert("Please complete all fields");
      return;
    }
    handleCreateUser(firstName, lastName, email, username, password);
  };

  const logo = require("../../assets/logo2.png");
  return (
    <View style={styles.main}>
      <Pressable onPress={() => navigateTo("Splash")}>
        <Image source={logo} style={styles.logo} />
      </Pressable>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.textColor}> Create an account!</Text>
            <TextInput
              placeholder="First Name"
              onChangeText={(e) => setFirstName(e)}
              placeholderTextColor="#5E5E5E"
              style={styles.Input}
            ></TextInput>
            <TextInput
              placeholder="Last Name"
              onChangeText={(e) => setLastName(e)}
              placeholderTextColor="#5E5E5E"
              style={styles.Input}
            ></TextInput>
            <TextInput
              placeholder="Email address"
              onChangeText={(e) => setEmail(e)}
              placeholderTextColor="#5E5E5E"
              style={styles.Input}
            ></TextInput>
            <TextInput
              placeholder="Choose a Username"
              onChangeText={(e) => setUsername(e)}
              placeholderTextColor="#5E5E5E"
              style={styles.Input}
            ></TextInput>
            <TextInput
              placeholder="Choose a Password"
              onChangeText={(e) => setPassword(e)}
              placeholderTextColor="#5E5E5E"
              style={styles.Input}
              secureTextEntry={true}
            ></TextInput>
            <TextInput
              placeholder="Repeat Password"
              onChangeText={(e) => setRepeatPassword(e)}
              placeholderTextColor="#5E5E5E"
              style={styles.Input}
              secureTextEntry={true}
            ></TextInput>
            <Button
              title="Register"
              onPress={register}
              color="#FF00B8"
              style={styles.button}
            />
            <Pressable onPress={() => authNavigate("Login")}>
              <Text
                style={{
                  color: "#FF00B8",
                  marginTop: 20,
                  textDecorationLine: "underline",
                }}
              >
                Already have an Account? Click here to Login
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

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
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 15,
    paddingTop: 40,
  },
  textColor: {
    color: "#5E5E5E",
    marginBottom: 20,
  },
  Input: {
    backgroundColor: "#1E1E24",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    border: "1px solid #00F083",
    borderColor: "#FF00B8",
    borderWidth: 2,
    color: "#FF00B8",
  },
});
