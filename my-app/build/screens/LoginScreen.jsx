import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from "react-native";

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

const LoginScreen = () => {

    const logo = require('../../assets/logo2.png');



  return (
    <View style={styles.main}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.textColor}> Login</Text>
        <TextInput
            placeholder="Username"
            placeholderTextColor="#5E5E5E"
            style={styles.Input}
          ></TextInput>
            <TextInput
                placeholder="Password"
                placeholderTextColor="#5E5E5E"
                style={styles.Input}
                secureTextEntry={true}
            ></TextInput>
            <Pressable>
                <Text style={{color: "#00F083", marginTop: 20, marginBottom: 20}}>Forgot your password?</Text>
            </Pressable>
            <Button title="Login" color="#00F083" style={styles.button}/>
            <Pressable>
                <Text style={{color: "#00F083", marginTop: 20, textDecorationLine: "underline"}}>New here? Register now!</Text>
            </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
