import { StatusBar } from "expo-status-bar";
import {
  BackHandler,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { cloneElement, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import LoginScreen from "./build/screens/LoginScreen";
import RegisterScreen from "./build/screens/RegisterScreen";
import SplashScreen from "./build/screens/SplashScreen";
import ProfileScreen from "./build/screens/ProfileScreen";
import CompetitionsScreen from "./build/screens/CompetitionsScreen";
import EventPlannerScreen from "./build/screens/EventPlannerScreen";
import IndividualCompetitionScreen from "./build/screens/IndividualCompetition";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function CustomTabNavigator({ loggedIn, user, event, navigateTo, setEvent, setDeepNav }) {
  const tabScreen = (name, component, iconName) => {
    return (
      <Tab.Screen
        name={name}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconName} color={color} size={size} />
          ),
        }}
        children={() =>
          cloneElement(component, {
            navigateTo,
            loggedIn,
            user,
            event,
            setEvent,
            setDeepNav
          })
        }
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#00F083",
        tabBarInactiveTintColor: "#f4f4f4",
        tabBarStyle: {
          backgroundColor: "#191A1F",
          borderTopWidth: 0,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      {tabScreen("Competitions", <CompetitionsScreen />, "trophy")}
      {tabScreen("Profile", <ProfileScreen />, "person")}

      {/* Special Screens: */}
      {/* {tabScreen("EventPlan", <EventPlannerScreen />)}
      {tabScreen("EventDetails", <IndividualCompetitionScreen />)}
      {tabScreen("Splash", <SplashScreen />)}
      {tabScreen("Login", <LoginScreen />)}
      {tabScreen("Register", <RegisterScreen />)} */}
    </Tab.Navigator>
  );
}

export default function App() {
  const [authScreen, setAuthScreen] = useState("Splash");
  const [deepNav, setDeepNav] = useState("");
  const [deepNavScreen, setDeepNavScreen] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User ", user.email, " is logged in");
        setUser(user);
        setLoggedIn(true);
        setLoading(false);
      } else {
        console.log("No user is logged in.");
        setLoggedIn(false);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const backAction = () => {
      setDeepNav("");
      if (backPressedOnce) {
        BackHandler.exitApp();
        return true;
      }

      setBackPressedOnce(true);
      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);

      setTimeout(() => {
        setBackPressedOnce(false);
        backHandler.remove();
      }, 1000);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [backPressedOnce]);

  const authNavigate = (screenName) => {
    setAuthScreen(screenName);
  };

  const renderScreen = () => {
    switch (authScreen) {
      case "Login":
        return <LoginScreen authNavigate={authNavigate} />;
      case "Register":
        return <RegisterScreen authNavigate={authNavigate} />;
      case "Profile":
        if (!loggedIn) {
          authNavigate("Login");
          return null;
        } else {
          return null;
        }
      default:
        return <LoginScreen authNavigate={authNavigate} />;
    }
  };

  const deepNavRenderScreen = () => {
    switch (deepNav) {
      case "details":
        return <IndividualCompetitionScreen event={event} user={user} setDeepNav={setDeepNav}/>;
      case "eventPlan":
        return <EventPlannerScreen user={user} setDeepNav={setDeepNav} />;
      default:
        return <ProfileScreen user={user} />;
    }
  };

  return (
    <>
      {deepNav !== "" ? (
        deepNavRenderScreen()
      ) : loading ? (
        <SplashScreen />
      ) : loggedIn ? (
        <NavigationContainer>
          <CustomTabNavigator
            loggedIn={loggedIn}
            user={user}
            event={event}
            setEvent={setEvent}
            setDeepNav={setDeepNav}
          />
          <StatusBar style="auto" />
        </NavigationContainer>
      ) : (
        renderScreen()
      )}
    </>
  );
}
