import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Modal from "react-native-modal"

import { configBasic } from '../../../global/variables';
import { whiteMode, darkMode } from './styles/themeStyles';
import { backgroundColor } from '../../sets/styles/themeStyles';
import { Colors } from '../../../global/colors';

var styleView = whiteMode
if (configBasic.darkMode == false){
    styleView = whiteMode
}
else{
    styleView = darkMode
}

export default function NumericPad(prop) {
    const {visible = false, 
        posToChange, // coordenadas de listSets donde actualizar los datos
        session,
        setSession,
        closeNumPad, //funcion para ocultar el pad
        typeSession // obieto tipo de sesion
        } = prop

    function changeValue(value){
        console.debug("=========== NUMERIC PAD =============== ")
        console.debug("value =>", value)
        console.debug("posToChange=>",posToChange)
        let newSession = JSON.parse(JSON.stringify(session));
        newSession.setsList[posToChange[0]].points[posToChange[1]] = value
        console.debug("pre =>",session.setsList)
        console.debug("post=>",newSession.setsList)
        
        setSession(newSession)
        return null;
    }

    var listButtons = []
    var countKey = 0;
    typeSession.points.forEach(point => {
        countKey++;
        listButtons.unshift(
            <TouchableOpacity 
                key = {`button-${countKey}-${point}`}
                style={styles.button} 
                onPress={()=>{changeValue(point)}}
            >
                <Text style={styles.text_button}>{point}</Text>
            </TouchableOpacity>)
        });
    return(
        <Modal 
                isVisible={visible}
                onBackdropPress={closeNumPad}
                backdropOpacity={0.4}
                animationInTiming={400}
                animationOutTiming={400}
                style={{margin:0}}
            >
            <View style={[styles.container_modal,styleView.styles.container_modal]}>
                <View style={{flexDirection:"row-reverse", flexWrap:"wrap", width:"80%", justifyContent:"center", alignContent:"center"}}>
                    {listButtons}
                </View>
                <View style={{justifyContent:"center"}}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={()=>{changeValue("_")}}>
                            <Text style={styles.text_button}>_</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container_modal:{
        position:"absolute",
        bottom:"0",
        height:"35%",
        width:"100%",
        borderStartStartRadius:50,
        borderEndStartRadius:50,
        borderRadius:50,
        flexDirection:"row",
        padding: 20,
        borderWidth:2,
    },
    row:{
        flexDirection:"row",
        alignSelf:"center"
    },
    button:{
        backgroundColor:Colors.colorBlue3, 
        width:55, 
        height:55, 
        borderRadius:10, 
        borderColor:Colors.colorBlue2,
        borderWidth:3,
        margin:5,
    },
    button_transparent:{
        width:55, 
        height:55, 
        margin:5,
    },
    text_button:{
        color:Colors.colorBlue1,
        fontSize:35,
        fontWeight:700,
        textAlign:"center"
    }
})