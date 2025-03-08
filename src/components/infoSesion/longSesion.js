import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { whiteMode, darkMode } from '../../styles/screens/infoSesion/themeStyles';
import { themeStyleView, switchStyleMode } from '../../global/variables';

export default function LongSesion(prop) {

    const {date="30/08/2024", arrows=0, points=0, distance="0m", bowType="nothing", power="0lb", record="nothing"} = prop

    var styleView = darkMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
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
            onPress = {() => console.log("algo")}
            >
            <View style={stylesBasic.icon}>
                <Text style={{flex: 1, textAlign: "center", fontSize: 40}}>{iconRecord}</Text>
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
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{distance}</Text>
                </View>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>Arco</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{bowType}</Text>
                </View>
                <View style={[stylesBasic.cell, styleView.styles.cell]}>
                    <Text style={[stylesBasic.title, styleView.styles.title]}>Libraje</Text>
                    <Text style={[stylesBasic.data, styleView.styles.data]}>{power}</Text>
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
        height:50,
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