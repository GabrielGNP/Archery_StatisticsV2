import React, {useState} from "react"
import { View,Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"

import { whiteMode, darkMode} from "./styles/themeStyles"
import { themeStyleView, typeSesionsList } from "../../global/variables"
import { Colors } from "../../global/colors"
import { Feather, FontAwesome } from '@expo/vector-icons';


var directionRowTable = ""
export default function ViewSession({route}){
    const {session} = route.params
    console.log(session)

    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
    const [colorButDirectionLeft, setColorButDirL] = useState(Colors.colorBlue2);
    const [colorButDirectionRight, setColorButDirR] = useState(Colors.colorBlue1);
    const [DirectionContainerTable, setDirectionContainerTable] = useState("column");
    const [DirectionLineTable, setDirectionLineTable] = useState("row");

    directionRowTable = DirectionLineTable;
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

    var typeSession = typeSesionsList.find(item => item.id === session.typeSession);

    //obtener puntaje y flechas
    var arrows = 0
    var points = 0
    var pointsCount = new Array(typeSession.points.length+1).fill(0);
    var titlesTable = []

    titlesTable.push(<Text style={[styles.name_info_table,{width:60}]}>Flecha</Text>);
    for (let i = 1; i < session.setsList[0].length+1; i++) {
        titlesTable.push(<Text style={[styles.name_info_table,{width:DirectionLineTable=="row"?40:60}]}>{i}</Text>)
    }
    titlesTable.push(<Text style={[styles.name_info_table,{width:60}]}>Total</Text>)
    // console.log("titlesTable=>",titlesTable)
    

    var rowsSets = []

    session.setsList.forEach((set, indexSet) =>{ //De sesiones
        var cellInRow = []
        var pointInSet = 0
        cellInRow.push(<Text style={[styles.name_info_table,{width:60}]}>{"Set" + (indexSet+1)}</Text>)
        set.forEach((point, indexArr) => { //De flechas
            if(point=="_"){
                points=points+0
                pointInSet = pointInSet + 0
                pointsCount[typeSession.points.length] = pointsCount[typeSession.points.length]+1;
            }
            else{
                var pointShot = typeSession.values[typeSession.points.indexOf(point)]
                points=points+pointShot
                pointInSet = pointInSet + pointShot
                pointsCount[typeSession.points.indexOf(point)] = pointsCount[typeSession.points.indexOf(point)]+1;
            }
            cellInRow.push(<Text key={indexArr} style={styles.data_info_table}>{point}</Text>)
            arrows++
        })
        cellInRow.push(<Text style={[styles.data_info_table,{width:60, backgroundColor:Colors.colorBlue3, color:Colors.colorBlue1}]}>{pointInSet}</Text>)
        rowsSets.push(
            <View style={{flexDirection:DirectionLineTable, alignItems:"center"}}>
                {cellInRow}
            </View>)
    })
    

    let maxCellsPR = 6
    let cantRows = Math.ceil(typeSession.points.length / maxCellsPR)
    let heightContainer = 75*cantRows
    let heightCell = 100/cantRows
    let cellsCountArrows = []

    pointsCount.slice().reverse().forEach((item, index) => {
        if(cantRows > Math.floor((index-1) / maxCellsPR)+1 && index>0)
        {
            cellsCountArrows.push(
                <View key={index} 
                    style={{borderRightWidth:1.5, borderBottomWidth:1.5, 
                        borderRightColor:"white", borderBottomColor:"white", 
                        justifyContent:"center", width:50, minHeight:"60",
                        height:`${heightCell}%`}}
                    >
                    <Text style={styles.text_points}>{typeSession.points[typeSession.points.length-index]}'s</Text>
                    <Text style={styles.value_points}>{item}</Text>
                </View>
            )
        }else if(index>0){
            cellsCountArrows.push(
                <View key={index} 
                    style={{borderRightWidth:1.5, borderRightColor:"white", 
                    justifyContent:"center", width:50, minHeight:"60",
                    height:`${heightCell}%`}}
                >
                    <Text style={styles.text_points}>{typeSession.points[typeSession.points.length-index]}'s</Text>
                    <Text style={styles.value_points}>{item}</Text>
                </View>
            )
        }
    })

    let tableCountArrows = 
    <View style={{height:heightContainer, width:"100%", marginTop:30, padding:10, 
        flexDirection:"row", justifyContent:"center", alignContent:"space-around",
        marginBottom:30}}
    >
        <View style={[{flexWrap:"wrap",maxWidth:"85%", flexDirection:"row-reverse", justifyContent:"flex"}]}>
            {cellsCountArrows}
        </View>
        <View style={[{alignSelf:"center", width:"15%",
            height:"100%", justifyContent:"center"
        }]}>
            <Text style={styles.text_points}>_'s</Text>
            <Text style={styles.value_points}>{pointsCount[pointsCount.length-1]}</Text>
        </View>
    </View>

    var averages = points/arrows
  

    return(
        <View style={[styles.main_container, styleView.styles.main_container]}>
            <View style={[styles.date_container,styleView.styles.date_container]}>
                <Text style={[styles.date_text,styleView.styles.date_text]}>{textDate/*09 Septiembre 2025*/}</Text>
            </View>
            <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
                
                {/*Datos de sesión */}
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
                            <Text style={[styles.data_text,{paddingTop:0},styleView.styles.data_text]}>{points}</Text>
                        </View>
                    </View>
                </View>

                {/* ==== NUEVO Contador de flechas por puntos ==== */}
                {tableCountArrows}
                
                {/* ==== Tabla de puntos por set ==== */}
                {/*Botones de dirección */}
                <View style={styles.container_direction_buttons}>
                    <Text style={{color:Colors.colorBlue1, fontSize:18, fontWeight:600, marginRight:10}}>Ordenar</Text>
                    <TouchableOpacity 
                        style={[styles.button_direction,{backgroundColor:colorButDirectionLeft}]}
                        onPress={()=>{
                            setColorButDirL(Colors.colorBlue2);
                            setColorButDirR(Colors.colorBlue1);
                            setDirectionContainerTable("column");
                            setDirectionLineTable("row");
                        }}
                    >
                        <Feather name="arrow-right" size={30} color={Colors.colorBlue4} style={{flex: 1, textAlign: "center"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button_direction, {backgroundColor:colorButDirectionRight}]}
                        onPress={()=>{
                            setColorButDirL(Colors.colorBlue1);
                            setColorButDirR(Colors.colorBlue2);
                            setDirectionContainerTable("row");
                            setDirectionLineTable("column");
                        }}
                    >
                        <Feather name="arrow-down" size={30} color={Colors.colorBlue4} style={{flex: 1, textAlign: "center"}}/>
                    </TouchableOpacity>
                </View>
                {/*Tabla de datos */}
                <ScrollView style={{maxHeight: 400}}
                    horizontal={true} 
                    nestedScrollEnabled={true} 
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{minWidth: '100%'}}>
                    <View style={{flexDirection:DirectionContainerTable, margin:10}}>
                        {/*top*/}
                        <View style={{flexDirection:DirectionLineTable}}>
                            {titlesTable}
                        </View>
                        <ScrollView style={{backgroundColor:Colors.colorBlue4}} nestedScrollEnabled={true} contentContainerStyle={{flexGrow: 1}}>
                            {/*linea*/}
                            <View style={{flexDirection:DirectionContainerTable}}>
                                {rowsSets}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </ScrollView>
            
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

    container_direction_buttons:{
        flexDirection:"row", 
        alignItems:"flex-end", 
        marginLeft:10, 
        borderBottomWidth:1, 
        borderColor:Colors.colorBlue1
    },
    button_direction:{
        backgroundColor:Colors.colorBlue1, 
        width:34, 
        height:34, 
        borderRadius:7, 
        borderWidth:2, 
        borderColor:Colors.colorBlue4, 
        elevation:1, 
        marginRight:5
    },
    container_points_count:{
        height:150,
        width:"100%",
        marginTop:30,
        padding:20,
        flexDirection:"row",
        justifyContent:"center",
    },
    column_points_count:{
        flex:1,
        borderRightWidth:1.5,
        borderColor:"white"
    },
    cell_points_count:{
        borderBottomWidth:1.5,
        borderColor:"white"
    },
    text_points:{
        color:Colors.colorBlue1,
        fontSize:18,
        fontWeight:600,
        textAlign:"center"
    },
    value_points:{
        color:Colors.colorBlue2,
        fontSize:18,
        fontWeight:600,
        textAlign:"center",
    },


    // === Tabla ===
    name_info_table:{
        color:Colors.colorBlue1,
        fontSize:17,
        fontWeight:800,
        width: 40,
        padding:0,
        textAlign:"center",
        textAlignVertical:"center",
        height:30,
        margin:1,
    },
    data_info_table:{
        color:Colors.colorBlue2,
        fontSize:17,
        fontWeight:800,
        width:40,
        padding:0,
        textAlign:"center",
        textAlignVertical:"center",
        height:30,
        margin:1
    }
})
