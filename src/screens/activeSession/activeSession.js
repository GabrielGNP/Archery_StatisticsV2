import React ,{useState, useEffect, useRef } from "react"
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native"

import { exampleListSessions, configBasic } from "../../global/variables"
import { whiteMode, darkMode } from "./styles/themeStyles"
import { Colors } from "../../global/colors"

import Set from "../../components/sets/set"
import FooterActiveSession from "../../components/footers/footerActiveSession"
import { LinearGradient } from "expo-linear-gradient"
import NumericPad from "../../components/modals/numericPad/numericPad"

var gradientColorsTop = [Colors.colorBlue3,Colors.colorBlue2]
var gradientColorsBottom = [Colors.colorBlue3,Colors.colorBlue2]
var styleView = whiteMode
if(configBasic.darkMode==false){
    styleView = whiteMode
    gradientColorsTop = [Colors.colorBack2,"transparent"]
    gradientColorsBottom = ["transparent",Colors.colorBack2]
}else{
    styleView = darkMode
    gradientColorsTop = [Colors.colorBack3,"transparent"]
    gradientColorsBottom = ["transparent", Colors.colorBack3]
}

export default function ActiveSession({route}){
    const { date, distance, bow, pound, sets, arrows, sessionType} = route.params

    console.log(sessionType);

    var auxListSets = []
    for (let set = 0; set < sets; set++) {
        var auxArrows = []
        for (let arrow = 0; arrow < arrows; arrow++) {
            auxArrows.push("_")
        }
        auxListSets.push(auxArrows)
    }

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const formatSelectedDate = (day, month, year) => {
        const monthName = months.find((_, index) => index === month) || "";
        if (day.toString().length==1)
            day="0"+day.toString()
        return `${day}  ${monthName}  ${year}`;
      };
      
    
    const textDate = formatSelectedDate(date.getDate(),date.getMonth(),date.getFullYear())

    const [ viewNumPad, setViewNumPad] = useState(false);
    const [ listSets , setListSets ] = useState(auxListSets)
    const [ posToChange, setPosToChange ] = useState(null)
    const [componentSets, setComponentSets] = useState([])
    
    var session = {
        date: date,
        bow: bow,
        pound: pound,
        distance: distance,
        setsList:listSets,
        record:"-",
        typeSession:sessionType.id
    }

    function createSets(){
        var auxComponentSets = []
        var count = 0
        listSets.forEach(set => {
            auxComponentSets.push(
                <Set key={count} 
                    numberSet={count} 
                    setPoints={set} 
                    setPosToChange={setPosToChange} 
                    typeSession={sessionType}>
                </Set>)
            count++
        });
        console.log(auxComponentSets)
        setComponentSets(auxComponentSets)
    }

    useEffect(() =>{
        createSets();
        exampleListSessions.push(session)
    },[])

    const refScrollView = useRef(null)
    function scrollEnd(){
        refScrollView.current.scrollToEnd({animated: true})
    }

    useEffect(() => {
        if (posToChange !==null){
            setViewNumPad(true)
            console.log(posToChange)
        }
    },[posToChange])
   
    useEffect(() =>{
        if(viewNumPad==false){
            setPosToChange(null)
        }
    },[viewNumPad])
    
    function addNewSet(){
        console.log("addNewSet")
        var auxListSets = listSets
        var auxArrows = []
        for (let arrow = 0; arrow < arrows; arrow++) {
            auxArrows.push("-")
        }
        auxListSets.push(auxArrows)
        setListSets(auxListSets)
        console.log("llega")
        createSets();
        scrollEnd();
    }
    
    

    return (
        <View style={[styles.main_container, styleView.styles.main_container]}>
            <View style={[styles.date_container,styleView.styles.date_container]}>
                <Text style={[styles.date_text,styleView.styles.date_text]}>{textDate/*09 Septiembre 2025*/}</Text>
            </View>
            <View style={styles.data_session}>
                <View style={styles.data_container}>
                    <View style={styles.data}>
                        <Text style={[styles.info_data,styleView.styles.info_data]}>Arco:</Text>
                        <Text style={[styles.data_text,styleView.styles.data_text]}>{bow}</Text>
                    </View>
                    <View style={styles.data}>
                        <Text style={[styles.info_data,styleView.styles.info_data]}>Libraje:</Text>
                        <Text style={[styles.data_text,styleView.styles.data_text]}>{pound} lb</Text>
                    </View>
                </View>
                <View style={styles.data_container}>
                    <Text style={[styles.info_data,styleView.styles.info_data]}>Distancia:</Text>
                    <Text style={[styles.data_text,styleView.styles.data_text]}>{distance} m</Text>
                </View>
            </View>
            <View style={{flex:1}}>
                <LinearGradient
                    colors={gradientColorsTop}
                    pointerEvents="none"
                    style={[styles.shadow]}
                    start={{x:0.5,y:0.05}}
                    end={{x:0.5, y:1}}
                ></LinearGradient>
                <LinearGradient
                    colors={gradientColorsBottom}
                    pointerEvents="none"
                    style={[styles.shadow,styles.shadow_bottom]}
                    start={{x:0.5,y:0.05}}
                    end={{x:0.5, y:1}}
                ></LinearGradient>
                <ScrollView ref={refScrollView} style={{width:"100%",marginTop:10}}>
                    <View style={{height:20}}></View>
                    {/* <Set numberSet={0} setPosToChange={setPosToChange}></Set>
                    <Set></Set>
                    <Set></Set> */}
                    {componentSets}

                    <View style={{height:30}}></View>
                </ScrollView>
            </View>
            
            <FooterActiveSession addNewSet={() => {addNewSet()}}></FooterActiveSession>
            <NumericPad visible={viewNumPad} 
                posToChange={posToChange} 
                listSets={listSets} 
                setListSets={()=>{setListSets}} 
                reloadData={()=>{createSets()}} 
                setViewNumPad={() => {setViewNumPad(false)}}
                typeSession={sessionType} />
        </View>
    )
}


const styles = StyleSheet.create({
    main_container:{
        flex: 1,
        alignItems: 'center',
    },
    date_container:{
        height:40,
        width:"80%",
        borderWidth:2,
        borderTopWidth:0,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        justifyContent:"center",
        elevation:10
    },
    date_text:{
        fontSize:21,
        fontWeight:600,
        alignSelf:"center",
    },
    data_session:{
        width:"100%",
        paddingHorizontal:40,
    },
    data_container:{
        flexDirection:"row",
        justifyContent:"center"
    },
    data:{
        margin:1,
        flex:1,
        flexDirection:"row",
        justifyContent:"center"

    },
    info_data:{
        fontSize:17,
        paddingTop:20,
    },
    data_text:{
        fontSize:17,
        fontWeight:700,
        paddingLeft:5,
        paddingTop:20,
    },
    shadow:{
        width:"100%",
        height:40,
        top:0,
        position:"absolute",
        zIndex:1,
    },
    shadow_bottom:{
        bottom:0,
        top:null
    },

})