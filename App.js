import LogIn from './src/screens/logIn/logIn.js';
import HomePage from './src/screens/homePage/homePage.js';
import SesionsList from './src/screens/sesionsList/sesionsList';
import NewSesion from './src/screens/newSesion/newSesion.js';
import ActiveSession from "./src/screens/activeSession/activeSession.js"
import ViewSession from "./src/screens/viewSession/viewSession.js"

import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from './src/global/colors.js';
import UserIcon from './src/components/headers/userIcon';
import OptionsMenu from './src/components/headers/optionsMenu';
import { Feather } from '@expo/vector-icons';
import { themeStyleView, switchStyleMode } from './src/global/variables.js';
import { useNavigation } from '@react-navigation/native';



const Stack = createNativeStackNavigator();

var gradientColors = [Colors.colorBlue2,Colors.colorBlue2]
var titleColor = Colors.colorBack3
var statusBarColor = Colors.colorBlue2
var logInStatusBarColor = Colors.colorBack2
var statusBarTheme = "light"
var arrowBackColor = Colors.colorBack1
if(themeStyleView=="whiteMode"){
    gradientColors = [Colors.colorBlue2,Colors.colorBlue2]
    titleColor = Colors.colorBack3
    statusBarColor = Colors.colorBlue2
    logInStatusBarColor = Colors.colorBack2
    statusBarTheme = "dark"
    arrowBackColor = Colors.colorBack1
}else{
    gradientColors = [Colors.colorBlue4,Colors.colorBlue4]
    titleColor = Colors.colorBlue1
    statusBarColor = Colors.colorBlue4
    logInStatusBarColor = Colors.colorBack3
    statusBarTheme = "light"
    arrowBackColor = Colors.colorBlue2
}

const NavigationBar = (title, backButton) =>{

    const navigation = useNavigation();

    var backButton
    if(backButton){
        backButton = 
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={35} color={arrowBackColor} style={{textAlign:"center"}}/>
            </TouchableOpacity>
    }else
        backButton = <UserIcon></UserIcon>

  return {
    title: title,
    headerBackground: ()=>(
        <LinearGradient 
            colors={gradientColors}
            style={{flex:1,borderBottomWidth:2, borderColor:Colors.colorBlue2}}
            start={{x:0.5,y:0.05}}
            end={{x:0.5, y:1}}
        ></LinearGradient>
    ),
    headerLeft:()=>(
        <View style={{flexDirection:"row"}}>
            {backButton}
        </View>
      
    ),
    headerRight:()=>(
      <OptionsMenu></OptionsMenu>
    ),
    headerTitleAlign: "center",
    headerTitleStyle: {
      color: titleColor,
      fontSize: 25,
      fontWeight: 600,
    },
    headerStyle:{
      padding: 100
    },
    statusBarStyle: statusBarTheme, //auto dark light
    statusBarBackgroundColor: statusBarColor
  }
}
const defaultSession = {date:new Date,distance: "20",bow: "Recurvo",pound: "35",sets: "2",arrows: "3"}
function RootStack() {
  return (
    <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen name="LogIn" component={LogIn} options={{title: "", headerTransparent:true,statusBarStyle: statusBarTheme, statusBarBackgroundColor: logInStatusBarColor}}/>
        <Stack.Screen name="Home" component={HomePage} options={NavigationBar("Archery Statistcs", false)}/>
        <Stack.Screen name="SesionsList" component={SesionsList} options={NavigationBar("Sesiones de tiro", true)}/>
        <Stack.Screen name="NewSesion" component={NewSesion} options={NavigationBar("Nueva sesión de tiro", true)}/>
        <Stack.Screen name="ActiveSession" 
                      component={ActiveSession} 
                      options={NavigationBar("Sesión activa", true)}
                      initialParams={{date:new Date,distance: "20",bow: "Recurvo",pound: "35",sets: "2",arrows: "3"}}/>
        <Stack.Screen name="ViewSession" 
                      component={ViewSession} 
                      options={NavigationBar("Sesion de tiro", true)}
                      initialParams={{session:defaultSession}}/>
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
        <RootStack></RootStack>
    </NavigationContainer>
  );
}