import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

export default function IconsPage() {



    return <View style={styles.Main_container}>
        <View style={styles.row}>
            <Feather name="tool" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="activity" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="award" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="calendar" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="play" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="radio" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="archive" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="bookmark" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
        </View>
        <View style={styles.row}>
            <Feather name="chevron-left" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="pie-chart" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="users" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="airplay" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="check-circle" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="crosshair" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="disc" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="target" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
        </View>
        <View style={styles.row}>
            <Feather name="" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="list" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="align-justify" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="grid" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="server" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>     
            <Feather name="folder" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>     
            <Feather name="file" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>     
            <Feather name="circle" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>     
        </View>
        <View style={styles.row}>
            <Feather name="" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
            <Feather name="" size={36} color="#FFD700" style={{flex: 1, textAlign: "center"}}/>
        </View>
        <View style={styles.row}>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>🏆</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>🏹</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>🥇</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>🥈</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>🥉</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>🎖️</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>🏅</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>📅</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>🆚</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>🌐</Text>
            <Text style={{flex: 1, textAlign: "center", fontSize: 36}}>📈</Text>
            
        </View>
        
        
    </View>
}

const styles = StyleSheet.create({
    Main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        backgroundColor: "grey",
        display: "flex",
        flexDirection: "column"

    },
    row:{
        display: "flex",
        flexDirection: "row",
        margin: 10
    }
    
})
// {display: "flex", flexDirection:"row", height:"100%"}