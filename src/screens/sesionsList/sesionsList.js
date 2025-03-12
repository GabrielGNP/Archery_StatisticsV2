import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView, Dimensions } from 'react-native';


import { whiteMode, darkMode} from './styles/themeStyles.js';
import { themeStyleView, switchStyleMode } from '../../global/variables.js';
import { Colors } from '../../global/colors.js';

import LongSesion from '../../components/infoSesion/longSesion.js';
import MediumSesion from '../../components/infoSesion/mediumSesion.js';
import ShortSesion from '../../components/infoSesion/shortSesion.js';
import FooterListSesions from '../../components/footers/footerListSesions.js';


import { useNavigation } from '@react-navigation/native';

export default function SesionsList() {

    const navigation = useNavigation();

    var viewGradientColors = [Colors.colorBlue2, Colors.colorBlue3]
    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }


    var typeViewSesions = "short"

    var listSesions = [
        ["30/09/2024",45,398,"100m","de poleas","45lb","thirt"],
        ["30/08/2024",30,300,"70m","recurvo","35lb","first"],
        ["29/08/2024",30,298,"70m","recurvo","35lb","second"],
        ["28/08/2024",30,292,"70m","recurvo","35lb","thirt"],
        ["27/08/2024",45,402,"100m","de poleas","45lb","nothing"],
        ["26/08/2024",45,397,"100m","de poleas","45lb","nothing"],
        ["31/09/2024",45,398,"100m","de poleas","45lb","thirt"],
        ["32/08/2024",30,300,"70m","recurvo","35lb","first"],
        ["23/08/2024",30,298,"70m","recurvo","35lb","second"],
        ["24/08/2024",30,292,"70m","recurvo","35lb","thirt"],
        ["25/08/2024",45,402,"100m","de poleas","45lb","nothing"],
        ["36/08/2024",45,397,"100m","de poleas","45lb","nothing"],
    ]

    var listObjectSesions = []
    switch (typeViewSesions) {
        case "long":
            listSesions.forEach(sesion =>{
                listObjectSesions.push(
                    <LongSesion key={sesion[0]} date={sesion[0]} arrows={sesion[1]} points={sesion[2]} distance={sesion[3]} bowType={sesion[4]} power={sesion[5]} record={sesion[6]}></LongSesion>
                )
            })
            break;
        case "medium":
            listSesions.forEach(sesion =>{
                listObjectSesions.push(
                    <MediumSesion key={sesion[0]} date={sesion[0]} arrows={sesion[1]} points={sesion[2]} distance={sesion[3]} bowType={sesion[4]} power={sesion[5]} record={sesion[6]}></MediumSesion>
                )
            })
            break;
        case "short":
            listSesions.forEach(sesion =>{
                listObjectSesions.push(
                    <ShortSesion key={sesion[0]} date={sesion[0]} arrows={sesion[1]} points={sesion[2]} distance={sesion[3]} bowType={sesion[4]} power={sesion[5]} record={sesion[6]}></ShortSesion>
                )
            })
            break;
    }
    return(
        <View style={[styles.Main_container, styleView.styles.Main_container]}>
            
            <ScrollView style={[styles.content_view]} 
                contentContainerStyle={{
                    flexDirection:"row",
                    flexWrap:"wrap"
                }}
                >
                {listObjectSesions}
                <View style={styles.limit_list}></View>
            </ScrollView>
            <FooterListSesions></FooterListSesions>
        
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
    content_view:{
        backgroundColor: "transparent",
        height: "80%",
        width: "100%",
        padding: 10,
        paddingTop:25,
        marginBottom:10,
    },
    limit_list:{
        height:30,
        width:"100%",
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
        
    }
})

