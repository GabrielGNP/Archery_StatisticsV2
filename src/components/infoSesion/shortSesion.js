import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { whiteMode, darkMode } from './styles/themeStyles';
import { configBasic, switchStyleMode, getTypeSessionsList } from '../../global/variables';

export default function ShortSesion(prop) {

    const navigation = useNavigation();
    const {session={
        date:new Date(2024,0,1),
        bow: "Recurvo",
        pound: 35,
        distance: 20,
        setsList:[[10,10,10,10,10,10],[10,10,10,10,10,10],["X","X","X","X","X","X"]],
        record:"second",
        typeSession
    },} = prop

    var styleView = darkMode
    if(configBasic.darkMode==false){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }

    var date = session.date

    //obtener puntaje y flechas
    var arrows = 0
    var points = 0
    let typeSessionsList = getTypeSessionsList();
    var typeSession = typeSessionsList.find(item => item.name === session.name_type_session);
    // console.log(typeSession);
    session.setsList.forEach((set) =>{
        set.points.forEach((point) => {
                if(point=="_")
                points=points+0
            else
                points=points+typeSession.values[typeSession.points.indexOf(point)]
            
            arrows++
        })
    })

    // console.log("Date => ", date)
    var procesedDate = date.split("/")
    // console.log(typeof(procesedDate[1]), " => ", procesedDate[1])
    switch (procesedDate[1]) {
        case "01", "1":
            procesedDate[1]="Enero"
            break;
        case "02", "2":
            procesedDate[1]="Febrero"
            break;
        case "03", "3":
            procesedDate[1]="Marzo"
            break;
        case "04", "4":
            procesedDate[1]="Abril"
            break;
        case "05", "5":
            procesedDate[1]="Mayo"
            break;
        case "06", "6":
            procesedDate[1]="Junio"
            break;
        case "07", "7":
            procesedDate[1]="Julio"
            break;
        case "08", "8":
            procesedDate[1]="Agosto"
            break;
        case "09", "9":
            procesedDate[1]="Septiembre"
            break;
        case "10":
            procesedDate[1]="Octubre"
            break;
        case "11":
            procesedDate[1]="Noviembre"
            break;
        case "12":
            procesedDate[1]="Diciembre"
            break;
        default:
            console.log("no lo reemplaza")
            break;
    }
    
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
            style={[stylesBasic.container, styleView.styles.container]}
            onPress = {() => {navigation.navigate("ViewSession", {session:session})}}
            >
            <View style={stylesBasic.icon}>
                <Text style={{flex: 1, textAlign: "center", fontSize: 40}}>{iconRecord}</Text>
            </View>
            <View style={[stylesBasic.row, styleView.styles.row]}>
                    <Text style={[stylesBasic.day, styleView.styles.day]}>{procesedDate[0]}</Text>
                </View>
            <View style={[stylesBasic.row, styleView.styles.row]}>
                <View style={[stylesBasic.cell_up, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>{procesedDate[1]}</Text>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>{procesedDate[2]}</Text>
                </View>
            </View>
            <View style={[stylesBasic.row, styleView.styles.row]}>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title_2, styleView.styles.title_2]}>flechas</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{arrows}</Text>
                </View>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title_2, styleView.styles.title_2]}>puntaje</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{points}</Text>
                </View>
            </View>
            <View>
                <Text style={[stylesBasic.title_2, styleView.styles.title_2]}>{typeSession.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const stylesBasic = StyleSheet.create({
    container:{
        borderWidth: 2,
        borderRadius: 15,
        paddingTop: 5,
        paddingBottom: 10,
        margin: 6,
        marginTop:0,
        marginBottom:12,
        elevation: 10,
        width:"30%",
    },
    icon:{
        position:"absolute",
        right:-7,
        top:0,
        width:50,
        height:55,
    },
    row:{
        flexDirection:"row",
    },
    cell:{
        flex:1,
        flexDirection:"column",       
        justifyContent:"center",
    },
    cell_up:{
        flex:1.2,
        flexDirection:"column",       
        justifyContent:"center",
    },
    title:{
        textAlign:"center",
        fontWeight:"600",
        fontSize: 18,
    },
    title_2:{
        textAlign:"center",
        fontWeight:"600",
        fontSize: 15,
    },
    day:{
        textAlign:"center",
        fontSize: 40,
        fontWeight:"900",
        width:"100%",
    },
    data:{
        textAlign:"center",
        fontSize: 15,
        fontWeight:"600",
    }
})