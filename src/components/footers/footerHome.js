import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../styles/colors.js'


import { whiteMode, darkMode} from '../../styles/components/footers/themeStyles.js';
import { themeStyleView, switchStyleMode } from '../../global/variables.js';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Background } from '@react-navigation/elements';

export default function FooterHome(prop) {

    const navigation = useNavigation();

    var styleView = whiteMode
    var colorIcon = Colors.colorBlue2
    if(themeStyleView=="whiteMode"){
        styleView = whiteMode
        colorIcon = Colors.colorBlue2
    }else{
        styleView = darkMode
        colorIcon = Colors.colorBlue2
    }

    return(
        <View style={[styles.footer, styleView.styles.footer]}>
            <TouchableOpacity 
                style={styles.container_icon_footer}
                onPress={function nothing(){console.log("voy a las estadísticas");}}
            >
                <Feather name="activity" size={36} color={colorIcon} style={[styles.icons1_footer, styleView.styles.icons1_footer]}/>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.container_icon_footer}
                onPress={function nothing(){console.log("a usuarios");}}
            >
                <Feather name="users" size={36} color={colorIcon} style={[styles.icons1_footer, styleView.styles.icons1_footer]}/>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.container_icon_footer}
                onPress={() => navigation.navigate("SesionsList")}
            >
                <Feather name="calendar" size={36} color={colorIcon} style={[styles.icons1_footer, styleView.styles.icons1_footer]}/>
            </TouchableOpacity>
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
        borderWidth: 3,
        borderBottomWidth: 0,
        display: "flex",
        flexDirection: "row"   
    },
    container_icon_footer:{
        flex: 1,
        height: "100%",
        display: "flex",
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