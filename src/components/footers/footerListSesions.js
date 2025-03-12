import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '../../global/colors.js'
import { whiteMode, darkMode} from './styles/themeStyles.js';
import { themeStyleView, switchStyleMode } from '../../global/variables.js';



export default function FooterListSesions(prop) {

    const navigation = useNavigation();
    
    var viewGradientColors = [Colors.colorBlue2, Colors.colorBlue3]
    var styleView = whiteMode
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
    }else{
        styleView = darkMode
    }

    return(
        <View style={[styles.footer, styleView.styles.footer]}>
            <TouchableOpacity 
                style={styles.container_icon_footer}
                onPress={function nothing(){console.log("voy a las estadísticas");}}
            >
                <Feather name="activity" size={36} color={Colors.colorBlue2} style={[styles.icons1_footer, styleView.styles.icons1_footer]}/>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.container_icon_footer}
                onPress={function nothing(){console.log("a usuarios");}}
            >
                <Feather name="users" size={36} color={Colors.colorBlue2} style={[styles.icons1_footer, styleView.styles.icons1_footer]}/>
            </TouchableOpacity>
            <LinearGradient 
                style={[styles.container_icon_footer_special]}
                colors={viewGradientColors}
            >
                <TouchableOpacity 
                    style={styles.centralButton}
                    onPress={() =>navigation.navigate("NewSesion") }
                >
                    <Feather name="plus" size={45} color={Colors.colorBack1} style={{textAlign:"center"}}/>
                </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity 
                style={styles.container_icon_footer}
                onPress={function nothing(){console.log("a versus");}}
            >
                <Text style={[styles.icons2_footer,styleView.styles.icons2_footer]}>🆚</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.container_icon_footer}
                onPress={function nothing(){console.log("a torneos");}}
            >
                <Text style={[styles.icons2_footer,styleView.styles.icons2_footer]}>🏆</Text>
            </TouchableOpacity>            
        </View>
    )
}

const styles = StyleSheet.create({
    footer:{
        height: "10%",
        width: "101%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 2,
        borderBottomWidth: 0,
        flexDirection: "row"   
    },
    container_icon_footer_special:{
        position:"relative",
        top:-20,
        height: 70,
        width:75,
        justifyContent: "center",
        backgroundColor:"transparent",
        borderRadius:100

    },
    centralButton:{
        backgroundColor:"transparent",
    },
    container_icon_footer:{
        flex: 1,
        height: "100%",
        justifyContent: "center",
    },
    icons1_footer:{
        textAlign: "center",
        borderWidth:5,
        borderRadius:100,
        width:"75%",
        padding: 3,
        marginLeft:"13%" 
    },
    icons2_footer:{
        textAlign: "center", 
        fontSize: 30,
        borderWidth:5,
        borderRadius:100,
        width:"75%",
        padding: 3,
        marginLeft:"13%"
    }
})