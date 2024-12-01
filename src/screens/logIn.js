import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../styles/colors.js'
import BlueButton from '../components/blueButton.js'
import { LinearGradient } from 'react-native-linear-gradient';

export default function LogIn() {

  const [userName, onChangeUserName] = React.useState("");
  const [password, onChangePassword] = React.useState("");

    return (
      <View style={styles.Main_container}>
        <View style={styles.top_View}>
          <View style={styles.title_container}>
            <Text style={styles.title}>Statistic Archery</Text>
          </View>
          <View style={styles.content_View}>
            <View style={styles.container_input_name}>
              <Text>Nombre</Text>
              <TextInput
                style={styles.userInput}
                onChangeText= {onChangeUserName}
                value={userName}
              ></TextInput>
            </View>
            <View style={styles.container_input_password}>
              <Text>Contraseña</Text>
              <TextInput
                style={styles.userInput}
                onChangeText={onChangePassword}
                value={password}
              ></TextInput>
            </View>
            <View style={styles.container_button}>
              
            </View>
          </View>
        </View>
      </View>
    );
  }


  const styles = StyleSheet.create({
    Main_container: {
      flex: 1,
      backgroundColor: colors.colorBack2,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5
    },
    top_View: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.colorBlue2,
      alignItems: 'center',
      justifyContent: 'center',
      borderStartStartRadius: 25,
      borderEndStartRadius: 25
    },
    title_container: {
      position: 'absolute',
      top: '15%',
    },
    title:{
      color: colors.colorBlack,
      fontSize:60,
      fontWeight: 'bold',
      textAlign: 'center'
    },

    content_View: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.colorBack2,
      position: 'absolute',
      bottom: 0,
      height: '50%',
      width: '100%',
      borderStartStartRadius: 30,
      borderEndStartRadius: 30
    },
    container_input_name:{
      flex: 1,
      width: '80%',
      justifyContent: 'center',
    },
    container_input_password:{
      flex: 1,
      width: '80%',
      justifyContent: 'center',
    },
    container_button:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    userInput:{
      color: colors.colorBlue2,
      fontSize:17,
      backgroundColor: colors.colorBack1,
      borderColor: colors.colorBlack,
      borderWidth: 1,
      height: 40,
      width: '100%',
      borderRadius:10,
      padding: 10
    },


    text:{
        fontSize: 30
    },
    button:{
        backgroundColor: "transparent",
        width: 70,
        height: 70,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 30,
        shadowColor: "#96dded38",
        shadowOffset: {width: 0, height:3}
    },
    touchable:{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
  })