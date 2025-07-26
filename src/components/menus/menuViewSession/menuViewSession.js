import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { Colors } from '../../../global/colors';
import BlueButton from "../../buttons/blueButton";
import RedButton from "../../buttons/redButton";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function MenuViewSession(prop){
    const { visible, closeMenu, idSession, typeSession } = prop;

    const navigation = useNavigation();

    return <Modal
        isVisible={visible}
        onBackdropPress={closeMenu}
        backdropOpacity={0.4}
        animationIn="slideInLeft"    // Desde izquierda
        animationOut="slideOutLeft"  // Sale hacia izquierda
        animationInTiming={400}
        animationOutTiming={400}
        style={{margin:0}}
    >
        <View style={[styles.container]}>
            <LinearGradient 
                style={[styles.gradient,{}]}
                colors = {[Colors.colorBlue2, Colors.colorBack2]}
                location = {[0.1, 0]}
                start={{x:0.01, y:0}}
                end={{x:0.01, y:0.05}}
            >
                <BlueButton
                    text = {"Modificar"}
                    onPress = {() => {
                        navigation.replace("ActiveSession", {
                            idSession: idSession,
                            sessionType:typeSession
                        })
                    }}
                    textSize = {20}
                    style={{width:200, height:40, margin: 10}}
                ></BlueButton>
                <RedButton
                    text = {"Borrar"}
                    onPress={() => {}}
                    textSize = {20}
                    style={{width:200, height:40, margin: 10}}
                ></RedButton>
                <TouchableOpacity 
                    style={styles.close_menu}
                    onPress={() => {closeMenu()}}
                >
                    <Text style={styles.text_close_menu}>cerrar</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    gradient:{
        width:"100%", 
        height:"95%",
        padding:10,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    container:{
        padding:0,
        width:"60%",
        height:"100%",
        borderEndEndRadius:20,
        borderEndStartRadius:20,
        backgroundColor:Colors.colorBack2
    },
    close_menu:{
        width:"100%", 
        position:"absolute",
        bottom:0
    },
    text_close_menu:{
        textAlign:"center",
        color:Colors.colorBlue2,
        fontSize:17,
        textDecorationLine:"underline",
        fontWeight:"bold",
    }

})