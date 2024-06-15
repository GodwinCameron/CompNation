import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./build/screens/LoginScreen";
import RegisterScreen from "./build/screens/RegisterScreen";
import SplashScreen from "./build/screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ProfileScreen from "./build/screens/ProfileScreen";
import CompetitionsScreen from "./build/screens/CompetitionsScreen";
import EventPlannerScreen from "./build/screens/EventPlannerScreen";
import IndividualCompetitionScreen from "./build/screens/IndividualCompetition";

// Stack Navigation:
// const Stack = createNativeStackNavigator();
// export default function App() {
//   return (
//     <>
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     </>
//   );
// }

export default function App() {
  const [screen, setScreen] = useState("Splash");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState({});

  const navigateTo = (screenName) => {
    setScreen(screenName);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User ", user.email, " is logged in");
        setUser(user);
        setLoggedIn(true);
          navigateTo("Profile");
      } else {
        console.log("No user is logged in.");
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "Splash":
        return <SplashScreen navigateTo={navigateTo} />;
      case "Login":
        if (loggedIn) {
          navigateTo("Profile");
          return null;
        } else {
          return <LoginScreen navigateTo={navigateTo} />;
        }
      case "Register":
        return <RegisterScreen navigateTo={navigateTo} />;
      case "Competitions":
        return <CompetitionsScreen setEvent={setEvent} user={user} navigateTo={navigateTo} />;
      case "Profile":
        if (!loggedIn) {
          navigateTo("Login");
          return null;
        } else {
          return <ProfileScreen user={user} navigateTo={navigateTo} />;
        }
      case "EventPlan":
        return <EventPlannerScreen navigateTo={navigateTo} />;
      case "EventDetails":
        return <IndividualCompetitionScreen user={user} event={event} navigateTo={navigateTo} />;
      default:
        return <SplashScreen navigateTo={navigateTo} />;
    }
  };

  // return (
  //   <>
  //     {loggedIn ? (<ProfileScreen user={user} navigateTo={navigateTo} />) : renderScreen()}
  //     <StatusBar style="auto" />
  //   </>
  // );

  return (
    <>
      {renderScreen()}
      <StatusBar style="auto" />
    </>
  );
}
