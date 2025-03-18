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
    const {visible = false,posToChange,listSets, setListSets, reloadData, setViewNumPad} = prop
    var newListSets = listSets

    function changeValue(value){
        newListSets[posToChange[0]][posToChange[1]] = value
        console.log(newListSets)
        setListSets(newListSets)
        reloadData()
        setViewNumPad(false)
    }
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
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(8)}}><Text style={styles.text_button}>8</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(9)}}><Text style={styles.text_button}>9</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(10)}}><Text style={styles.text_button}>10</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue("X")}}><Text style={styles.text_button}>X</Text></TouchableOpacity>
                    <View style={styles.button_transparent}></View>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(4)}}><Text style={styles.text_button}>4</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(5)}}><Text style={styles.text_button}>5</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(6)}}><Text style={styles.text_button}>6</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(7)}}><Text style={styles.text_button}>7</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue("-")}}><Text style={styles.text_button}>-</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(0)}}><Text style={styles.text_button}>0</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(1)}}><Text style={styles.text_button}>1</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(2)}}><Text style={styles.text_button}>2</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{changeValue(3)}}><Text style={styles.text_button}>3</Text></TouchableOpacity>
                    <View style={styles.button_transparent}></View>
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
        flexDirection:"column",
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