import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { whiteMode, darkMode, table_darkMode, table_whiteMode } from './styles/themeStyles.js';
import { configBasic, switchStyleMode } from '../../global/variables.js';
import { Colors } from '../../global/colors.js';

import Table from '../../components/tables/table.js';
import LongSesion from '../../components/infoSesion/longSesion.js';
import FooterHome from '../../components/footers/footerHome.js';

export default function HomePage() {

    var session1={
        date:new Date(2024,8,9),
        bow: "Recurvo",
        pound: 45,
        distance: 70,
        setsList:[["8","7","8","6","9","8"],["7","8","8","7","9","9"],["7","8","8","10","9","X"]],
        record:"second",
        typeSession:0
    }
    var session2={
        date:new Date(2025,2,18),
        bow: "De poleas",
        pound: 40,
        distance: 50,
        setsList:[["8","7","8"],["7","8","8"],["7","8","8"],["7","9","9"],["10","9","X"]],
        record:"first",
        typeSession:0
    }

    var styleView = whiteMode
    var stylesTable = table_darkMode
    var shadowBar = [Colors.colorBack2, "transparent"]
    if(configBasic.darkMode==false){
        styleView = whiteMode
        stylesTable = table_whiteMode.styles
        shadowBar = [Colors.colorBack2, "transparent"]
    }else{
        styleView = darkMode
        stylesTable = table_darkMode.styles
        shadowBar = [Colors.colorBack3, "transparent"]
    }


    return <View style={[styles.Main_container, styleView.styles.Main_container]}>
      
        <LinearGradient 
            style={styles.shadow}
            colors={shadowBar}
            start={{x:0.5,y:0}}
            end={{x:0.5, y:1}}
        ></LinearGradient>
        <ScrollView style={styles.content_view}>

            {/* Tabla de clasificación */}
            <View style={styles.segment_view_1}>
                <Text style={[styles.title_segment, styleView.styles.title_segment]}>Clasificación General</Text>
                <Table 
                    titles={["Posición", "Usuario", "Puntaje"]} 
                    data= {[[15, "Arquero0", 272],[16, "Arquero1", 266],[17, "Arquero2", 243],[18, "Arquero3", 241],[19, "Arquero4", 240]]} 
                    stylesTable={stylesTable}
                    selected={2}
                    >
                </Table>
            </View>

            {/* Puntaje de la semana y cantidad de flechas */}
            <View style={[styles.segment_view_2,styleView.styles.segment_view_2]}>
                <View style={[styles.segment_text_view,styleView.styles.segment_text_view]}>
                    <Text style={[styles.title_segment_2, styleView.styles.title_segment]}>Puntaje de la semana</Text>
                    <Text style={[styles.data_segment, styleView.styles.data_segment]}>243</Text>
                </View>
                <View style={[styles.segment_text_view,styleView.styles.segment_text_view]}>
                    <Text style={[styles.title_segment_2, styleView.styles.title_segment]}>Cantidad de flechas en la semana</Text>
                    <Text style={[styles.data_segment, styleView.styles.data_segment]}>30</Text>
                </View>
            </View>

            {/* Última sesión */}
            <View style={styles.segment_view_1}>
                <Text style={[styles.title_segment, styleView.styles.title_segment]}>Última sesión</Text>
                {/* <LongSesion 
                    session={session1}
                    >
                </LongSesion> */}
            </View>

            {/* Mejor sesión */}
            <View style={styles.segment_view_1}>
                <Text style={[styles.title_segment, styleView.styles.title_segment]}>Mejor sesión</Text>
                {/* <LongSesion 
                    session={session2}
                    >
                </LongSesion> */}
            </View>

        </ScrollView>

        <FooterHome></FooterHome>
        
    </View>
}

const styles = StyleSheet.create({
    Main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow:{
        position:"absolute",
        top:0,
        width:"100%",
        height: 50,
        zIndex: 10
    },

    content_view:{
        backgroundColor: "transparent",
        height: "80%",
        width: "100%",
        padding: 10,
        display: "flex",
        flexDirection: "column",
    },
    segment_view_1:{
        flex: 1,
        marginTop: 15,
        marginBottom: 30,
    },
    segment_view_2:{
        flex: 1,
        margin: 10,
        padding: 5,
        display: "flex",
        flexDirection:"row",
        borderWidth:2,
        elevation: 5,  
        borderRadius:25
    },
    segment_text_view:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",       
        borderRadius:25,
        padding:5,
        borderWidth: 1
    },
    title_segment:{
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
    },
    title_segment_2:{
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
    },
    data_segment:{
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
    },

})

