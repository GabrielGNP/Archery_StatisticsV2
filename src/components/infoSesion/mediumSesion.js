import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { whiteMode, darkMode } from './styles/themeStyles';
import { configBasic, switchStyleMode, getTypeSessionsList} from '../../global/variables';

export default function MediumSesion(prop) {

    const navigation = useNavigation();
    const {session={
        bow: "Recurvo",
        date: "9/8/2024",
        distance: 70,
        id_session: "1-1753226819839-774503",
        id_user: "1",
        name_type_session: "Clásico",
        pound: 45,
        setsList: [],
        time_edit: "2025-07-22 23:26:59.840"
    }, } = prop

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
    // console.debug("=========== mediumSession ======= ");
    // console.debug("__________ typeSession __________");
    // console.debug(typeSession);
    // console.debug("__________ session __________");
    // console.debug(session);
    // console.debug("__________ session.setsList __________");
    // console.debug(session.setsList);
    session.setsList.forEach((set) =>{
        set.points.forEach((point) => {
            if(point=="_")
                points=points+0
            else{
                // console.log(point)
                // console.log([typeSession.points.indexOf(point)])
                // console.log(parseInt(typeSession.values[typeSession.points.indexOf(point)]))
                points=points+parseInt(typeSession.values[typeSession.points.indexOf(point)])
                // console.log("===============================0")   
            }
            arrows++
        })
    })
    
    var procesedDate = date.split("/")
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
            style={[stylesBasic.container, styleView.styles.container, {paddingTop:0}]}
            onPress = {() => {navigation.navigate("ViewSession", {session:session})}}
            >
            <View style={stylesBasic.icon}>
                <Text style={{flex: 1, textAlign: "center", fontSize: 40}}>{iconRecord}</Text>
            </View>
            <View>
                <Text style={[stylesBasic.title, styleView.styles.title, {fontSize:15}]}>{typeSession.name}</Text>
            </View>
            <View style={[stylesBasic.row, styleView.styles.row]}>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.day, styleView.styles.day]}>{procesedDate[0]}</Text>
                </View>
                <View style={[stylesBasic.cell_up, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>{procesedDate[1]}</Text>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>{procesedDate[2]}</Text>
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
        </TouchableOpacity>
    )
}

const stylesBasic = StyleSheet.create({
    container:{
        borderWidth: 2,
        borderRadius: 15,
        paddingTop: 10,
        width:"100%",
        marginBottom: 20,
        elevation: 10,
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
        paddingRight:30
    },
    cell:{
        flex:1,
        flexDirection:"column",       
        justifyContent:"center",
    },
    cell_up:{
        flex:1.3,
        flexDirection:"column",       
        justifyContent:"center",
    },
    title:{
        textAlign:"center",
        fontWeight:"600",
        fontSize: 19
    },
    day:{
        textAlign:"center",
        fontSize: 40,
        fontWeight:"900",
    },
    data:{
        textAlign:"center",
        fontSize: 19,
        fontWeight:"600",
    }
})