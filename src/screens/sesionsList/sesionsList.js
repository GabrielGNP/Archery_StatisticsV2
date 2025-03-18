import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView, Dimensions } from 'react-native';


import { whiteMode, darkMode} from './styles/themeStyles.js';
import { themeStyleView, switchStyleMode, exampleListSessions } from '../../global/variables.js';
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

    var typeViewSesions = "long"
    var listSesions = []
    
    exampleListSessions.forEach((session)=>{
        var day = session.date.getDate()
        var month = (parseInt(session.date.getMonth())+1).toString();
        var year = session.date.getFullYear()
        if (month.length == 1)
            month = "0"+month
        var date = day+"/"+month+"/"+year
        var points = 0
        var arrows = 0
        session.setsList.forEach((set) =>{
            set.forEach((point) => {
                if (point=="X" || point=="x")
                    points=points+10;
                else if (point=="-")
                    points=points+0;
                else
                    points=points+point;
                arrows++
            })
        })
        listSesions.push([date,arrows,points,session.distance,session.bow,session.pound,session.record,session])
    })

    var listObjectSesions = []
    switch (typeViewSesions) {
        case "long":
            exampleListSessions.forEach(session =>{
                listObjectSesions.push(
                    <LongSesion key={session.date.toString()} session={session}></LongSesion>
                )
            })
            break;
        case "medium":
            exampleListSessions.forEach(session =>{
                listObjectSesions.push(
                    <MediumSesion key={session.date.toString()} session={session}></MediumSesion>
                )
            })
            break;
        case "short":
            exampleListSessions.forEach(session =>{
                listObjectSesions.push(
                    <ShortSesion key={session.date.toString()} session={session}></ShortSesion>
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

