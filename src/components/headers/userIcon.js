import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../global/colors.js'

import { whiteMode, darkMode} from './styles/themeStyles.js';
import { configBasic, switchStyleMode } from '../../global/variables.js';


export default function UserIcon() {

    var styleView = whiteMode
    if(configBasic.darkMode==false){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
    
    return(
        <View style={styles.userIcon_container}>
            <View style={[styles.userIcon, styleView.styles.userIcon]}>
                <Text style={{textAlign:"center", fontSize: 25}}>🏹</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    
    userIcon_container:{
        justifyContent: "center",
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
    
})