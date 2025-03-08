import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';

export default function BlueButton(prop) {
    const { text, onPress, style} = prop
    const extraStyle = style
    return (
        <LinearGradient 
            colors = {[Colors.colorBlue2,Colors.colorBlue3]}
            style={[styles.button,extraStyle]}
            locations={[0.3, 1]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
        >
            <TouchableOpacity
                onPress = {onPress}
                style = {[styles.touchable, {width: parseInt(250), height: parseInt(50)}]}
            >
                <Text style={styles.text}>
                    {text}
                </Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize: 30,
        color: "white",
        fontWeight: "bold"
    },
    button:{
        backgroundColor: "transparent",
        width: 250,
        height:50,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 30,
        shadowColor: "black",
        elevation: 10,
    },
    touchable:{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
})