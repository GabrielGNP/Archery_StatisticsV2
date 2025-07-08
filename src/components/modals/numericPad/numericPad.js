import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Modal from "react-native-modal"

import { themeStyleView } from '../../../global/variables';
import { whiteMode, darkMode } from './styles/themeStyles';
import { backgroundColor } from '../../sets/styles/themeStyles';
import { Colors } from '../../../global/colors';

var styleView = whiteMode
if (themeStyleView == "whiteMode"){
    styleView = whiteMode
}
else{
    styleView = darkMode
}

export default function NumericPad(prop) {
    const {visible = false,posToChange,listSets, setListSets, reloadData, setViewNumPad, typeSession} = prop
    var newListSets = listSets

    function changeValue(value){
        newListSets[posToChange[0]][posToChange[1]] = value
        console.log(newListSets)
        setListSets(newListSets)
        reloadData()
        setViewNumPad(false)
    }
    var listButtons = []
    var countKey = 0;
    typeSession.points.forEach(point => {
        countKey++;
        listButtons.unshift(
            <TouchableOpacity 
                key = {countKey}
                style={styles.button} 
                onPress={()=>{changeValue(point)}}
            >
                <Text style={styles.text_button}>{point}</Text>
            </TouchableOpacity>)
        });
    return(
        <Modal 
                isVisible={visible}
                onBackdropPress={setViewNumPad}
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
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue("_")}}><Text style={styles.text_button}>_</Text></TouchableOpacity>
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