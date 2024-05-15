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
  
  const RegisterScreen = () => {
  
      const logo = require('../../assets/logo2.png');
  
  
  
    return (
      <View style={styles.main}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.content}>
          <Text style={styles.textColor}> Create an account!</Text>
          <TextInput
              placeholder="First Name"
              placeholderTextColor="#5E5E5E"
              style={styles.Input}
            ></TextInput>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#5E5E5E"
              style={styles.Input}
            ></TextInput>
            <TextInput
              placeholder="Choose a Username"
              placeholderTextColor="#5E5E5E"
              style={styles.Input}
            ></TextInput>
              <TextInput
                  placeholder="Choose a Password"
                  placeholderTextColor="#5E5E5E"
                  style={styles.Input}
                  secureTextEntry={true}
              ></TextInput>
              <TextInput
                  placeholder="Repeat Password"
                  placeholderTextColor="#5E5E5E"
                  style={styles.Input}
                  secureTextEntry={true}
              ></TextInput>
              <Button title="Login" color="#FF00B8" style={styles.button}/>
              <Pressable>
                  <Text style={{color: "#FF00B8", marginTop: 20, textDecorationLine: "underline"}}>New here? Register now!</Text>
              </Pressable>
        </View>
      </View>
    );
  };
  
  export default RegisterScreen;
  