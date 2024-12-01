import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

export default function BlueButton(prop) {
    const { text, onPress} = prop
    return (
        <LinearGradient 
            colors = {['#baffd8','#96dded']}
            style={styles.button}
            locations={[0.3, 0.7]}
            start={{x: 0.0, y: 0.55}}
            end={{x: 0.5, y: 1.0}}
        >
            <TouchableOpacity
                onPress = {onPress}
                style = {[styles.touchable, {width: parseInt(70), height: parseInt(70)}]}
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
        fontSize: 30
    },
    button:{
        backgroundColor: "transparent",
        width: 70,
        height: 70,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 30,
        shadowColor: "#96dded38",
        shadowOffset: {width: 0, height:3}
    },
    touchable:{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
})