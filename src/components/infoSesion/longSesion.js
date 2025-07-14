import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { whiteMode, darkMode } from './styles/themeStyles';
import { configBasic, switchStyleMode, typeSesionsList } from '../../global/variables';

export default function LongSesion(prop) {

    const navigation = useNavigation();
    const {session={
        id_session: 1,
        date: "9/8/2024",
        bow: "Recurvo",
        pound: 35,
        distance: 20,
        setsList:[[10,10,10,10,10,10],[10,10,10,10,10,10],["X","X","X","X","X","X"]],
        record:"second",
        typeSession:0
    }} = prop

    var styleView = darkMode
    if(configBasic.darkMode==false){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
    //obtener y transformar fecha
    // var day = session.date.getDate()
    // var month = (parseInt(session.date.getMonth())+1).toString();
    // var year = session.date.getFullYear()
    // if (month.length == 1)
    //     month = "0"+month
    // var date = day+"/"+month+"/"+year
    var date = session.date

    //obtener puntaje y flechas
    var arrows = 0
    var points = 0
    var typeSession = typeSesionsList.find(item => item.id === session.type_session);

    session.setsList.forEach((set) =>{
        set.points.forEach((point) => {
            if(point=="_")
                points=points+0
            else{
                points=points+typeSession.values[typeSession.points.indexOf(point)]   
            }
            arrows++
        })
    })


    var iconRecord
    switch (session.record) {
        case "first":
            iconRecord = "🥇"
            break;
        case "second":
            iconRecord = "🥈"
            break;
        case "thirt":
            iconRecord = "🥉"
            break;
        default:
            iconRecord = ""
            break;
    }

    return (
        <TouchableOpacity 
            style={[stylesBasic.container, styleView.styles.container, {paddingTop:0}]}
            onPress = {() => {
                navigation.navigate("ViewSession", {session:session})
            }}
            >
            <View style={stylesBasic.icon}>
                <Text style={{flex: 1, textAlign: "center", fontSize: 40}}>{iconRecord}</Text>
            </View>
            <View>
                <Text style={[stylesBasic.title, styleView.styles.title, {fontSize:15}]}>{typeSession.name}</Text>
            </View>
            <View style={[stylesBasic.row, styleView.styles.row]}>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title ,styleView.styles.title]}>Fecha</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{date}</Text>
                </View>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>flechas</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{arrows}</Text>
                </View>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>puntaje</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{points}</Text>
                </View>
            </View>
            <View style={[stylesBasic.row, styleView.styles.row]}>
            <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>Distancia</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{session.distance}</Text>
                </View>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>Arco</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{session.bow}</Text>
                </View>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>Libraje</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{session.pound}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const stylesBasic = StyleSheet.create({
    container:{
        borderWidth: 2,
        borderRadius: 25,
        paddingTop: 10,
        width:"100%",
        marginBottom: 20,
        elevation: 10
    },
    icon:{
        position:"absolute",
        right:-5,
        top:0,
        width:50,
        height:55,
    },
    row:{
        flexDirection:"row",
        marginBottom: 10,
        width:"100%"
    },
    cell:{
        flex:1,
        width:"33%",
        flexDirection:"column"
    },
    title:{
        textAlign:"center",
        fontWeight:"500",
        fontSize: 19
    },
    data:{
        textAlign:"center",
        fontSize: 19,
        fontWeight:"500",
    }
})