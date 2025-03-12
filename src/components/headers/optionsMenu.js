import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../global/colors.js'

import { whiteMode, darkMode} from './styles/themeStyles.js';
import { themeStyleView, switchStyleMode } from '../../global/variables.js';

import { Feather } from '@expo/vector-icons';

export default function OptionsMenu() {

    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
    
    return(
        <View style={styles.container_menu_button}>
            <TouchableOpacity 
                onPress = {function nothing(){console.log("menú");}}
                style={styles.menuButton}>
                    <Feather name="menu" size={45} 
                        color={styleView.icon_menu_color} 
                        backgroundColor={{backgroundColor:"blue"}}  
                        style={[{borderRadius:15},styles.icon_menu]} />
            </TouchableOpacity>
        </View>    
    )
}


const styles = StyleSheet.create({
    container_menu_button:{
        alignItems:"flex-end",
        justifyContent:"center",
        width: 10,
        height:"100%",
   
    },
    menuButton:{
        width: 45,
        padding: 5,
        justifyContent: "center",
        borderRadius: "100%"
    },
    icon_menu:{
        textAlign:"center",
    },
})