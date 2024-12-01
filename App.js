import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LogIn from './src/screens/logIn';
import { NavigationContainer } from '@react-navigation/native';


// HASTA QUE NO TENGA INTERNET NO PUEDO HACER ESTA PARTE
/*
const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);*/

export default function App() {
  return (
    <NavigationContainer>{
      <LogIn></LogIn>
    }</NavigationContainer>
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
