import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { Colors } from '../../../global/colors';

export default function MenuViewSession(prop){
    const { visible, closeMenu } = prop;
    return <Modal
        isVisible={visible}
        onBackdropPress={closeMenu}
        backdropOpacity={0.4}
        animationIn="slideInLeft"    // Desde izquierda
        animationOut="slideOutLeft"  // Sale hacia izquierda
        animationInTiming={400}
        animationOutTiming={400}
        style={{margin:0}}
    >
        <View style={styles.container}>

        </View>
    </Modal>
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.colorBack2,
        width:"60%",
        height:"100%",
        borderEndEndRadius:20,
        borderEndStartRadius:20

    }
})