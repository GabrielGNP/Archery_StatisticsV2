import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Keyboard} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { whiteMode, darkMode} from './styles/themeStyles.js';
import { themeStyleView, switchStyleMode } from '../../global/variables.js';
import { Colors } from '../../global/colors.js';

import BlueButton from '../../components/buttons/blueButton.js';
import DatePicker from '../../components/modals/datePicker/datePicker.js';

export default function NewSesion() {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [endButtonVisible, setEndButtonVisible] = useState("flex");
    const [date, setDate] = useState(new Date());
    const [distance, setDistance] = useState(70);
    const [bow, setBow] = useState("recurvo");
    const [pound, setPound] = useState(35);
    const [sets, setSets] = useState(10);
    const [arrows, setArrows] = useState(3);

    useEffect(() => {
        const hideListener = Keyboard.addListener("keyboardDidHide", () => setEndButtonVisible("flex"))

        return () => {
            hideListener.remove();
        }
    },[])

    var viewGradientColors = [Colors.colorBlue2, Colors.colorBlue3]
    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
 
    function showButton(){
        setEndButtonVisible(true)
    }
    function hideButton(){
        setEndButtonVisible(false)
    }
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
                
                {/*Input de Distancia*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Distancia</Text>
                    <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                        <TextInput
                            style={[styles.numeric_input,styleView.styles.numeric_input,{marginLeft:50}]}
                            keyboardType="numeric"
                            onChangeText={(value)=>{setDistance(value)}}
                            value={distance.toString()}
                            selectionColor={Colors.colorBlue2}

                            onPress={()=>setEndButtonVisible("none")}
                            onPressIn={()=>setEndButtonVisible("none")}
                            onEndEditing={()=>setEndButtonVisible("flex")}
                            onBlur={()=>setEndButtonVisible("flex")}
                            onSubmitEditing={()=>setEndButtonVisible("flex")}
                        />
                        <Text style={[styles.option_text,styleView.styles.option_text]}>mts</Text>
                    </View>
                </View>

                {/*Input de Arco*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Arco</Text>
                    <TextInput
                        style={[styles.numeric_input,styleView.styles.numeric_input]}
                        keyboardType="default"
                        spellCheck={false}
                        onChangeText={(value)=>{setBow(value)}}
                        value={bow}
                        selectionColor={Colors.colorBlue2}

                        onPress={()=>setEndButtonVisible("none")}
                        onPressIn={()=>setEndButtonVisible("none")}
                        onEndEditing={()=>setEndButtonVisible("flex")}
                        onBlur={()=>setEndButtonVisible("flex")}
                        onSubmitEditing={()=>setEndButtonVisible("flex")}
                    />
                </View>

                {/*Input de Libraje*/}
                <View style={styles.option}>
                    <Text style={[styles.option_text,styleView.styles.option_text]}>Libraje</Text>
                    <View style={{flexDirection:"row",alignItems:"center", justifyContent:"center"}}>
                        <TextInput
                            style={[styles.numeric_input,styleView.styles.numeric_input,{marginLeft:50}]}
                            keyboardType="numeric"
                            onChangeText={(value)=>{setPound(value)}}
                            value={pound.toString()}

                            onPress={()=>setEndButtonVisible("none")}
                            onPressIn={()=>setEndButtonVisible("none")}
                            onEndEditing={()=>setEndButtonVisible("flex")}
                            onBlur={()=>setEndButtonVisible("flex")}
                            onSubmitEditing={()=>setEndButtonVisible("flex")}
                        />
                        <Text style={[styles.option_text,styleView.styles.option_text,{marginRight:15}]}>lb</Text>
                    </View>
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

                        onPress={()=>setEndButtonVisible("none")}
                        onPressIn={()=>setEndButtonVisible("none")}
                        onEndEditing={()=>setEndButtonVisible("flex")}
                        onBlur={()=>setEndButtonVisible("flex")}
                        onSubmitEditing={()=>setEndButtonVisible("flex")}
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

                        onPress={()=>setEndButtonVisible("none")}
                        onPressIn={()=>setEndButtonVisible("none")}
                        onEndEditing={()=>setEndButtonVisible("flex")}
                        onBlur={()=>setEndButtonVisible("flex")}
                        onSubmitEditing={()=>setEndButtonVisible("flex")}
                    />
                </View>
            </ScrollView>
            <BlueButton 
                text="Continuar" 
                style={{position:"absolute",bottom:0,marginBottom: 10, display:endButtonVisible}}
                onPress={()=>{
                    console.log("continuar:")
                    console.log("_______________________")
                    console.log(date)
                    console.log(distance)
                    console.log(bow)
                    console.log(pound)
                    console.log(sets)
                    console.log(arrows)
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