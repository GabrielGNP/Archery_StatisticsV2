import React, {useState, useEffect} from "react"
import {View, StyleSheet, Text, TouchableOpacity} from "react-native"

import { themeStyleView } from "../../global/variables"
import { Colors } from "../../global/colors"
import { whiteMode, darkMode } from "./styles/themeStyles"


export default function Set(prop){
    const {numberSet, setPoints, setPosToChange, typeSession} = prop

    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }

    var componentsButtonsPoints = []
    // const [totalPoints, setTotalPoints] = useState(0)
    var totalPoints = 0
    function createButtonPoints(){
        var count = 0
        setPoints.forEach(point => {
            var valuePos = count
            componentsButtonsPoints.push(
                <TouchableOpacity key={valuePos} style={[styles.number_button,styleView.styles.number_button]} onPress={() => {setPosToChange([numberSet,valuePos])}}>
                    <Text style={[styles.text_number_button,styleView.styles.text_number_button]}>{point}</Text>
                </TouchableOpacity>
            )
            count++
        });
        setPoints.forEach((value)=>{
            if(value=="_")
                totalPoints=totalPoints+0
            else
                totalPoints=totalPoints+typeSession.values[typeSession.points.indexOf(value)]
        })
    }

    createButtonPoints();

    return (
        <View style={[styles.main_container,styleView.styles.main_container]}>
            <View style={{width:75, height:100}}>
                <View style={{}}>
                    <Text style={[styles.text,styleView.styles.text]}>Set</Text>
                    <Text style={[styles.text,styleView.styles.text]}>{numberSet+1}</Text>
                </View>
                <View style={[styles.points_container,styleView.styles.points_container]}>
                    <Text style={[styles.text_total_points,styleView.styles.text_total_points]}>puntos</Text>
                    <Text style={[styles.text_total_points,styleView.styles.text_total_points]}>{totalPoints}</Text>
                </View>
            </View>
            <View style={styles.container_buttons_points}>
                {componentsButtonsPoints}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    main_container:{
        borderRadius:15,
        borderWidth:2,
        width:"98%",
        margin:5,
        minHeight:100,
        paddingTop:10,
        alignSelf:"center",
        flexDirection:"row",
    },
    number_button:{
        marginBottom:10,
        marginLeft:10,
        borderRadius:7,
        borderWidth:3,
        width:40,
        height:40
    },
    text_number_button:{
        height:"100%",
        width:"100%",
        color:Colors.colorBlue1,
        textAlign:"center",
        fontSize:25,
        fontWeight:500
    },
    points_container:{
        width:"100%",
        borderRadius:10, 
        borderWidth:2,
        position:"absolute",
        bottom:-1,
        left:-1
    },
    text:{
        textAlign:"center",
        fontSize:18,
        fontWeight:600
    },
    text_total_points:{
        textAlign:"center",
        fontSize:16,
        fontWeight:600
    },
    container_buttons_points:{
        width:"80%",
        flexDirection:"row",
        flexWrap:"wrap",
        
        alignContent:"center"
    }
})