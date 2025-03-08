import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView} from 'react-native';


import { whiteMode, darkMode} from '../styles/screens/newSesion/themeStyles.js';
import { themeStyleView, switchStyleMode } from '../global/variables.js';
import { Colors } from '../styles/colors.js';

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BlueButton from '../components/buttons/blueButton.js';
import { useNavigation } from '@react-navigation/native';

import DatePicker from '../components/modals/datePicker.js';
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
            <ScrollView style={styles.first_container}>
                {/*Input de fecha*/}
                <View style={[styles.option,{marginTop:40}]}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Fecha</Text>
                    <TouchableOpacity 
                            style={[styles.central_button]}
                            onPress={() => {setModalVisible(true)}}
                        >
                        <LinearGradient 
                            style={[styles.button_change_date]}
                            colors={viewGradientColors}
                        >
                            <Feather name="calendar" size={25} color={Colors.colorBack1} style={{textAlign:"center"}}/>                        
                        </LinearGradient>          
                        <Text style={[styles.option_text,styleView.styles.option_text]}>{date.getDate() + "/" + (date.getMonth()+1)+ "/" + date.getFullYear() }</Text>
                    </TouchableOpacity>
                </View>
                
                {/*Input de Distancia*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Distancia</Text>
                    <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                        <TextInput
                            style={[styles.numeric_input,{marginLeft:50}]}
                            keyboardType="numeric"
                            onChangeText={()=>{}}
                            value={"70"}
                            selectionColor={Colors.colorBlue2}
                        />
                        <Text style={[{width:40, fontSize:20, fontWeight:500, color:Colors.colorBlue1, marginLeft:10}]}>mts</Text>
                    </View>
                </View>

                {/*Input de Arco*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Arco</Text>
                    <TextInput
                        style={[styles.numeric_input]}
                        keyboardType="default"
                        onChangeText={()=>{}}
                        value={"recurvo"}
                        selectionColor={Colors.colorBlue2}
                    />
                </View>

                {/*Input de Libraje*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Libraje</Text>
                    <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                        <TextInput
                            style={[styles.numeric_input,{marginLeft:50}]}
                            keyboardType="numeric"
                            onChangeText={()=>{}}
                            value={"35"}
                        />
                        <Text style={[{width:40, fontSize:20, fontWeight:500, color:Colors.colorBlue1, marginLeft:10}]}>lb</Text>
                    </View>
                </View>

                {/*Input de Cantidad de Sets*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Cantidad de Sets</Text>
                    <TextInput
                        style={[styles.numeric_input]}
                        keyboardType="numeric"
                        onChangeText={()=>{}}
                        value={"10"}
                        selectionColor={Colors.colorBlue2}
                    />
                </View>

                {/*Input de Cantidad de Flechas*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Flechas por Set</Text>
                    <TextInput
                        style={[styles.numeric_input]}
                        keyboardType="numeric"
                        onChangeText={()=>{}}
                        value={"3"}
                        selectionColor={Colors.colorBlue2}
                    />
                </View>
            </ScrollView>
            <BlueButton 
                text="Continuar" 
                style={{marginBottom: 10}}
                onPress={()=>{
                    console.log("continuar:")
                    console.log("_______________________")
                    console.log(date)
                }}
                >
            </BlueButton>
            {/* <DatePad visible={isModalVisible} visibleFunction={() => setModalVisible(false)}></DatePad> */}
            <DatePicker
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
        width:"100%",
    },
    option:{
        width:"100%",
        height:80,
        flexDirection: "column",
        alignContent:"center",
    },
    option_text:{
        fontSize:20,
        paddingHorizontal:10,
        fontWeight:"500",
        textAlign:"center",
        alignSelf:"center",
    },
    central_button:{
        backgroundColor:Colors.colorBlue4,
        borderWidth:1,
        borderColor:Colors.colorBlue3,
        borderRadius:20,
        flexDirection:"row", 
        padding:0,
        alignSelf:"center",
        justifyContent:"center"
    },
    button_change_date:{
        height: 40,
        width:40,
        justifyContent: "center",
        backgroundColor:"transparent",
        borderRadius:100,
    },
    option_input:{
        width:50,
        height:50,        
    },

    numeric_input:{
        backgroundColor:Colors.colorBlue4,
        borderColor:Colors.colorBlue3,
        borderWidth:1,
        width:150,
        borderRadius:100,
        alignSelf:"center",
        color:Colors.colorBlue1,
        fontSize:20,
        fontWeight:500,
        textAlign:"center",
        paddingHorizontal:10,
        paddingTop:5,
        paddingBottom:5
    }
})