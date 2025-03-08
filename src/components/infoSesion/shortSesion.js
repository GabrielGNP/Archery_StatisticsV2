import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { whiteMode, darkMode } from '../../styles/screens/infoSesion/themeStyles';
import { themeStyleView, switchStyleMode } from '../../global/variables';

export default function ShortSesion(prop) {

    const {date="30/08/2024", arrows=0, points=0, distance="0m", bowType="nothing", power="0lb", record="nothing"} = prop

    var styleView = darkMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }
    var procesedDate = date.split("/")
    switch (procesedDate[1]) {
        case "01":
            procesedDate[1]="Enero"
            break;
        case "02":
            procesedDate[1]="Febrero"
            break;
        case "03":
            procesedDate[1]="Marzo"
            break;
        case "04":
            procesedDate[1]="Abril"
            break;
        case "05":
            procesedDate[1]="Mayo"
            break;
        case "06":
            procesedDate[1]="Junio"
            break;
        case "07":
            procesedDate[1]="Julio"
            break;
        case "08":
            procesedDate[1]="Agosto"
            break;
        case "09":
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
    switch (record) {
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
            onPress = {() => console.log(procesedDate)}
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
        height:50,
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