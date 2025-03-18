import React from "react"
import { View,Text, StyleSheet } from "react-native"

import { whiteMode, darkMode} from "./styles/themeStyles"
import { themeStyleView } from "../../global/variables"
import { Background } from "@react-navigation/elements"

export default function ViewSession({route}){
    const {session} = route.params
    console.log(session)

    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }

    //formateador de fecha
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const formatSelectedDate = (day, month, year) => {
        const monthName = months.find((_, index) => index === month) || "";
        if (day.toString().length==1)
            day="0"+day.toString()
        return `${day}  ${monthName}  ${year}`;
      };
    const textDate = formatSelectedDate(session.date.getDate(),session.date.getMonth(),session.date.getFullYear())

    //obtener puntaje y flechas
    var arrows = 0
    var points = 0
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
    var averages = points/arrows

    return(
        <View style={[styles.main_container, styleView.styles.main_container]}>
            <View style={[styles.date_container,styleView.styles.date_container]}>
                <Text style={[styles.date_text,styleView.styles.date_text]}>{textDate/*09 Septiembre 2025*/}</Text>
            </View>
            <View style={styles.data_session}>
                <View style={[styles.data_container_row,styles.data_center]}>
                    <View style={styles.data}>
                        <Text style={[styles.info_data,styleView.styles.info_data]}>Arco</Text>
                        <Text style={[styles.data_text,styleView.styles.data_text]}>{session.bow}</Text>
                    </View>
                    <View style={styles.data}>
                        <Text style={[styles.info_data,styleView.styles.info_data]}>Libraje</Text>
                        <Text style={[styles.data_text,styleView.styles.data_text]}>{session.pound} lb</Text>
                    </View>
                </View>
                <View style={[styles.data_container_row,styles.data_center]}>
                    <Text style={[styles.info_data,styleView.styles.info_data]}>Distancia</Text>
                    <Text style={[styles.data_text,styleView.styles.data_text]}>{session.distance} m</Text>
                </View>
                <View style={[styles.data_container_row,styles.data_center]}>
                    <View style={[styles.data_container_column,styles.data_left,{height:100}]}>
                        <View style={[styles.data,styles.data_left]}>
                            <Text style={[styles.info_data,styleView.styles.info_data]}>Flechas totales</Text>
                            <Text style={[styles.data_text,styleView.styles.data_text]}>{arrows}</Text>
                        </View>
                        <View style={[styles.data,styles.data_left]}>
                            <Text style={[styles.info_data,styleView.styles.info_data]}>Promedio</Text>
                            <Text style={[styles.data_text,styleView.styles.data_text]}>{averages.toPrecision(2)}</Text>
                        </View>
                    </View>
                    <View style={[styles.data,styles.data_container_column,styles.data_center]}>
                        <Text style={[styles.info_data,{fontWeight:700},styleView.styles.info_data]}>Puntos</Text>
                        <Text style={[styles.data_text,{paddingTop:0},styleView.styles.data_text]}>{session.pound} lb</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    main_container:{
        flex: 1,
        alignItems: 'center',        
    },
    date_container:{
        height:50,
        width:"80%",
        borderWidth:2,
        borderTopWidth:0,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        justifyContent:"center",
        elevation:10,
    },
    date_text:{
        fontSize:23,
        fontWeight:600,
        alignSelf:"center",
    },
    data_session:{
        width:"100%",
        paddingHorizontal:20,
    },
    data_container_row:{
        flexDirection:"row",
    },
    data_container_column:{
        flexDirection:"column",
    },
    data_center:{
        justifyContent:"center"
    },
    data_left:{
        justifyContent:"left"
    },
    data:{
        margin:1,
        flex:1,
        flexDirection:"row",
        justifyContent:"center"

    },
    info_data:{
        fontSize:21,
        paddingTop:20,
        textAlign:"center"
    },
    data_text:{
        fontSize:21,
        fontWeight:700,
        paddingLeft:5,
        paddingTop:20,
        textAlign:"center",
    },
})