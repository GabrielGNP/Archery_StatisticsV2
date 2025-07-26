import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Keyboard} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { whiteMode, darkMode} from './styles/themeStyles.js';
import { configBasic, switchStyleMode, getTypeSessionsList} from '../../global/variables.js';
import { Colors } from '../../global/colors.js';

import BlueButton from '../../components/buttons/blueButton.js';
import DatePicker from '../../components/modals/datePicker/datePicker.js';
import OptionSelector from '../../components/modals/optionSelector/optionSelector.js';
import { createNewSession, getAllDataTable, getSession } from '../../global/querys.js';
import { useSQLiteContext } from 'expo-sqlite';

export default function NewSesion() {
    
    const db = useSQLiteContext();

    let bowsList = ["Recurvo", "Poleas", "Longbow", "Poleas (Interior)"];
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalOptions1, setModalOptions1] = useState(false);
    const [modalOptions2, setModalOptions2] = useState(false);
    const [endButtonVisible, setEndButtonVisible] = useState("flex");
    const [date, setDate] = useState(new Date());
    const [distance, setDistance] = useState(70);
    const [pound, setPound] = useState(35);
    const [sets, setSets] = useState(3);
    const [arrows, setArrows] = useState(3);
    const [typeSessionsList, setSessionList] = useState(getTypeSessionsList());
    
    const sessionSelected = useRef(0);
    const bowSelected = useRef(0);

    var viewGradientColors = [Colors.colorBlue2, Colors.colorBlue3]
    var styleView = whiteMode
    if(configBasic.darkMode==false){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
    
    useEffect(()=>{
        console.log("Date change to => ", date)
    },[date])  
    let listTypeSessionsName = [];
    typeSessionsList.forEach(typeSession => {
        listTypeSessionsName.push(typeSession.name);
    })
    return(
        <KeyboardAvoidingView style={[styles.Main_container,styleView.styles.Main_container]} behavior="none">
            <ScrollView style={styles.first_container}>
                {/*Input de fecha*/}
                <View style={[styles.option,{marginTop:40}]}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Fecha</Text>
                    <TouchableOpacity 
                            style={[styles.central_button, styleView.styles.central_button]}
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
                
                {/*Input de Sesión*/}
                <View style={[styles.option]}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Tipo de sesión</Text>
                    <TouchableOpacity 
                            style={[styles.central_button, styleView.styles.central_button, {width:250}]}
                            onPress={() => {setModalOptions1(true)}}
                        >
                        <Text style={[styles.option_text,styleView.styles.option_text]}>{typeSessionsList[sessionSelected.current].name}</Text>
                        <Text style={[styles.option_text,styleView.styles.option_text,{fontWeight:"bold",fontSize:20,position:"absolute", right:0}]}>v</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:"row"}}>
                    {/*Input de Distancia*/}
                    <View style={[styles.option, {width:"50%"}]}>
                        <Text style={[styles.option_text,styleView.styles.option_text,{width:"100%", textAlign:"left", paddingLeft:50}]}>Distancia</Text>
                        <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                            <TextInput
                                style={[styles.numeric_input,styleView.styles.numeric_input,{marginLeft:50, width:100}]}
                                keyboardType="numeric"
                                onChangeText={(value)=>{setDistance(value)}}
                                value={distance.toString()}
                                selectionColor={Colors.colorBlue2}
                                
                            />
                            <Text style={[styles.option_text,styleView.styles.option_text]}>mts</Text>
                        </View>
                    </View>
                    {/*Input de Libraje*/}
                    <View style={[styles.option, {width:"50%"}]}>
                        <Text style={[styles.option_text,styleView.styles.option_text, {width:"100%", textAlign:"left", paddingLeft:40}]}>Libraje</Text>
                        <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                            <TextInput
                                style={[styles.numeric_input,styleView.styles.numeric_input,{marginLeft:25, width:100}]}
                                keyboardType="numeric"
                                onChangeText={(value)=>{setPound(value)}}
                                value={pound.toString()}
                            />
                            <Text style={[styles.option_text,styleView.styles.option_text,{marginRight:15}]}>lb</Text>
                        </View>
                    </View>
                </View>
                
                {/*Input de Arco*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Arco</Text>
                    <TouchableOpacity 
                            style={[styles.central_button, styleView.styles.central_button, {width:250}]}
                            onPress={() => {setModalOptions2(true)}}
                        >
                        <Text style={[styles.option_text,styleView.styles.option_text]}>{bowsList[bowSelected.current]}</Text>
                        <Text style={[styles.option_text,styleView.styles.option_text,{fontWeight:"bold",fontSize:20,position:"absolute", right:0}]}>v</Text>
                    </TouchableOpacity>
                </View>

                

                {/*Input de Cantidad de Sets*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Cantidad de Sets</Text>
                    <TextInput
                        style={[styles.numeric_input,styleView.styles.numeric_input]}
                        keyboardType="numeric"
                        onChangeText={(value)=>{setSets(value)}}
                        value={sets.toString()}
                        selectionColor={Colors.colorBlue2}
                    />
                </View>

                {/*Input de Cantidad de Flechas*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Flechas por Set</Text>
                    <TextInput
                        style={[styles.numeric_input,styleView.styles.numeric_input]}
                        keyboardType="numeric"
                        onChangeText={(value)=>{setArrows(value)}}
                        value={arrows.toString()}
                        selectionColor={Colors.colorBlue2}
                    />
                </View>
                <BlueButton 
                    text="Continuar"    
                    style={{bottom:0,marginTop: 20, alignSelf:"center",display:endButtonVisible}}
                    onPress={async ()=>{
                        var typeSession = {}
                        typeSessionsList.forEach(Tsession => {
                            if (Tsession.name == typeSessionsList[sessionSelected.current].name) 
                            {
                                typeSession = Tsession
                            }
                        })
                        try {
                            // console.log("idUser:", configBasic.userID, typeof(configBasic.userID))
                            let idSession = await createNewSession(db, configBasic.userID,date, bowsList[bowSelected.current], pound, distance, typeSession.name, sets, arrows);   
                            // console.debug(idSession)
                            // console.debug(session)
                            // console.log(session.setsList)
                            // console.debug("TypeSession:", typeSession)
                            
                            if(idSession){
                                navigation.replace("ActiveSession", {
                                    idSession: idSession,
                                    sessionType:typeSession
                                })
                                // navigation.navigate("ActiveSession", {
                                //     idSession: idSession,
                                //     sessionType:typeSession
                                // })    
                            }else console.log("no se pudo recuperar la sesión")
                        } catch (error) {
                            console.error("no se pudo crear la sesión");
                            console.error(error);
                        }
                        
                    }}
                    >
                </BlueButton>   
            </ScrollView>
            
            {/* <DatePad visible={isModalVisible} visibleFunction={() => setModalVisible(false)}></DatePad> */}
            <DatePicker
                date={date}
                onConfirm={(selectedDate) => setDate(selectedDate)}
                onCancel={() => console.log("Cancelado")}
                visible={isModalVisible} 
                visibleFunction={() => setModalVisible(false)}
            />
            <OptionSelector 
                onCancel={() => console.log("Cancelado")}
                visible={modalOptions1} 
                visibleFunction={() => setModalOptions1(false)}
                selectedOption={sessionSelected}
                listOptions={listTypeSessionsName}
            />
            <OptionSelector 
                onCancel={() => console.log("Cancelado")}
                visible={modalOptions2} 
                visibleFunction={() => setModalOptions2(false)}
                selectedOption={bowSelected}
                listOptions={bowsList}
            />

        </KeyboardAvoidingView>
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
        marginTop:5
    },
    option_text:{
        fontSize:20,
        paddingHorizontal:10,
        fontWeight:"500",
        textAlign:"center",
        alignSelf:"center",
        
    },
    central_button:{
        borderWidth:3,
        borderRadius:10,
        height: 45,
        flexDirection:"row", 
        padding:0,
        alignSelf:"center",
        justifyContent:"center",
    },
    button_change_date:{
        position:"relative",
        height: 45,
        width:40,
        left:-3,
        top:-3,
        justifyContent: "center",
        backgroundColor:"transparent",
        borderRadius:10,
    },
    option_input:{
        width:50,
        height:50,        
    },

    numeric_input:{
        borderWidth:3,
        width:150,
        borderRadius:10,
        alignSelf:"center",
        fontSize:20,
        fontWeight:500,
        textAlign:"center",
        paddingHorizontal:10,
        paddingTop:5,
        paddingBottom:5
    }
})