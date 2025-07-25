import React ,{useState, useEffect, useRef, useCallback } from "react"
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native"

import { configBasic } from "../../global/variables"
import { whiteMode, darkMode } from "./styles/themeStyles"
import { Colors } from "../../global/colors"

import Set from "../../components/sets/set"
import FooterActiveSession from "../../components/footers/footerActiveSession"
import { LinearGradient } from "expo-linear-gradient"
import NumericPad from "../../components/modals/numericPad/numericPad"
import { formatDateToDMY, parseDateToUTCCleaned, parseDMYToDate } from "../../global/functions"
import { createOrReplaceSet, getSession, updateTimeEditInSession } from "../../global/querys"
import { useSQLiteContext } from 'expo-sqlite';

//Problemas con el guardar los datos modificados, siempre falta uno
//sugerencia de claude
//markAsChanged(newSession); pero markAsChanged pide un parámetro no definido?
// que está pasando en eso realmente?




// Función para guardar la información con control de tiempo de inactividad
const useAutosave = (isReady, db, delay = 5000) => {
    const timeoutRef = useRef(null);
    const lastSavedRef = useRef(null);

    const saveAllData = async (sessionData) => {
        try {
            console.log("Iniciando guardado en DB...");
            console.debug("============")
            console.debug("datos a guardar=>", sessionData)
            console.debug("datos a guardar=>", sessionData.setsList)
            console.debug("============")
            await db.withTransactionAsync(async () => {
                for (const set of sessionData.setsList){
                    await createOrReplaceSet(db, sessionData.id_session, set)
                }

                await updateTimeEditInSession(db, sessionData.id_session);
            });
            console.log("Todos los datos guardados correctamente");
            // await getSession(db, sessionData)
        } catch (error) {
            console.error("Error al guardar los datos");
            console.error(error)
        }
    }

    const triggerSave = useCallback((dataToSave) => {
        if(!isReady){
            console.log("Datos no listos para guardar");
            return;
        }
        console.log("Cambios detectados, iniciando/reiniciando debounce...");

        if (timeoutRef.current){
            clearTimeout(timeoutRef.current);
            console.log("Timer anterior cancelado - reiniciando timer");
        }

        const currentSnapshot = JSON.stringify(dataToSave);
        timeoutRef.current = setTimeout(() =>{
            if (lastSavedRef.current !== currentSnapshot){
                console.log("Guardando cambios en DB...");
                const sessionToSave = JSON.parse(currentSnapshot);
                saveAllData(sessionToSave);
                lastSavedRef.current = currentSnapshot;
            }else{
                console.log("Sin cambios reales detectados");
            }

            timeoutRef.current = null;
        }, delay);
        
    },[isReady, delay, db]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current){
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }
    }, []);

    return triggerSave;
}

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
    // const {date, distance, bow, pound, sets, arrows, sessionType} = route.params

    // Crear los componentes sets en función de los datos de sets en el objeto session, no crearlos desde los valores sets y arrows
    const { idSession, sessionType} = route.params
    let arrows = 0;
    
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    const formatSelectedDate = (day, month, year) => {
        const monthName = months.find((_, index) => index === month) || "";
        if (day.toString().length==1)
            day="0"+day.toString()
        return `${day}  ${monthName}  ${year}`;
    };

    const db = useSQLiteContext();

    const [ viewNumPad, setViewNumPad] = useState(false);
    const [ posToChange, setPosToChange ] = useState(null)
    const [ isDataReady, setIsDataReady ] = useState(false);

    const [textDate, setTextDate] = useState("0/0/0");
    const [session, setSession] = useState({
      bow: "Recurvo",
      date: formatDateToDMY(new Date()),
      distance: 70,
      id_session: "1-0000000000000-000000",
      id_user: "1",
      name_type_session: "Clásico",
      pound: 45,
      setsList: [
        //  {n_set: 1, points: ["7","8","9"]}
      ],
      time_edit: parseDateToUTCCleaned(new Date())
    });
    
    const markAsChanged = useAutosave(isDataReady, db);
    useEffect(() =>{
        const initialConstruct = (async  () => {
            let sessionLoaded = await getSession(db, idSession)
            setSession(sessionLoaded);
            setTimeout(() => {
                
            }, 50);
            // console.debug("=========== session =============")
            // console.debug("session=>",session)
            // console.debug("=========== setsList =============")
            // console.debug("session.setsList=>",session.setsList)
            // console.debug("=========== session_type =============")
            // console.debug("session.bame_type_session=>",session.name_type_session);
            // console.debug("sessionType=>",sessionType);
            // console.debug("========================")

            let date = parseDMYToDate(session.date);
            setTextDate(formatSelectedDate(date.getDate(),date.getMonth(),date.getFullYear()))

            setIsDataReady(true)
        })
        initialConstruct();        
    },[])

    const refScrollView = useRef(null)
    function scrollEnd(){
        refScrollView.current.scrollToEnd({animated: true})
    }

    useEffect(() => {
        if (posToChange !==null){
            setViewNumPad(true)
            // console.debug(posToChange)
        }
    },[posToChange])
   
    useEffect(() =>{
        if(viewNumPad==false){
            setPosToChange(null)
        }
    },[viewNumPad])
    
    function addNewSet() {
        console.debug("addNewSet")
        if (arrows > 0) {
            const auxArrows = Array(arrows).fill("_")
            const newList = [...listSets, auxArrows]
            setListSets(newList)
            console.debug("agregó un nuevo set")
            setTimeout(() => {
                scrollEnd()
            }, 100);
        }
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
                        <Text style={[styles.data_text,styleView.styles.data_text]}>{session.bow}</Text>
                    </View>
                    <View style={styles.data}>
                        <Text style={[styles.info_data,styleView.styles.info_data]}>Libraje:</Text>
                        <Text style={[styles.data_text,styleView.styles.data_text]}>{session.pound} lb</Text>
                    </View>
                </View>
                <View style={styles.data_container}>
                    <Text style={[styles.info_data,styleView.styles.info_data]}>Distancia:</Text>
                    <Text style={[styles.data_text,styleView.styles.data_text]}>{session.distance} m</Text>
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
                    { isDataReady && session ? (
                        session.setsList.map((set) => (
                        <Set
                            key={set.n_set}
                            numberSet={set.n_set}
                            setPoints={set.points}
                            setPosToChange={setPosToChange}
                            typeSession={sessionType}
                        />
                        ))
                        // console.debug("crea los sets")
                    ) : (<Text style={[styleView.styles.info_data]}>Cargando sets...</Text>)
                    }

                    <View style={{height:30}}></View>
                </ScrollView>
            </View>
            
            <FooterActiveSession addNewSet={() => {addNewSet()}}></FooterActiveSession>
            <NumericPad visible={viewNumPad} 
                posToChange={posToChange} 
                session={session} 
                setSession={(newSession) => {
                    setSession(newSession)
                    markAsChanged(newSession);
                    setViewNumPad(false);
                }} 
                closeNumPad={()=> {setViewNumPad(false)}}
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