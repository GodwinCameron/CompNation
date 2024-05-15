import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './build/screens/LoginScreen';
import RegisterScreen from './build/screens/RegisterScreen';
import SplashScreen from './build/screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';





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

    const [screen, setScreen] = useState('Splash');

  const navigateTo = (screenName) => {
    setScreen(screenName);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'Splash':
        return <SplashScreen navigateTo={navigateTo} />;
      case 'Login':
        return <LoginScreen navigateTo={navigateTo} />;
      case 'Register':
        return <RegisterScreen navigateTo={navigateTo} />;
      default:
        return <SplashScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <>
      {renderScreen()}
      <StatusBar style="auto" />
    </>
  );
  }
