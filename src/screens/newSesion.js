import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';


import { whiteMode, darkMode} from '../styles/screens/newSesion/themeStyles.js';
import { themeStyleView, switchStyleMode } from '../global/variables.js';
import { Colors } from '../styles/colors.js';

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BlueButton from '../components/blueButton.js';
import { useNavigation } from '@react-navigation/native';

import Modal from "react-native-modal";
import DatePad from '../components/modals/datePad.js';
import CustomDatePicker from '../components/modals/CustomDatePicker.js';
export default function NewSesion() {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    var viewGradientColors = [Colors.colorBlue2, Colors.colorBlue3]
    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }

    return(
        <View  style={[styles.Main_container,styleView.styles.Main_container]}>
            <View style={styles.first_container}>
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Fecha</Text>
                    <LinearGradient 
                        style={[styles.button_change_date]}
                        colors={viewGradientColors}
                    >
                        <TouchableOpacity 
                            style={styles.central_button}
                            onPress={() => {setModalVisible(true)}}
                        >
                            <Feather name="calendar" size={25} color={Colors.colorBack1} style={{textAlign:"center"}}/>
                        </TouchableOpacity>
                    </LinearGradient>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>00/00/0000</Text>
                </View>
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Distancia</Text>
                    <TextInput></TextInput>
                    
                </View>
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Arco</Text>
                   
                </View>
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Libraje</Text>
                </View>
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Cantidad de Sets</Text>
                </View>
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Flechas por Set</Text>
                </View>
            </View>
            <BlueButton text="Continuar" style={{marginBottom: 10}}></BlueButton>
            {/* <DatePad visible={isModalVisible} visibleFunction={() => setModalVisible(false)}></DatePad> */}
            <CustomDatePicker
                                date={date}
                                onConfirm={(selectedDate) => setDate(selectedDate)}
                                onCancel={() => console.log("Cancelado")}
                                visible={isModalVisible} 
                                visibleFunction={() => setModalVisible(false)}
                            />
        </View>
    )
}



const styles = StyleSheet.create({
    Main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
    },

    back_button:{
        position:"relative",
        width:"10%",
        height:0,
        zIndex:10,
        backgroundColor:"red",
        left:"-45%",
        top:0
    },
    back_button_icon:{
        margin:5,
        position:"relative",
        top:-3,
        width:50,
        height:45,
        borderRadius:30,
        justifyContent:"center",
        
    },


    first_container:{
        flex:1,
        marginTop:70,
        marginLeft:50,
        width:"100%",
    },
    option:{
        width:"100%",
        height:50,
        flexDirection: "row",

    },
    option_text:{
        flex:0.3,
        fontSize:20,
        fontWeight:"500"
    },
    button_change_date:{
        height: 40,
        width:40,
        justifyContent: "center",
        backgroundColor:"transparent",
        borderRadius:100,
        marginRight:15
    },
    central_button:{
        backgroundColor:"transparent",
    },
    option_input:{
        width:50,
        height:50,        
    },
})