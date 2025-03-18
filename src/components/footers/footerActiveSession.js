import React from "react"
import { View, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native';

import { Colors } from "../../global/colors"
import { themeStyleView } from "../../global/variables";
import {whiteMode, darkMode} from "./styles/themeStyles"

import BlueButton from "../buttons/blueButton"
import RedButton from "../buttons/redButton"


export default function FooterActiveSession(prop){
    const {addNewSet} = prop
    const navigation = useNavigation();

    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
    
    return(
        <View style={[styles.main_container,styleView.styles.main_container]}>
            <BlueButton style={styles.buttons_style} text="Nuevo Set" textSize={23} onPress={addNewSet}></BlueButton>
            <RedButton style={styles.buttons_style} text="Salir" textSize={23} onPress={() => {navigation.pop(2)}}></RedButton>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container:{
        height:65,
        flexDirection:"row",
        justifyContent:"space-evenly",        
        width:"100%",
        borderWidth:0,
        borderTopWidth:2,
    },
    buttons_style:{
        width:175,
        height:45,
        alignSelf:"center"
    }
})