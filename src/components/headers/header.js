import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../global/colors.js'

import { whiteMode, darkMode} from '../../styles/components/headers/themeStyles.js';
import { themeStyleView, switchStyleMode } from '../../global/variables.js';

import { Feather } from '@expo/vector-icons';

export default function Header(prop) {

    const {title="Archery Statistics", size=23, flex=1} = prop

    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
    
    return(
        <View style={[styles.header, styleView.styles.header]}>
            <View style={styles.shadow}></View>
            <View style={styles.userIcon_container}>
                <View style={[styles.userIcon, styleView.styles.userIcon]}>
                    <Text style={{textAlign:"center", fontSize: 25}}>🏹</Text>
                </View>
            </View>
                    
            <Text style={[styles.title,styleView.styles.title,{fontSize:size, flex:flex}]}>{title}</Text>
            
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
        </View>
    )
}


const styles = StyleSheet.create({
    header:{
        paddingTop:25,
        height: "15%",
        width: "100%",
        borderBottomWidth: 2,
        borderColor: Colors.colorBlue2,
        display:"flex",
        flexDirection: "row",
    },
    shadow:{
        position:"absolute",
        width:"100%",
        height:30,
        backgroundColor:"#00000077"
    },
    userIcon_container:{
        flex:1,
        padding: 5,
        justifyContent: "center"
    },
    userIcon:{
        marginLeft: 10,
        width: 40,
        height: 40,
        borderRadius: "100%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    title:{
        flex:1,
        fontWeight: "500",
        fontSize: 23,
        textAlign: "center",
        padding: 5,
    },
    container_menu_button:{
        flex:1,
        alignItems:"flex-end",
        justifyContent:"center",
        width: 10,
        height:"100%",
        padding: 5,
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