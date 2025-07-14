import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView, Dimensions } from 'react-native';


import { whiteMode, darkMode} from './styles/themeStyles.js';
import { configBasic, switchStyleMode, exampleListSessions} from '../../global/variables.js';
import { Colors } from '../../global/colors.js';

import LongSesion from '../../components/infoSesion/longSesion.js';
import MediumSesion from '../../components/infoSesion/mediumSesion.js';
import ShortSesion from '../../components/infoSesion/shortSesion.js';
import FooterListSesions from '../../components/footers/footerListSesions.js';


import { useNavigation } from '@react-navigation/native';
import { readSessions } from '../../global/querys.js';
import { useSQLiteContext } from 'expo-sqlite';
// =========== TAREAS ===============
// Reacomodar la DB (agregar las IDs a los sets) ✅
// Cargar sessiones y sets por defecto en la DB ✅
// Leer las sessiones en objetos (con los sets y su información)
// Mostrarlos en el listado

export default function SesionsList() {

    const navigation = useNavigation();
    const db = useSQLiteContext();

    const [listSesions, setListSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    var viewGradientColors = [Colors.colorBlue2, Colors.colorBlue3]
    var styleView = whiteMode
    if(configBasic.darkMode==false){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
    
    async function getSessions(){
        try {
            setLoading(true);
            let sessions = await readSessions(db, configBasic.userID);
            setListSessions(sessions || []);
        } catch (error) {
            console.error("Error al cargar sesiones:", error);
            setListSessions([]);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(()=>{
        getSessions()
    },[])
    

    const listObjectSesions = () => {
        if (!listSesions || listSesions.length === 0) {
            return <Text>No hay sesiones disponibles</Text>;
        }
        switch (configBasic.modelViewSesions) {
            case "long":
                return listSesions.map(session => (
                    <LongSesion key={session.id_session} session={session} />
                ));
            case "medium":
                return listSesions.map(session => (
                    <MediumSesion key={session.id_session} session={session} />
                ));
            case "short":
                return listSesions.map(session => (
                    <ShortSesion key={session.id_session} session={session} />
                ));
            default:
                return <Text>Modo de vista no válido</Text>;
        }
    }
    
    return(
        <View style={[styles.Main_container, styleView.styles.Main_container]}>
            
            <ScrollView style={[styles.content_view]} 
                contentContainerStyle={{
                    flexDirection:"row",
                    flexWrap:"wrap"
                }}
                >
                {listObjectSesions()}
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

