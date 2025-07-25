import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../global/colors.js'
import { configBasic, switchStyleMode, setTypeSessionsList, getTypeSessionsList} from '../../global/variables.js';
import { whiteMode, darkMode } from './styles/themeStyles.js';

import BlueButton from '../../components/buttons/blueButton.js'
import { useSQLiteContext } from 'expo-sqlite';
import { getUsuario, getAllTypeSessionsByUserId, loadConfig, getAllDataTable} from '../../global/querys.js';

export default function LogIn() {

  const db = useSQLiteContext();
  const navigation = useNavigation();

  const [userName, onChangeUserName] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  
  var viewGradientColors = [Colors.colorBlue2, Colors.colorBlue3]
  var viewContentColors = [Colors.colorBack2, Colors.colorBack2]
  var styleView = whiteMode
  if(configBasic.darkMode==false){
    viewGradientColors = [Colors.colorBlue2, Colors.colorBlue3]
    viewContentColors = [Colors.colorBack2, Colors.colorBack2]
    styleView = whiteMode
  }else{
    viewGradientColors = [Colors.colorBack3, Colors.colorBack3]
    viewContentColors = [Colors.colorBlue2, Colors.colorBlue3]
    styleView = darkMode
  }
    

    return (
      <View style={[styles.Main_container, styleView.styles.Main_container]}>
        {/* <View style={[styles.top_View, styleView.top_View]}> */}
        <LinearGradient 
          style={[styles.top_View, styleView.styles.top_View]}
          colors={viewGradientColors}
        >
          <TouchableOpacity 
            onPress = {function nothing(){console.log("tocaste la configuración");switchStyleMode()}}
            style={styles.option_container}>
            {/* <Feather name="tool" size={16} color="#FFD700" /> */}
            {/* <Feather name="activity" size={16} color="#FFD700" /> */}
            {/* <Feather name="award" size={16} color="#FFD700" /> */}
            <Feather name="settings" size={30} color={styleView.icon_settings_color}  backgroundColor={styleView.styles.icon_settings_background}  style={[{borderRadius:15, elevation:5},styleView.styles.icon_settings]} />
          </TouchableOpacity>
          <View style={styles.title_container}>
            <Text style={[styles.title, styleView.styles.title]}>Statistic Archery</Text>
          </View>
            <LinearGradient 
              style={[styles.content_View, styleView.styles.content_View]}
              colors={viewContentColors}
              locations={[0.2, 0.8]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            >
              <View style={styles.container_input_name}>
                <Text style={styleView.styles.info_Input}>Nombre</Text>
                <TextInput
                  style={[styles.userInput, styleView.styles.userInput]}
                  onChangeText= {onChangeUserName}
                  value={userName}
                ></TextInput>
              </View>
              <View style={styles.container_input_password}>
                <Text style={styleView.styles.info_Input}>Contraseña</Text>
                <TextInput
                  style={[styles.userInput, styleView.styles.userInput]}
                  onChangeText={onChangePassword}
                  value={password}
                ></TextInput>
              </View>
              <View style={styles.container_button}>
                <BlueButton text="Iniciar" onPress={async () => {
                  console.log("=====")
                  let id_user = await getUsuario(db, userName, password)
                  await getAllDataTable(db, "session")
                  if(typeof(id_user)=="number"){
                    //navigation.replace("Home")
                    configBasic.userID = id_user;
                    try {
                        let configLoaded = await loadConfig(db, id_user, "basic")
                        // console.log(configLoaded);
                        let typeSessionsLoaded = await getAllTypeSessionsByUserId(db, id_user);
                        // console.debug(typeSessionsLoaded)
                        if (configLoaded != null)
                        {
                            configBasic.darkMode = configLoaded.darkMode
                            // configBasic.modelViewSesions = configLoaded.modelViewSesions
                        }
                        if(typeSessionsLoaded != null)
                        {
                            setTypeSessionsList(typeSessionsLoaded);
                            // console.log(getTypeSessionsList());
                        }
                    } catch (error) {
                        console.error("hubo un problema al cargar los datos del usuario")
                        console.error(error)
                    }
                    
                    navigation.navigate("Home")
                  }else{
                    console.log("Error al iniciar sesion", id_user)
                  }
                }}></BlueButton>
              </View>
            </LinearGradient>
        </LinearGradient>
          
        {/* </View> */}
      </View>
      
    );
  }


  const styles = StyleSheet.create({
    Main_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    top_View: {
      flex: 1,
      width: '96%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      marginLeft: 20,
      marginRight: 20,
      elevation: 10,
      borderRadius: 40,
      
    },
    option_container:{
      position: "absolute",
      top: 25,
      right: 25,
    },
    title_container: {
      position: 'absolute',
      top: '10%',
    },
    title:{
      fontSize:60,
      fontWeight: 'bold',
      textAlign: 'center',
      fontStyle:"italic"
    },

    content_View: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: "absolute",
      bottom: 0,
      height: '55%',
      width: '100%',
      borderTopLeftRadius: 65,
      borderTopRightRadius: 65,
      borderTopColor: Colors.colorBlue3,
      borderTopWidth: 2
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
      color: Colors.colorBlue2,
      backgroundColor: Colors.colorBack1,
      borderColor: Colors.colorBlack,
      fontSize:17,
      borderWidth: 1,
      height: 40,
      width: '100%',
      borderRadius:10,
      padding: 10,
      elevation: 15,
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
    },
    
  })