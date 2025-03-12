import { StyleSheet} from 'react-native';
import { Colors } from '../../../global/colors.js'

export const whiteMode = {
    styles : StyleSheet.create({
        Main_container:{
            backgroundColor: Colors.colorBack2
        },
    }),
}


export const darkMode = {
    styles : StyleSheet.create({
        Main_container:{
            backgroundColor: Colors.colorBack3
        },
    }),
}