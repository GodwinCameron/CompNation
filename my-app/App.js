import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './build/screens/LoginScreen';
import RegisterScreen from './build/screens/RegisterScreen';
import SplashScreen from './build/screens/SplashScreen';

export default function App() {
  return (
    // <LoginScreen />
    // <RegisterScreen />
    <SplashScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
